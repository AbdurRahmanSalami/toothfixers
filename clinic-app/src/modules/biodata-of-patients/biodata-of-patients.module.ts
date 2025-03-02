/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiodataOfPatientsService } from './biodata-of-patients.service';
import { BiodataOfPatientsController } from './biodata-of-patients.controller';
import { BiodataOfPatient } from './entities/biodata-of-patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiodataOfPatient])],
  controllers: [BiodataOfPatientsController],
  providers: [BiodataOfPatientsService],
})
export class BiodataOfPatientsModule {}