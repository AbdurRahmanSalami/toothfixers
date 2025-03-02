/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBiodataOfPatientDto } from './dto/create-biodata-of-patient.dto';
import { UpdateBiodataOfPatientDto } from './dto/update-biodata-of-patient.dto';
import { BiodataOfPatient } from './entities/biodata-of-patient.entity';

@Injectable()
export class BiodataOfPatientsService {
  constructor(
    @InjectRepository(BiodataOfPatient)
    private biodataOfPatientRepository: Repository<BiodataOfPatient>,
  ) {}

  create(createBiodataOfPatientDto: CreateBiodataOfPatientDto) {
    const biodataOfPatient = this.biodataOfPatientRepository.create(createBiodataOfPatientDto);
    return this.biodataOfPatientRepository.save(biodataOfPatient);
  }

  findAll() {
    return this.biodataOfPatientRepository.find();
  }

  findOne(id: number) {
    return this.biodataOfPatientRepository.findOneBy({ id });
  }

  async update(id: number, updateBiodataOfPatientDto: UpdateBiodataOfPatientDto) {
    await this.biodataOfPatientRepository.update(id, updateBiodataOfPatientDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.biodataOfPatientRepository.delete(id);
    return { deleted: true };
  }
}