import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule , IonIcon} from '@ionic/angular';
import { NavController, AnimationController  } from '@ionic/angular';
import { ProductComponent } from '../product/product.component';
@Component({
  selector: 'app-category',
  standalone : true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [CommonModule, FormsModule,  IonicModule   ]
})
export class CategoryComponent  implements OnInit {
 pcomponent = ProductComponent ;
  constructor(private navCtrl: NavController,private animationCtrl: AnimationController) { }

  ngOnInit() {}
  goToDetails() {
  
    this.navCtrl.navigateForward('/detail');
  }
}
