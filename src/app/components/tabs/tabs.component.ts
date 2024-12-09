import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
        
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="about">
        
          <ion-label>About</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="contact">
         
          <ion-label>Contact</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class TabsComponent {
  constructor() {}
}