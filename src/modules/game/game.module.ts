import { Module } from '@nestjs/common';
import { GamesController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entity/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [GameService],
  exports: [TypeOrmModule],
})
export class GameModule {}
