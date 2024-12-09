import { Component, OnInit,   ChangeDetectionStrategy, signal, effect, inject, Injector, CreateEffectOptions} from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { FormsModule } from '@angular/forms';
import { IonicModule , IonIcon} from '@ionic/angular';
import { NavController, AnimationController  } from '@ionic/angular';
import { CartItem , CartService} from 'src/app/services/cart.service';
import { runInInjectionContext } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone :true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule,  IonicModule   ]
})
export class CartComponent  implements OnInit {
  cartItems = signal<CartItem[]>([]);
  private cartService = inject(CartService);
  totalPrice = signal<number>(0);
  private injector: Injector = inject(Injector);
  constructor() {
    const options: CreateEffectOptions = { allowSignalWrites: true };
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.cartItems.set(this.cartService.cart());
        this.totalPrice.set(this.cartService.getTotalPrice());
      }, options);
    });
  }
  ngOnInit(): void {
    this.cartItems.set(this.cartService.getCartItems()());
  } removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }  addItem(productId: number) {
    this.cartService.addItem(productId);
  }
}
