/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClinicalRecordDto } from './dto/create-clinical-record.dto';
import { UpdateClinicalRecordDto } from './dto/update-clinical-record.dto';
import { ClinicalRecord } from './entities/clinical-record.entity';

@Injectable()
export class ClinicalRecordsService {
  constructor(
    @InjectRepository(ClinicalRecord)
    private clinicalRecordRepository: Repository<ClinicalRecord>,
  ) {}

  create(createClinicalRecordDto: CreateClinicalRecordDto) {
    const clinicalRecord = this.clinicalRecordRepository.create(createClinicalRecordDto);
    return this.clinicalRecordRepository.save(clinicalRecord);
  }

  findAll() {
    return this.clinicalRecordRepository.find();
  }

  findOne(id: number) {
    return this.clinicalRecordRepository.findOneBy({ id });
  }

  async update(id: number, updateClinicalRecordDto: UpdateClinicalRecordDto) {
    await this.clinicalRecordRepository.update(id, updateClinicalRecordDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.clinicalRecordRepository.delete(id);
    return { deleted: true };
  }
}