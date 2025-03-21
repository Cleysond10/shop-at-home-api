import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableCart1741922568899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.cart (
            id integer NOT NULL,
            user_id integer NOT NULL,
            active boolean NOT NULL DEFAULT true,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES public.user(id)
        );

        CREATE SEQUENCE public.cart_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;

        ALTER TABLE ONLY public.cart
            ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            drop table public.cart;
        `);
  }
}
