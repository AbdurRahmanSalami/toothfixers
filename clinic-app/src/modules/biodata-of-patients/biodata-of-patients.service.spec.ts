/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BiodataOfPatientsService } from './biodata-of-patients.service';

describe('BiodataOfPatientsService', () => {
  let service: BiodataOfPatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiodataOfPatientsService],
    }).compile();

    service = module.get<BiodataOfPatientsService>(BiodataOfPatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
