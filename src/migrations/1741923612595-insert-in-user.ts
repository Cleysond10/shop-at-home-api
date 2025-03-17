import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertInUser1741923612595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO public."user"(
                name, email, cpf, type, phone, password)
                VALUES ('root', 'root@root.com', '12345678901', 2, '81900000000', '$2a$12$TXAubZ/QHRiFu5o8v6ePD.4lbPqmqSXivx5vUlbrxQHx7pz3diVe.');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public."user"
                WHERE email like 'root@root.com';
        `);
  }
}
