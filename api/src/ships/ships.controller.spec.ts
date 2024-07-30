import { Test, TestingModule } from '@nestjs/testing';
import { ShipsController } from './ships.controller';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';

describe('ShipsController', () => {
  let controller: ShipsController;
  let service: ShipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipsController],
      providers: [
        {
          provide: ShipsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShipsController>(ShipsController);
    service = module.get<ShipsService>(ShipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a ship', async () => {
    const createShipDto: CreateShipDto = { name: 'Millennium Falcon', image: '' };
    const mockFile = { path: 'path/to/image.png' } as Express.Multer.File;
    const result = { id: 1, ...createShipDto, image: mockFile.path };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createShipDto, mockFile)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith({ ...createShipDto, image: mockFile.path });
  });

  it('should find all ships', async () => {
    const result = [{ id: 1, name: 'Millennium Falcon', image: 'image.png' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one ship by id', async () => {
    const result = { id: 1, name: 'Millennium Falcon', image: 'image.png' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a ship', async () => {
    const updateShipDto: UpdateShipDto = { name: 'Millennium Falcon', image: 'image2.png' };
    const mockFile = { path: 'path/to/image2.png' } as Express.Multer.File;

    jest.spyOn(service, 'update').mockResolvedValue(undefined);

    expect(await controller.update('1', updateShipDto, mockFile)).toEqual(undefined);
    expect(service.update).toHaveBeenCalledWith(1, { ...updateShipDto, image: mockFile.path });
  });

  it('should remove a ship', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toEqual(undefined);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
