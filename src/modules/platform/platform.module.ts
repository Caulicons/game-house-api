import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './entities/platform.entity';
import { PlatformController } from './controllers/platform.controller';
import PlatformService from './service/platform.service';

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  controllers: [PlatformController],
  providers: [PlatformService],
  exports: [TypeOrmModule],
})
export class PlatformsModule {}
