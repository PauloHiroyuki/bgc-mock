import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/lista-mocks/lista-mocks.component').then(m => m.ListaMocksComponent)
  },  
  {
    path: 'mock',
    loadComponent: () => import('./modules/form-mocks/form-mocks.component').then(m => m.FormMocksComponent)
  },  
  {
    path: 'mock/:id',
    loadComponent: () => import('./modules/form-mocks/form-mocks.component').then(m => m.FormMocksComponent)
  },  
  {
    path: 'mock/:id/logs',
    loadComponent: () => import('./modules/logs-mock/logs-mock.component').then(m => m.LogsMockComponent)
  },
];
