import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../../gender/entities/gender.entity';
import { Platform } from '../../platform/entities/platform.entity';

@Entity({ name: 'tb_games' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, nullable: false, unique: true })
  name: string;
  @Column()
  @Column({
    default:
      'https://media.istockphoto.com/id/464988959/pt/foto/pato-real-com-tra%C3%A7ado-de-recorte.jpg?s=612x612&w=0&k=20&c=SUhSeo67zEVs8bgUm0K-OrMDD4iQ5s75CxaOG4gBI1Y=',
  })
  photo: string;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => Gender, (gender) => gender.games)
  gender: Gender[];

  @ManyToMany(() => Platform, (platform) => platform.games)
  platform: Platform[];
}
