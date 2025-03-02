/* eslint-disable prettier/prettier */
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBiodataOfPatientDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  homeAddress: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateOfRegistration: Date;

  @IsNotEmpty()
  @IsBoolean()
  _matriculationNumber: boolean;
}