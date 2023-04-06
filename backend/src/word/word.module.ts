import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordController } from './word.controller';
import { Word } from './word.entity';
import { WordService } from './word.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}
