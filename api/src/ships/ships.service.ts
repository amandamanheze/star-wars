import { Injectable } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './entities/ship.entity';
import { unlink } from 'fs/promises';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private shipsRepository: Repository<Ship>,
  ) {}

  create(createShipDto: CreateShipDto): Promise<Ship> {
    const ship: Ship = new Ship();
    ship.name = createShipDto.name;
    ship.image = createShipDto.image;
    return this.shipsRepository.save(ship);
  }

  findAll(): Promise<Ship[]> {
    return this.shipsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Ship | null> {
    return this.shipsRepository.findOneBy({ id });
  }

  async update(id: number, updateShipDto: UpdateShipDto): Promise<void> {
    await this.shipsRepository.update(id, updateShipDto);
  }

  async remove(id: number): Promise<void> {
    const ship = await this.shipsRepository.findOneBy({ id });
    if (ship && ship.image) {
      await unlink(ship.image).catch(err => console.error('Error removing image:', err));
    }
    await this.shipsRepository.delete(id);
  }
}
