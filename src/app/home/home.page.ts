import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { NavController, AnimationController  } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router, private navCtrl: NavController,) {}

  goToDetails() {
  
    this.navCtrl.navigateForward('/category');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}