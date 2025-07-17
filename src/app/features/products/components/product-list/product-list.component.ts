import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { StarComponent } from '../../../../shared/star/star.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
    StarComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
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
// In your component (if this is the expected behavior)
set listFilter(value: string) {
  this._listFilter = value;
  // If filteredProducts is empty but products has data, use products as source
  const sourceArray = this.filteredProducts.length === 0 && this.products.length > 0
    ? this.products
    : this.products;
  this.filteredProducts = this.performFilter2(value);
}

  filteredProducts: Product[] = [];
  products: Product[] = [];
  private productService = inject(ProductService);

  constructor() {}

  // Checks both the product name and tags
  performFilter2(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>
        product.productName?.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        (product.tags &&
          product.tags.some(
            (tag) => tag.toLocaleLowerCase().indexOf(filterBy) !== -1,
          )),
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
        this.errorMessage = ''; // Clear error message on success
      },
      error: (err) => (this.errorMessage = err),
    });
  }

}
