/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BiodataOfPatientsModule } from './modules/biodata-of-patients/biodata-of-patients.module';
import { ClinicalRecordsModule } from './modules/clinical-records/clinical-records.module';

@Module({
  imports: [
    BiodataOfPatientsModule,
    ClinicalRecordsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Postgres',
      database: 'clinicapp',
      entities: [__dirname + '/**/*.entity.{js,ts}'], // add all your entities here
      synchronize: true, // set to false in production
      // autoLoadEntities: true
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
