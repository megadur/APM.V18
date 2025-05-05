import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let mockProductService: jasmine.SpyObj<ProductService>;

  // beforeEach(async () => {
  //   mockProductService = jasmine.createSpyObj('ProductService', [
  //     'getProducts',
  //   ]);

  //   await TestBed.configureTestingModule({
  //     imports: [ProductListComponent],
  //     providers: [
  //       provideRouter([]),
  //       provideHttpClient(),
  //       provideHttpClientTesting(),
  //       { provide: ProductService, useValue: mockProductService },
  //     ],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(ProductListComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        //        { provide: ProductService, useValue: mockProductService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  const mockProducts: Product[] = [
    {
      id: 1,
      productName: 'Product A',
      tags: ['tag1', 'tag2'],
      starRating: 0,
    },
    { id: 2, productName: 'Product B', tags: ['tag3'], starRating: 0 },
    { id: 3, productName: 'Product C', tags: [], starRating: 0 },
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize products and filteredProducts on ngOnInit', () => {
    // Create a fake TwainService object with a `getQuote()` spy
    //const productService = TestBed.inject(ProductService);
    // Make the spy return a synchronous Observable with the test data
    //getProductsSpy = spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
    //mockProductService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
  });

  fit('should handle error on productService.getProducts failure', () => {
    const errorMessage = 'Error loading products';
    spyOn(productService, 'getProducts').and.returnValue(
      throwError(() => errorMessage),
    );
    // mockProductService.getProducts.and.returnValue(
    //   throwError(() => errorMessage),
    // );

    component.ngOnInit();

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.products).toEqual([]);
    expect(component.filteredProducts).toEqual([]);
  });

  it('should filter products by name using performFilter', () => {
    component.products = mockProducts;

    const filtered = component.performFilter('Product A');

    expect(filtered).toEqual([mockProducts[0]]);
  });

  it('should filter products by name or tags using performFilter2', () => {
    component.products = mockProducts;

    const filtered = component.performFilter2('tag3');

    expect(filtered).toEqual([mockProducts[1]]);
  });

  it('should toggle showImage when toggleImage is called', () => {
    expect(component.showImage).toBeFalse();

    component.toggleImage();

    expect(component.showImage).toBeTrue();

    component.toggleImage();

    expect(component.showImage).toBeFalse();
  });

  it('should update filteredProducts when listFilter is set', () => {
    component.products = mockProducts;

    component.listFilter = 'Product B';

    expect(component.filteredProducts).toEqual([mockProducts[1]]);
  });
});
