import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pilots')
export class PilotsController {
  constructor(private readonly pilotsService: PilotsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },
  }))
  create(@Body() createPilotDto: CreatePilotDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Image file is required', HttpStatus.BAD_REQUEST);
    }
    createPilotDto.image = file.path;

    return this.pilotsService.create(createPilotDto);
  }

  @Get()
  findAll() {
    return this.pilotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pilotsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },
  }))
  async update(@Param('id') id: string, @Body() updatePilotDto: UpdatePilotDto, @UploadedFile() file: Express.Multer.File) {
    try {
      updatePilotDto.image = file ? file.path : undefined;

      return this.pilotsService.update(+id, updatePilotDto);
    } catch (error) {
      console.error('Error updating pilot:', error);

      throw new HttpException('Error updating pilot', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pilotsService.remove(+id);
  }
}
