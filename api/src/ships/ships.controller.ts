import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/starships',
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
  create(@Body() createShipDto: CreateShipDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Image file is required', HttpStatus.BAD_REQUEST);
    }
    createShipDto.image = file.path;

    return this.shipsService.create(createShipDto);
  }

  @Get()
  findAll() {
    return this.shipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipsService.findOne(+id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/starships',
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
  async update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto, @UploadedFile() file: Express.Multer.File) {
    try {
      updateShipDto.image = file ? file.path : undefined;
      return this.shipsService.update(+id, updateShipDto);
    } catch (error) {
      console.error('Error updating starship:', error);
      throw new HttpException('Error updating starship', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipsService.remove(+id);
  }
}
