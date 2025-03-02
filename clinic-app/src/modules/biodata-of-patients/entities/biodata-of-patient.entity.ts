/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, } from 'class-validator';
import { ClinicalRecord } from 'src/modules/clinical-records/entities/clinical-record.entity';

@Entity()
export class BiodataOfPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  surName: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  middleName?: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  homeAddress: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  dateOfRegistration: Date;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  _matriculationNumber: boolean;

  @OneToMany(() => ClinicalRecord, clinicalRecord => clinicalRecord.biodata)
  clinicalRecords: ClinicalRecord[];
}