import { OrderResponseDTO } from '../../order/dtos/order-response.dto';
import { ProductResponseDTO } from '../../product/dtos/product-response.dto';
import { OrderProductEntity } from '../entities/order-product.entity';

export class OrderProductResponseDTO {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: OrderResponseDTO;
  product?: ProductResponseDTO;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new OrderResponseDTO(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new ProductResponseDTO(orderProduct.product)
      : undefined;
  }
}
