import { Test, TestingModule } from '@nestjs/testing';
import { PilotsService } from './pilots.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Pilot } from './entities/pilot.entity';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';

describe('PilotsService', () => {
  let service: PilotsService;
  let repository: Repository<Pilot>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PilotsService,
        {
          provide: getRepositoryToken(Pilot),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PilotsService>(PilotsService);
    repository = module.get<Repository<Pilot>>(getRepositoryToken(Pilot));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pilot', async () => {
    const createPilotDto: CreatePilotDto = { name: 'Luke Skywalker', image: 'image.png' };
    const pilot: Pilot = { id: 1, ...createPilotDto } as Pilot;

    jest.spyOn(repository, 'save').mockResolvedValue(pilot);

    expect(await service.create(createPilotDto)).toEqual(pilot);
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining(createPilotDto));
  });

  it('should find all pilots', async () => {
    const pilots: Pilot[] = [{ id: 1, name: 'Luke Skywalker', image: 'image.png' }];

    jest.spyOn(repository, 'find').mockResolvedValue(pilots);

    expect(await service.findAll()).toEqual(pilots);
    expect(repository.find).toHaveBeenCalledWith({ order: { name: 'ASC' } });
  });

  it('should find one pilot by id', async () => {
    const pilot: Pilot = { id: 1, name: 'Luke Skywalker', image: 'image.png' } as Pilot;

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(pilot);

    expect(await service.findOne(1)).toEqual(pilot);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a pilot', async () => {
    const updatePilotDto: UpdatePilotDto = { name: 'Anakin Skywalker', image: 'image2.png' };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    jest.spyOn(repository, 'update').mockResolvedValue(updateResult);

    await service.update(1, updatePilotDto);

    expect(repository.update).toHaveBeenCalledWith(1, updatePilotDto);
  });

  it('should remove a pilot', async () => {
    const pilot: Pilot = { id: 1, name: 'Luke Skywalker', image: 'image.png' } as Pilot;

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(pilot);
    const deleteResult: DeleteResult = { raw: [], affected: 1 };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
    jest.spyOn(require('fs/promises'), 'unlink').mockResolvedValue(undefined);

    await service.remove(1);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(require('fs/promises').unlink).toHaveBeenCalledWith('image.png');
  });
});
