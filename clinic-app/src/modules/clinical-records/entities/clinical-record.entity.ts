/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BiodataOfPatient } from 'src/modules/biodata-of-patients/entities/biodata-of-patient.entity';

@Entity("clinical-records")
export class ClinicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  clinicDate: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  natureOfAilment: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  medicinePrescribed?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  procedureUndertaken?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfNextAppointment?: Date;

  @ManyToOne(() => BiodataOfPatient, (biodata) => biodata.clinicalRecords)
  biodata: BiodataOfPatient;
}
