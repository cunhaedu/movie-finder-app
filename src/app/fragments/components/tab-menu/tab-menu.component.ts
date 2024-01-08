import { homeOutline, searchOutline, bookmarkOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  templateUrl: 'tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
  imports: [
    IonTabs,
    IonIcon,
    IonLabel,
    IonTabBar,
    IonToolbar,
    IonTabButton,
    RouterModule,
  ],
})
export class TabMenuComponent {
  private router = inject(Router);

  constructor() {
    addIcons({ homeOutline, searchOutline, bookmarkOutline });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
