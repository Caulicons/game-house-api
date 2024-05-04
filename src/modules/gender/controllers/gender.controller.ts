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
import GenderService from '../service/gender.service';
import { Gender } from '../entities/gender.entity';

@Controller('gender')
export class GenderController {
  constructor(private genderService: GenderService) {}

  @Get()
  async findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Get('name/:name')
  async findByName(name: string): Promise<Gender> {
    return this.genderService.findByName(name);
  }

  @Post()
  async create(@Body('name') name: string): Promise<Gender> {
    return this.genderService.create(name);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('name')
    name: string,
  ): Promise<Gender> {
    return this.genderService.update(id, name);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.genderService.delete(id);
  }
}
