/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiodataOfPatientsService } from './biodata-of-patients.service';
import { CreateBiodataOfPatientDto } from './dto/create-biodata-of-patient.dto';
import { UpdateBiodataOfPatientDto } from './dto/update-biodata-of-patient.dto';

@Controller('biodata-of-patients')
export class BiodataOfPatientsController {
  constructor(private readonly biodataOfPatientsService: BiodataOfPatientsService) {}

  @Post()
  create(@Body() createBiodataOfPatientDto: CreateBiodataOfPatientDto) {
    return this.biodataOfPatientsService.create(createBiodataOfPatientDto);
  }

  @Get()
  findAll() {
    return this.biodataOfPatientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biodataOfPatientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiodataOfPatientDto: UpdateBiodataOfPatientDto) {
    return this.biodataOfPatientsService.update(+id, updateBiodataOfPatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biodataOfPatientsService.remove(+id);
  }
}
