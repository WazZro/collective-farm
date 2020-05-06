/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Delivery } from '../../../../models/delivery.model';
import { DeliveryService } from '../../../../services/delivery.service';
import { getMessageFromError } from '../../../../lib/utils';
import { AbstractUpdateComponent } from '../../../../lib/classes/abstract-update-component';
import { DELIVERY_STATUS_MAP } from '../../../../lib/constants';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-delivery-status-dialog',
  templateUrl: 'delivery-status-modal.component.html',
})
export class DeliveryStatusDialogComponent
  extends AbstractUpdateComponent<Delivery>
  implements OnInit {
  deliveryStatusForm: FormGroup = new FormGroup({
    status: new FormControl(undefined, [Validators.required]),
  });
  statuses: any = null;

  constructor(
    deliveryService: DeliveryService,
    dialogRef: MatDialogRef<DeliveryStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) delivery: Delivery,
    private snackBar: MatSnackBar,
  ) {
    super(delivery, deliveryService, dialogRef);
  }

  public ngOnInit(): void {
    this.statuses = cloneDeep(DELIVERY_STATUS_MAP);
    for (let i = 0; i <= this.entity.status; i++) this.statuses.delete(i);
  }

  public async update(): Promise<void> {
    const status = this.deliveryStatusForm.value.status;
    try {
      const updated = await (this.service as DeliveryService).changeStatus(
        this.entity,
        status,
      );
      this.modalClose(updated);
    } catch (e) {
      const message = getMessageFromError(e);
      this.snackBar.open(message, null, { duration: 3000 });
    }
  }
}
