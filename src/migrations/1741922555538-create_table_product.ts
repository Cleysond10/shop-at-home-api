import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProduct1741922555538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.product (
            id integer NOT NULL,
            category_id integer NOT NULL,
            name character varying NOT NULL,
            price double precision NOT NULL,
            image character varying NOT NULL,
            weight double precision NOT NULL DEFAULT 0,
            length integer NOT NULL DEFAULT 0,
            height integer NOT NULL DEFAULT 0,
            width integer NOT NULL DEFAULT 0,
            diameter integer NOT NULL DEFAULT 0,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (category_id) REFERENCES public.category(id)
        );

        CREATE SEQUENCE public.product_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;

        ALTER TABLE ONLY public.product
            ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            drop table public.product;
        `);
  }
}
