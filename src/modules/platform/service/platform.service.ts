import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Platform } from '../entities/platform.entity';

@Injectable()
export default class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

  async findAll(): Promise<Platform[]> {
    return await this.platformRepository.find();
  }

  async findOne(id: number): Promise<Platform> {
    const platform = await this.platformRepository.findOne({ where: { id } });
    if (!platform) {
      throw new HttpException('Platform not found', HttpStatus.NOT_FOUND);
    }

    return platform;
  }

  async findByName(name: string): Promise<Platform> {
    const platform = await this.platformRepository.findOne({ where: { name } });
    if (!platform) {
      throw new HttpException('Platform not found', HttpStatus.NOT_FOUND);
    }

    return platform;
  }

  async create(name: string): Promise<Platform> {
    const platformExist = await this.platformRepository.findOne({
      where: { name },
    });
    if (platformExist) {
      throw new HttpException('Platform already exists', HttpStatus.CONFLICT);
    }

    const platform = await this.platformRepository.create({ name });
    return this.platformRepository.save(platform);
  }

  async update(id: number, name: string): Promise<Platform> {
    const platform = await this.platformRepository.findOne({ where: { id } });
    if (!platform) {
      throw new HttpException('Platform not found', HttpStatus.NOT_FOUND);
    }

    const existName = await this.platformRepository.findOne({
      where: { name },
    });
    if (existName && existName.id !== id) {
      throw new HttpException(
        'Platform name already exists',
        HttpStatus.CONFLICT,
      );
    }

    platform.name = name;
    return this.platformRepository.save(platform);
  }

  async delete(id: number): Promise<{ statusCode: number; message: string }> {
    const platform = await this.findOne(id);
    if (!platform)
      throw new HttpException('Platform not found', HttpStatus.NOT_FOUND);

    await this.platformRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Platform deleted successfully',
    };
  }
}
