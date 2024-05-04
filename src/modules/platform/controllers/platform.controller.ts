import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import PlatformService from '../service/platform.service';
import { Platform } from '../entities/platform.entity';

@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get()
  async findAll(): Promise<Platform[]> {
    return this.platformService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Platform> {
    return this.platformService.findOne(id);
  }

  @Get('name/:name')
  async findByName(name: string): Promise<Platform> {
    return this.platformService.findByName(name);
  }

  @Post()
  async create(@Body('name') name: string): Promise<Platform> {
    return this.platformService.create(name);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('name')
    name: string,
  ): Promise<Platform> {
    return this.platformService.update(id, name);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.platformService.delete(id);
  }
}
