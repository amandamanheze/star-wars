import { MigrationInterface, QueryRunner } from 'typeorm';
import { Ship } from '../ships/entities/ship.entity';

export class Seed1617378125500 implements MigrationInterface {
    name = 'Seed1617378125500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const ships = [
      { id: 2, name: 'Executor', image: 'uploads/starships/1722138769311-280409401.png' },
      { id: 1, name: 'Sentinel-class landing craft', image: 'uploads/starships/1722139253093-655658078.png' },
      { id: 3, name: 'Death Star', image: 'uploads/starships/1722139312363-593240078.png' },
      { id: 4, name: 'Millennium Falcon', image: 'uploads/starships/1722139494687-224694852.png' },
      { id: 5, name: 'Y-wing', image: 'uploads/starships/1722139576873-544861215.png' },
      { id: 6, name: 'X-wing', image: 'uploads/starships/1722139773696-121209630.png' },
      { id: 7, name: 'TIE Advanced x1', image: 'uploads/starships/1722139840290-556694159.png' },
      { id: 8, name: 'Slave 1', image: 'uploads/starships/1722139916950-704755205.png' },
      { id: 9, name: 'EF76 Nebulon-B escort frigate', image: 'uploads/starships/1722139983218-306010658.png' },
    ];

    for (const ship of ships) {
      await queryRunner.manager.save(
        queryRunner.manager.create<Ship, Partial<Ship>>(Ship, ship),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ship WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9)`);
  }
}
