import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { NavController, AnimationController  } from '@ionic/angular';
import { CartService, Product } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage implements OnInit {

 
  products: Product[] = [];
  constructor(private authService: AuthService, 
    private cartService: CartService,
    private router: Router, 
    private navCtrl: NavController,) {}


  ngOnInit(): void {
    this.authService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (error) => console.error('Error fetching products:', error),
    });
  }


  goToDetails() {
  
    this.navCtrl.navigateForward('/category');
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}