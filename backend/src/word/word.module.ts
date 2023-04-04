import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordController } from './word.controller';
import { Word } from './word.entity';
import { WordService } from './word.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}
