import { PaymentStatusResponseDTO } from '../../payment-status/dtos/payment-status-response.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class PaymentResponseDTO {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: PaymentStatusResponseDTO;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new PaymentStatusResponseDTO(payment.paymentStatus)
      : undefined;
  }
}
