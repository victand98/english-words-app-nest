import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWordDto, UpdateWordDto } from './word.dto';
import { Word } from './word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async create(createWordDto: CreateWordDto, userId: number): Promise<Word> {
    const word = await this.wordRepository.create({
      ...createWordDto,
      user: { id: userId },
    });
    return this.wordRepository.save(word);
  }

  async findAll(userId: number): Promise<Word[]> {
    return this.wordRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Word> {
    const word = await this.wordRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!word) throw new NotFoundException(`Word with id ${id} not found`);
    return word;
  }

  async update(
    id: number,
    updateWordDto: UpdateWordDto,
    userId: number,
  ): Promise<Word> {
    const word = await this.wordRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!word) throw new NotFoundException(`Word with id ${id} not found`);

    const updatedWord = {
      ...word,
      ...updateWordDto,
    };
    return this.wordRepository.save(updatedWord);
  }

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.wordRepository.delete({
      id,
      user: { id: userId },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Word with id ${id} not found`);
  }
}
