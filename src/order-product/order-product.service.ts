import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderGroupResponse } from './dtos/order-group-response.dto';
import { OrderProductEntity } from './entities/order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
  ) {}

  async createOrderProduct(
    productId: number,
    orderId: number,
    price: number,
    amount: number,
  ): Promise<OrderProductEntity> {
    return this.orderProductRepository.save({
      amount,
      orderId,
      price,
      productId,
    });
  }

  async findAmountProductsByOrderId(
    orderId: number[],
  ): Promise<OrderGroupResponse[]> {
    return this.orderProductRepository
      .createQueryBuilder('order_product')
      .select('order_product.order_id, COUNT(*) as total')
      .where('order_product.order_id IN (:...ids)', { ids: orderId })
      .groupBy('order_product.order_id')
      .getRawMany();
  }
}
