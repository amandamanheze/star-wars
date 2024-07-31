import { MigrationInterface, QueryRunner } from 'typeorm';
import { Pilot } from '../pilots/entities/pilot.entity';

export class Seed2617378125500 implements MigrationInterface {
    name = 'Seed2617378125500';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
            const pilots = [
            { id: 4, name: 'Luke Skywalker', image: 'uploads/1722046002792-697122339.png' },
            { id: 5, name: 'Obi-Wan Kenobi', image: 'uploads/1722046066770-712994082.png' },
            { id: 9, name: 'Wilhuff Tarkin', image: 'uploads/1722046140094-378918983.png' },
            { id: 7, name: 'Chewbacca', image: 'uploads/1722046495501-712939603.png' },
            { id: 6, name: 'Han Solo', image: 'uploads/1722046706588-194137002.png' },
            { id: 8, name: 'Wedge Antilles', image: 'uploads/1722047282920-479970898.png' },
            { id: 10, name: 'Jek Tono Porkins', image: 'uploads/1722047861391-141674118.png' },
            { id: 1, name: 'Anakin Skywalker', image: 'uploads/1722051516368-638068869.png' },
            { id: 13, name: 'Arvel Crynyd', image: 'uploads/1722052982064-897708488.png' },
            { id: 11, name: 'Ric Olié', image: 'uploads/1722053223009-599543716.png' },
            { id: 14, name: 'Biggs Darklighter', image: 'uploads/1722072860184-589728345.png' }
            ];

            for (const pilot of pilots) {
            await queryRunner.manager.save(
                queryRunner.manager.create<Pilot, Partial<Pilot>>(Pilot, pilot)
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const pilotNames = [
        'Luke Skywalker', 'Obi-Wan Kenobi', 'Wilhuff Tarkin', 'Chewbacca', 
        'Han Solo', 'Wedge Antilles', 'Jek Tono Porkins', 'Anakin Skywalker', 
        'Arvel Crynyd', 'Ric Olié', 'Biggs Darklighter'
        ];
        await queryRunner.manager.delete(Pilot, { name: pilotNames });
    }
}
