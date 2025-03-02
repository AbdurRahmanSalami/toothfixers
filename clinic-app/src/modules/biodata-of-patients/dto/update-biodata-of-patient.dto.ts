/* eslint-disable prettier/prettier */
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBiodataOfPatientDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  homeAddress?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfRegistration?: Date;

  @IsOptional()
  @IsBoolean()
  _matriculationNumber?: boolean;
}
