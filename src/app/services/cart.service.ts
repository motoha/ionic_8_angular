import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  constructor() {
    this.loadCartFromStorage();
  }

  get cart() {
    return this.cartItems.asReadonly();
  }

  getCartItems() {
    return this.cartItems.asReadonly();
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems().find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = this.cartItems().map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const cartItem: CartItem = { ...product, quantity: 1 };
      updatedCart = [...this.cartItems(), cartItem];
    }

    this.cartItems.set(updatedCart);
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
  getTotalPrice() {
    return this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  }
  loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    console.log('Stored cart data:', storedCart);

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        console.log('Parsed cart:', parsedCart);

        if (Array.isArray(parsedCart)) {
          this.cartItems.set(parsedCart);
          console.log('Cart loaded into signal:', this.cartItems());
        } else {
          console.warn('Stored cart data is not valid.');
        }
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
      }
    }
  }removeFromCart(productId: number) {
    const updatedCart = this.cartItems().filter((item) => item.id !== productId);
    this.cartItems.set(updatedCart);
    this.saveCartToStorage();
  }   addItem(productId: number) {
    const updatedCart = this.cartItems().map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.cartItems.set(updatedCart);
    this.saveCartToStorage();
  }
}