import { OrderProductResponseDTO } from '../../order-product/dtos/order-product-response.dto';
import { AddressResponseDTO } from '../../address/dtos/address-response.dto';
import { PaymentResponseDTO } from '../../payment/dtos/payment-response.dto';
import { UserResponseDTO } from '../../user/dtos/user-response.dto';
import { OrderEntity } from '../entities/order.entity';

export class OrderResponseDTO {
  id: number;
  date: string;
  userId: number;
  addressId: number;
  paymentId: number;
  user?: UserResponseDTO;
  address?: AddressResponseDTO;
  payment?: PaymentResponseDTO;
  ordersProduct?: OrderProductResponseDTO[];
  amountProducts?: number;

  constructor(order?: OrderEntity) {
    this.id = order?.id ?? 0;
    this.date = order?.date ? order.date.toString() : '';
    this.userId = order?.userId ?? 0;
    this.addressId = order?.addressId ?? 0;
    this.paymentId = order?.paymentId ?? 0;
    this.user = order?.user ? new UserResponseDTO(order?.user) : undefined;
    this.address = order?.address
      ? new AddressResponseDTO(order?.address)
      : undefined;
    this.payment = order?.payment
      ? new PaymentResponseDTO(order?.payment)
      : undefined;
    this.ordersProduct = order?.ordersProduct
      ? order?.ordersProduct.map(
          (orderProduct) => new OrderProductResponseDTO(orderProduct),
        )
      : undefined;
    this.amountProducts = order?.amountProducts;
  }
}
