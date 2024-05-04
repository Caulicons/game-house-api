import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Game } from '../entity/game.entity';
import { GameService } from '../services/game.service';

@Controller('games')
export class GamesController {
  constructor(private gameService: GameService) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Game> {
    return this.gameService.findByName(name);
  }

  @Post()
  async create(@Body('name') name: string): Promise<Game> {
    return this.gameService.create(name);
  }
}
