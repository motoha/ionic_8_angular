import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
 
import { HttpClient } from '@angular/common/http';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterModule ],
  
  providers: [HttpClient]
})
export class AppComponent {
  constructor(private cartService: CartService) {
    console.log('Current cart:', this.cartService.cart());
  }
}
