import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError, Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ProductEditComponent', () => {
    let component: ProductEditComponent;
    let fixture: ComponentFixture<ProductEditComponent>;
    let mockProductService: jasmine.SpyObj<ProductService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: any;

    beforeEach(async () => {
      mockProductService = jasmine.createSpyObj('ProductService', ['getProduct', 'createProduct', 'updateProduct', 'deleteProduct']);
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
      mockActivatedRoute = {
        paramMap: of({
          get: (key: string) => '1'
        })
      };

      await TestBed.configureTestingModule({
        imports: [ProductEditComponent],
        providers: [
          { provide: ProductService, useValue: mockProductService },
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          FormBuilder
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
      expect(component.productForm).toBeDefined();
      expect(component.productForm.get('productName')?.value).toBe('');
      expect(component.productForm.get('productCode')?.value).toBe('');
      expect(component.productForm.get('starRating')?.value).toBe('');
      expect(component.productForm.get('tags')?.value).toEqual([]);
      expect(component.productForm.get('description')?.value).toBe('');
    });

    it('should add a tag', () => {
      const initialLength = component.tags.length;
      component.addTag();
      expect(component.tags.length).toBe(initialLength + 1);
    });

    it('should delete a tag', () => {
      component.addTag();
      component.addTag();
      expect(component.tags.length).toBe(2);
      component.deleteTag(0);
      expect(component.tags.length).toBe(1);
    });

    it('should set errorMessage if saveProduct called with invalid form', () => {
      component.productForm.patchValue({ productName: '' });
      component.saveProduct();
      expect(component.errorMessage).toBe('Please correct the validation errors.');
    });

    it('should call createProduct if id is 0 on saveProduct', () => {
      component.product = { id: 0 } as Product;
      component.productForm.patchValue({
        productName: 'Test',
        productCode: 'TST',
        starRating: 3,
        description: 'desc'
      });
      component.productForm.markAsDirty();
      mockProductService.createProduct.and.returnValue(of({
        id: 2,
        productName: 'Test',
        productCode: 'TST',
        starRating: 3,
        description: 'desc',
        tags: []
      } as Product));
      spyOn(component, 'onSaveComplete');
      component.saveProduct();
      expect(mockProductService.createProduct).toHaveBeenCalled();
      expect(component.onSaveComplete).toHaveBeenCalled();
    });

    it('should call updateProduct if id is not 0 on saveProduct', () => {
      component.product = { id: 2 } as Product;
      component.productForm.patchValue({
        productName: 'Test',
        productCode: 'TST',
        starRating: 3,
        description: 'desc'
      });
      component.productForm.markAsDirty();
      mockProductService.updateProduct.and.returnValue(of({
        id: 2,
        productName: 'Test',
        productCode: 'TST',
        starRating: 3,
        description: 'desc',
        tags: []
      } as Product));
      spyOn(component, 'onSaveComplete');
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalled();
      expect(component.onSaveComplete).toHaveBeenCalled();
    });

    it('should call getProduct on ngOnInit', () => {
      mockProductService.getProduct.and.returnValue(of({ id: 1, productName: 'Test', productCode: 'TST', starRating: 3, description: '', tags: [] } as Product));
      component.ngOnInit();
      expect(mockProductService.getProduct).toHaveBeenCalledWith(1);
    });

    it('should set pageTitle to Add Product if product id is 0', () => {
      const product = { id: 0, productName: '', productCode: '', starRating: 1, description: '', tags: [] } as Product;
      component.displayProduct(product);
      expect(component.pageTitle).toBe('Add Product');
    });

    it('should set pageTitle to Edit Product if product id is not 0', () => {
      const product = { id: 2, productName: 'Test', productCode: '', starRating: 1, description: '', tags: [] } as Product;
      component.displayProduct(product);
      expect(component.pageTitle).toBe('Edit Product: Test');
    });

    it('should call deleteProduct and onSaveComplete if id is 0', () => {
      component.product = { id: 0 } as Product;
      spyOn(component, 'onSaveComplete');
      component.deleteProduct();
      expect(component.onSaveComplete).toHaveBeenCalled();
    });

    it('should call productService.deleteProduct if id is not 0 and confirm returns true', () => {
      component.product = { id: 2, productName: 'Test' } as Product;
      spyOn(window, 'confirm').and.returnValue(true);
      mockProductService.deleteProduct.and.returnValue(of({}));
      spyOn(component, 'onSaveComplete');
      component.deleteProduct();
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(2);
      expect(component.onSaveComplete).toHaveBeenCalled();
    });

    it('should not call productService.deleteProduct if confirm returns false', () => {
      component.product = { id: 2, productName: 'Test' } as Product;
      spyOn(window, 'confirm').and.returnValue(false);
      component.deleteProduct();
      expect(mockProductService.deleteProduct).not.toHaveBeenCalled();
    });

    it('should unsubscribe on ngOnDestroy', () => {
      const sub = new Subscription();
      spyOn(sub, 'unsubscribe');
      (component as any).sub = sub;
      component.ngOnDestroy();
      expect(sub.unsubscribe).toHaveBeenCalled();
    });

    it('should navigate to /products on onSaveComplete', () => {
      component.onSaveComplete();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
    });

    it('should set errorMessage if getProduct fails', () => {
      mockProductService.getProduct.and.returnValue(throwError(() => 'error'));
      component.getProduct(1);
      expect(component.errorMessage).toBe('error');
    });
  });
});
