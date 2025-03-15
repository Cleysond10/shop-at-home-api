import { ProductResponseDTO } from '../../product/dtos/product-response.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryResponseDTO {
  id: number;
  name: string;
  amountProducts?: number;
  products?: ProductResponseDTO[];

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
    this.products = categoryEntity.products
      ? categoryEntity.products.map((product) => new ProductResponseDTO(product))
      : undefined;
  }
}
