import { Repository } from 'typeorm';
import { Gender } from '../entities/gender.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class GenderService {
  constructor(
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
  ) {}

  async findAll(): Promise<Gender[]> {
    return await this.genderRepository.find();
  }

  async findOne(id: number): Promise<Gender> {
    const gender = await this.genderRepository.findOne({ where: { id } });
    console.log(gender);
    if (!gender) {
      throw new HttpException('Gender not found', HttpStatus.NOT_FOUND);
    }

    return gender;
  }

  async findByName(name: string): Promise<Gender> {
    const gender = await this.genderRepository.findOne({ where: { name } });
    if (!gender) {
      throw new HttpException('Gender not found', HttpStatus.NOT_FOUND);
    }

    return gender;
  }

  async create(name: string): Promise<Gender> {
    const genderExist = await this.genderRepository.findOne({
      where: { name },
    });
    if (genderExist) {
      throw new HttpException('Gender already exists', HttpStatus.CONFLICT);
    }

    const gender = await this.genderRepository.create({ name });
    return this.genderRepository.save(gender);
  }

  async update(id: number, name: string): Promise<Gender> {
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) {
      throw new HttpException('Gender not found', HttpStatus.NOT_FOUND);
    }

    const existName = await this.genderRepository.findOne({
      where: { name },
    });
    if (existName && existName.id !== id) {
      throw new HttpException(
        'Gender name already exists',
        HttpStatus.CONFLICT,
      );
    }

    gender.name = name;
    return this.genderRepository.save(gender);
  }

  async delete(id: number): Promise<{ statusCode: number; message: string }> {
    const gender = await this.findOne(id);
    if (!gender)
      throw new HttpException('Gender not found', HttpStatus.NOT_FOUND);

    await this.genderRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Gender deleted successfully',
    };
  }
}
