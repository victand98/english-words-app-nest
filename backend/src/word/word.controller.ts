import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateWordDto, UpdateWordDto } from './word.dto';
import { Word } from './word.entity';
import { WordService } from './word.service';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() req,
    @Body() createWordDto: CreateWordDto,
  ): Promise<Word> {
    return this.wordService.create(createWordDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req): Promise<Word[]> {
    return this.wordService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number, @Req() req): Promise<Word> {
    return this.wordService.findOne(id, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: number,
    @Body() updateWordDto: UpdateWordDto,
    @Req() req,
  ): Promise<Word> {
    return this.wordService.update(id, updateWordDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: number, @Req() req): Promise<void> {
    return this.wordService.remove(id, req.user.id);
  }
}
