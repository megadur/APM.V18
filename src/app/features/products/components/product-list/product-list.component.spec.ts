import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let mockProductService: jasmine.SpyObj<ProductService>;

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

    beforeEach(async () => {
      mockProductService = jasmine.createSpyObj('ProductService', [
        'getProducts',
      ]);

      await TestBed.configureTestingModule({
        imports: [ProductListComponent],
        providers: [{ provide: ProductService, useValue: mockProductService }],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize products and filteredProducts on ngOnInit', () => {
      mockProductService.getProducts.and.returnValue(of(mockProducts));

      component.ngOnInit();

      expect(component.products).toEqual(mockProducts);
      expect(component.filteredProducts).toEqual(mockProducts);
    });

    it('should handle error on productService.getProducts failure', () => {
      const errorMessage = 'Error loading products';
      mockProductService.getProducts.and.returnValue(
        throwError(() => errorMessage),
      );

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
});
