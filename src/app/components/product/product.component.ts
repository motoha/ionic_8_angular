import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, AnimationController  } from '@ionic/angular';
@Component({
  selector: 'app-product',
  standalone : true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [CommonModule, FormsModule,  IonicModule]
})
export class ProductComponent  implements OnInit {

  constructor(private navCtrl: NavController,) { }

  ngOnInit() {}
  goToDetails() {
  
    this.navCtrl.navigateForward('/cart');
  }
}
