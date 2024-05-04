import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../entity/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    return game;
  }

  async findByName(name: string): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { name } });

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    return game;
  }

  async create(name: string): Promise<Game> {
    const gameExist = await this.gameRepository.findOne({ where: { name } });

    if (gameExist) {
      throw new HttpException('Game already exists', HttpStatus.CONFLICT);
    }

    const game = await this.gameRepository.create({ name });

    return game;
  }
}
