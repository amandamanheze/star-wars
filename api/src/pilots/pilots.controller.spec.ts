import { Test, TestingModule } from '@nestjs/testing';
import { PilotsController } from './pilots.controller';
import { PilotsService } from './pilots.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';

describe('PilotsController', () => {
  let controller: PilotsController;
  let service: PilotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PilotsController],
      providers: [
        {
          provide: PilotsService,
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

    controller = module.get<PilotsController>(PilotsController);
    service = module.get<PilotsService>(PilotsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a pilot', async () => {
    const createPilotDto: CreatePilotDto = { name: 'Luke Skywalker', image: '' };
    const mockFile = { path: 'path/to/image.png' } as Express.Multer.File;
    const result = { id: 1, ...createPilotDto, image: mockFile.path };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createPilotDto, mockFile)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith({ ...createPilotDto, image: mockFile.path });
  });

  it('should find all pilots', async () => {
    const result = [{ id: 1, name: 'Luke Skywalker', image: 'image.png' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one pilot by id', async () => {
    const result = { id: 1, name: 'Luke Skywalker', image: 'image.png' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a pilot', async () => {
    const updatePilotDto: UpdatePilotDto = { name: 'Anakin Skywalker', image: 'image2.png' };
    const mockFile = { path: 'path/to/image2.png' } as Express.Multer.File;

    jest.spyOn(service, 'update').mockResolvedValue(undefined);

    expect(await controller.update('1', updatePilotDto, mockFile)).toEqual(undefined);
    expect(service.update).toHaveBeenCalledWith(1, { ...updatePilotDto, image: mockFile.path });
  });

  it('should remove a pilot', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toEqual(undefined);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
