import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderModule } from './modules/gender/gender.module';
import { Gender } from './modules/gender/entities/gender.entity';
import { PlatformsModule } from './modules/platform/platform.module';
import { Platform } from './modules/platform/entities/platform.entity';
import { GameModule } from './modules/game/game.module';
import { Game } from './modules/game/entity/game.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_game_house',
      synchronize: true,
      entities: [Gender, Platform, Game],
      //autoLoadEntities: true,
    }),
    GenderModule,
    PlatformsModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
