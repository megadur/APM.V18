import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';
import { ProductDetailComponent } from './product-detail.component';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let httpClient: HttpClient;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    productService = new ProductService(httpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set product when getProduct is called successfully', () => {
    const mockProduct = { id: 1, productName: 'Test Product' } as Product;
    //const productService = TestBed.inject(ProductService);
    //const productService = new ProductService(this.httpClient);

    spyOn(productService, 'getProduct').and.returnValue(of(mockProduct));
    // spyOn(productService, 'getProduct').and.returnValue(
    // {
    //   subscribe: (callbacks: {
    //     next: (product: Product) => void;
    //     error: (err: string) => void;
    //   }) => {
    //     callbacks.next(mockProduct);
    //   },
    // });

    component.getProduct(1);

    expect(component.product).toEqual(mockProduct);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage when getProduct fails', () => {
    const mockError = 'Error occurred';
    const productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProduct').and.returnValue(
      throwError(() => mockError),
    );

    component.getProduct(1);

    expect(component.product).toBeUndefined();
    expect(component.errorMessage).toBe(mockError);
  });

  it('should navigate to /products when onBack is called', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.onBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should call getProduct with correct id on ngOnInit', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    const getProductSpy = spyOn(component, 'getProduct');

    component.ngOnInit();

    expect(getProductSpy).toHaveBeenCalledWith(1);
  });
});
