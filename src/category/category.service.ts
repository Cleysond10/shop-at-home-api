import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountProduct } from '../product/dtos/count-product.dto';
import { ProductService } from '../product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { CategoryResponseDTO } from './dtos/category-response.dto';
import { CategoryEntity } from './entities/category.entity';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  findAmountCategoryInProducts(
    category: CategoryEntity,
    countList: CountProduct[],
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }

  async findAllCategories(): Promise<CategoryResponseDTO[]> {
    const categories = await this.categoryRepository.find();

    const count = await this.productService.countProdutsByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }

    return categories.map(
      (category) =>
        new CategoryResponseDTO(
          category,
          this.findAmountCategoryInProducts(category, count),
        ),
    );
  }

  async findCategoryById(
    categoryId: number,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations
      ? {
          products: true,
        }
      : undefined;

    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations,
    });

    if (!category) {
      throw new NotFoundException(`Category id: ${categoryId} not found`);
    }

    return category;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category name ${name} not found`);
    }

    return category;
  }

  async createCategory(
    createCategory: CreateCategoryDTO,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategory.name} exist`,
      );
    }

    return this.categoryRepository.save(createCategory);
  }

  async deleteCategory(categoryId: number): Promise<DeleteResult> {
    const category = await this.findCategoryById(categoryId, true);

    if (category.products && category.products.length > 0) {
      throw new BadRequestException('Category with relations.');
    }

    return this.categoryRepository.delete({ id: categoryId });
  }

  async editCategory(
    categoryId: number,
    updateCategory: UpdateCategoryDTO,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryById(categoryId);

    return this.categoryRepository.save({
      ...category,
      ...updateCategory,
    });
  }
}
