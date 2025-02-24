import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ship])],
  controllers: [ShipsController],
  providers: [ShipsService],
})
export class ShipsModule {}
