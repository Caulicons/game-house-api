import { Module } from '@nestjs/common';
import { GenderController } from './controllers/gender.controller';
import GenderService from './service/gender.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [GenderController],
  providers: [GenderService],
  exports: [TypeOrmModule],
})
export class GenderModule {}
