import { CartResponseDTO } from '../../cart/dtos/cart-response.dto';
import { ProductResponseDTO } from '../../product/dtos/product-response.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class CartProductResponseDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ProductResponseDTO;
  cart?: CartResponseDTO;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ProductResponseDTO(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new CartResponseDTO(cartProduct.cart)
      : undefined;
  }
}
