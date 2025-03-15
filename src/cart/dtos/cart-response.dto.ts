import { CartProductResponseDTO } from '../../cart-product/dtos/cart-product-response.dto';
import { CartEntity } from '../entities/cart.entity';

export class CartResponseDTO {
  id: number;
  cartProduct?: CartProductResponseDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new CartProductResponseDTO(cartProduct),
        )
      : undefined;
  }
}
