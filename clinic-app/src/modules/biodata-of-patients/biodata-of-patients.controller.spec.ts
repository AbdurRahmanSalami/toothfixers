/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BiodataOfPatientsController } from './biodata-of-patients.controller';
import { BiodataOfPatientsService } from './biodata-of-patients.service';

describe('BiodataOfPatientsController', () => {
  let controller: BiodataOfPatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiodataOfPatientsController],
      providers: [BiodataOfPatientsService],
    }).compile();

    controller = module.get<BiodataOfPatientsController>(BiodataOfPatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
