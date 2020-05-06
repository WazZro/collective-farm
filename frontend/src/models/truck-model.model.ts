export class TruckModel {
  id: number;
  brand: string;
  model: string;
  buildYear: number;
  capacity: number;

  public get name(): string {
    return `${this.brand} ${this.model}`;
  }
}
