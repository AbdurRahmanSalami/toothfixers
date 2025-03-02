/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BiodataOfPatient } from 'src/modules/biodata-of-patients/entities/biodata-of-patient.entity';

export class CreateClinicalRecordDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  clinicDate: Date;

  @IsNotEmpty()
  @IsString()
  natureOfAilment: string;

  @IsOptional()
  @IsString()
  medicinePrescribed?: string;

  @IsOptional()
  @IsString()
  procedureUndertaken?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfNextAppointment?: Date;

  biodata: BiodataOfPatient;
}
