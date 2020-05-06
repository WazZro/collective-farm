import { AbstractEntityService } from './abstract-entity-service';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class AbstractCreateComponent<T> {
  public constructor(
    protected service: AbstractEntityService<T>,
    protected dialogRef: MatDialogRef<AbstractCreateComponent<T>>,
  ) {}

  /**
   * Modal close method
   * @param returnValue - return value in the dialog stream
   */
  public modalClose(returnValue?: T): void {
    this.dialogRef.close(returnValue);
  }

  /**
   * Create entity method
   */
  public abstract create(): void | Promise<void>;
}
