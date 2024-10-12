import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StarComponent } from '../../../../shared/star/star.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    BrowserModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StarComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName?.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the product name and tags
  performFilter2(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName?.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      (product.tags && product.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }
}
