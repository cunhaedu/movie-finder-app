import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./screens/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./screens/details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./screens/search/search.page').then( m => m.SearchPage)
  },
];
