import { Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../game/entity/game.entity';

@Entity({ name: 'tb_platforms' })
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @Length(3, 75)
  @Column({ unique: true, nullable: false, length: 75 })
  name: string;

  @OneToMany(() => Game, (game) => game.platform)
  games: Game[];
}
