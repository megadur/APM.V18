import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routesProduct: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'products/:id/edit',
    //canDeactivate: [ProductEditGuard],
    component: ProductEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesProduct)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
