import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  meaning: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  audioUrl: string;

  @ManyToOne(() => User, (user) => user.words)
  user: User;
}
