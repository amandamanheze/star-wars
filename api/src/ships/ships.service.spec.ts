import { Test, TestingModule } from '@nestjs/testing';
import { ShipsService } from './ships.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';
import { unlink } from 'fs/promises';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';

jest.mock('fs/promises');

describe('ShipsService', () => {
  let service: ShipsService;
  let repository: Repository<Ship>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipsService,
        {
          provide: getRepositoryToken(Ship),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShipsService>(ShipsService);
    repository = module.get<Repository<Ship>>(getRepositoryToken(Ship));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a ship', async () => {
    const createShipDto: CreateShipDto = { name: 'Millennium Falcon', image: 'image.png' };
    const ship = new Ship();
    ship.name = createShipDto.name;
    ship.image = createShipDto.image;

    jest.spyOn(repository, 'save').mockResolvedValue(ship);

    expect(await service.create(createShipDto)).toEqual(ship);
    expect(repository.save).toHaveBeenCalledWith(ship);
  });

  it('should find all ships', async () => {
    const ships = [
      { id: 1, name: 'Millennium Falcon', image: 'image1.png' },
      { id: 2, name: 'X-Wing', image: 'image2.png' },
    ] as Ship[];

    jest.spyOn(repository, 'find').mockResolvedValue(ships);

    expect(await service.findAll()).toEqual(ships);
    expect(repository.find).toHaveBeenCalledWith({ order: { name: 'ASC' } });
  });

  it('should find one ship by id', async () => {
    const ship = { id: 1, name: 'Millennium Falcon', image: 'image1.png' } as Ship;

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(ship);

    expect(await service.findOne(1)).toEqual(ship);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a ship', async () => {
    const updateShipDto: UpdateShipDto = { name: 'Updated Ship', image: 'updated_image.png' };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    jest.spyOn(repository, 'update').mockResolvedValue(updateResult);

    await service.update(1, updateShipDto);
    expect(repository.update).toHaveBeenCalledWith(1, updateShipDto);
  });

  it('should remove a ship', async () => {
    const ship = { id: 1, name: 'Millennium Falcon', image: 'image1.png' } as Ship;

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(ship);
    const deleteResult: DeleteResult = { raw: [], affected: 1 };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
    (unlink as jest.Mock).mockResolvedValue(undefined);

    await service.remove(1);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(unlink).toHaveBeenCalledWith(ship.image);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should handle image unlink error when removing a ship', async () => {
    const ship = { id: 1, name: 'Millennium Falcon', image: 'image1.png' } as Ship;
  
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(ship);
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} } as DeleteResult);
    (unlink as jest.Mock).mockRejectedValue(new Error('Error removing image'));
  
    await service.remove(1);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(unlink).toHaveBeenCalledWith(ship.image);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });  
});
