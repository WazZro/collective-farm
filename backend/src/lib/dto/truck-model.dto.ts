/* eslint-disable max-classes-per-file */
import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TruckCreateModel {
  @IsOptional()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public brand: string;

  @IsNotEmpty()
  @IsString()
  public model: string;

  @IsNotEmpty()
  @IsNumber()
  public buildYear: number;

  @IsNotEmpty()
  @IsNumber()
  public capacity: number;
}

export class TruckUpdateModel {
  public id: number;

  public brand: string;

  public model: string;

  public buildYear: number;

  public capacity: number;
}
