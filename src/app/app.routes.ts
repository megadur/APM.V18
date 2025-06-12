import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectComponent } from './core/ayyash/project/project.component';
import { ProjectResolve } from './core/ayyash/services/project.resolve';

export const routes: Routes = [
  { path: 'welcome', component: HomeComponent },
  {
    path: 'project',
    component: ProjectComponent,
    resolve: {
      ready: ProjectResolve,
    },
  },
  {
    path: 'products',
    loadComponent: () =>
      import(
        './features/products/components/product-list/product-list.component'
      ).then((m) => m.ProductListComponent),
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import(
        './features/products/components/product-detail/product-detail.routes'
      ).then((m) => m.routes),
  },
  {
    path: 'products/:id/edit',
    loadChildren: () =>
      import(
        './features/products/components/product-edit/product-edit.routes'
      ).then((m) => m.routes),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
