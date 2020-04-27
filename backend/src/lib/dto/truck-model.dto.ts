/* eslint-disable max-classes-per-file */
import { IsOptional, IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class TruckCreateModel {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  buildYear: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  capacity: number;
}

export class TruckUpdateModel {
  @Transform(() => undefined)
  id?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  buildYear?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacity?: number;
}
