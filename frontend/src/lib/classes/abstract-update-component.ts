import { AbstractEntityService } from './abstract-entity-service';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class AbstractUpdateComponent<T> {
  public constructor(
    public entity: T,
    protected service: AbstractEntityService<T>,
    protected dialogRef: MatDialogRef<AbstractUpdateComponent<T>>,
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
  public abstract update(): void | Promise<void>;
}
