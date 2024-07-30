import { Injectable } from '@nestjs/common';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pilot } from './entities/pilot.entity';
import { unlink } from 'fs/promises';

@Injectable()
export class PilotsService {
  constructor(
    @InjectRepository(Pilot)
    private pilotsRepository: Repository<Pilot>,
  ) {}
  
  create(createPilotDto: CreatePilotDto): Promise<Pilot> {
    const pilot: Pilot = new Pilot();
    pilot.name = createPilotDto.name;
    pilot.image = createPilotDto.image;
    return this.pilotsRepository.save(pilot);
  }

  findAll(): Promise<Pilot[]> {
    return this.pilotsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Pilot | null> {
    return this.pilotsRepository.findOneBy({ id });
  }

  async update(id: number, updatePilotDto: UpdatePilotDto): Promise<void> {
    await this.pilotsRepository.update(id, updatePilotDto);
  }

  async remove(id: number): Promise<void> {
    const pilot = await this.pilotsRepository.findOneBy({ id });
    if (pilot && pilot.image) {
      await unlink(pilot.image).catch(err => console.error('Error removing image:', err));
    }
    await this.pilotsRepository.delete(id);
  }
}
