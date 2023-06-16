import { rest } from 'msw';

import products from '../data/products.json';
import { CART_STORAGE_ID } from '../../constants/storage';
import type { CartProduct, Product } from '../../types/product';

const findTargetProduct = (
  cartProducts: CartProduct[],
  productId: number,
  cartItemId?: number
) =>
  cartProducts.find((cartProduct) =>
    cartItemId
      ? cartItemId === cartProduct.id
      : productId === cartProduct.product.id
  );

const addTargetProduct = (
  cartProducts: CartProduct[],
  cartItemId: number,
  product: Product
) => [...cartProducts, { id: cartItemId, quantity: 1, product }];

const deleteTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.id !== id);

const updateTargetQuantity = (
  cartProducts: CartProduct[],
  id: number,
  quantity: number
) =>
  cartProducts.map((cartProduct) => {
    if (cartProduct.id === id) {
      return { ...cartProduct, quantity };
    }
    return cartProduct;
  });

export const cartProductHandlers = [
  rest.get('/cart-items', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(JSON.parse(localStorage.getItem(CART_STORAGE_ID) ?? '[]'))
    );
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCartProducts: CartProduct[] = JSON.parse(
      localStorage.getItem(CART_STORAGE_ID) ?? '[]'
    );

    if (findTargetProduct(storedCartProducts, productId)) {
      return res(ctx.status(304), ctx.json({ message: 'Already in the Cart' }));
    }

    const product = products.find((product) => product.id === productId);

    if (!product) {
      return res(ctx.status(400), ctx.json({ message: '상품이 없습니다.' }));
    }

    localStorage.setItem(
      CART_STORAGE_ID,
      JSON.stringify(addTargetProduct(storedCartProducts, product.id, product))
    );

    return res(
      ctx.status(201),
      ctx.json({ message: 'Success to Create' }),
      ctx.set('Location', `/orders/${productId}`)
    );
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      const cartProductId = Number(cartItemId as string);

      const storedCartProducts: CartProduct[] = JSON.parse(
        localStorage.getItem(CART_STORAGE_ID) ?? '[]'
      );

      if (!findTargetProduct(storedCartProducts, cartProductId)) {
        return res(ctx.status(304), ctx.json({ message: 'Not in the Cart' }));
      }

      localStorage.setItem(
        CART_STORAGE_ID,
        JSON.stringify(
          updateTargetQuantity(storedCartProducts, cartProductId, quantity)
        )
      );

      return res(
        ctx.delay(2000),
        ctx.status(200),
        ctx.json({ message: 'Success to Update' })
      );
    }
  ),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProductId = Number(cartItemId as string);

    const storedCartProducts: CartProduct[] = JSON.parse(
      localStorage.getItem(CART_STORAGE_ID) ?? '[]'
    );

    if (!findTargetProduct(storedCartProducts, cartProductId)) {
      return res(ctx.status(304), ctx.json({ message: 'Not in the Cart' }));
    }

    localStorage.setItem(
      CART_STORAGE_ID,
      JSON.stringify(deleteTargetProduct(storedCartProducts, cartProductId))
    );

    return res(ctx.delay(2000), ctx.status(204));
  }),
];
