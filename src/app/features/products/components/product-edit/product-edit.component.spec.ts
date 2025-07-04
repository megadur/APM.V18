import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductEditComponent } from './product-edit.component';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { ProductService } from '../../data/service/product.service';
import { Product } from '../../data/types/product';
import { GenericValidator } from '../../../../shared/validators/generic.validator';
import { NumberValidators } from '../../../../shared/validators/number.validator';
import { CommonModule } from '@angular/common';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;
  let paramMapSubject: Subject<any>;

  const testProduct: Product = {
    id: 1,
    productName: 'Test Product',
    productCode: 'TP-001',
    starRating: 4,
    description: 'A test product',
    tags: ['tag1', 'tag2']
  };

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProduct',
      'createProduct',
      'updateProduct',
      'deleteProduct'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    paramMapSubject = new Subject();
    mockActivatedRoute = {
      paramMap: paramMapSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CommonModule],
      declarations: [ProductEditComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('productName')).toBeTruthy();
    expect(component.productForm.get('productCode')).toBeTruthy();
    expect(component.productForm.get('starRating')).toBeTruthy();
    expect(component.productForm.get('tags')).toBeTruthy();
    expect(component.productForm.get('description')).toBeTruthy();
  });

  it('should get tags as FormArray', () => {
    expect(component.tags instanceof FormArray).toBeTrue();
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

  it('should call getProduct on ngOnInit with route param', () => {
    spyOn(component, 'getProduct');
    paramMapSubject.next({
      get: (key: string) => key === 'id' ? '5' : null
    });
    expect(component.getProduct).toHaveBeenCalledWith(5);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    component.sub = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.sub?.unsubscribe).toHaveBeenCalled();
  });

  it('should display product and update form', () => {
    component.displayProduct(testProduct);
    expect(component.productForm.value.productName).toBe(testProduct.productName);
    expect(component.productForm.value.productCode).toBe(testProduct.productCode);
    expect(component.productForm.value.starRating).toBe(testProduct.starRating);
    expect(component.productForm.value.description).toBe(testProduct.description);
    expect(component.tags.length).toBe(testProduct.tags!.length);
    expect(component.pageTitle).toContain('Edit Product');
  });

  it('should set pageTitle to "Add Product" for new product', () => {
    const newProduct = { ...testProduct, id: 0 };
    component.displayProduct(newProduct);
    expect(component.pageTitle).toBe('Add Product');
  });

  it('should call productService.getProduct in getProduct', () => {
    mockProductService.getProduct.and.returnValue(of(testProduct));
    component.displayProduct = jasmine.createSpy();
    component.getProduct(1);
    expect(mockProductService.getProduct).toHaveBeenCalledWith(1);
  });

  it('should set errorMessage if getProduct fails', () => {
    mockProductService.getProduct.and.returnValue(throwError(() => 'error'));
    component.getProduct(1);
    expect(component.errorMessage).toBe('error');
  });

  it('should call productService.deleteProduct and onSaveComplete on deleteProduct', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.product = { ...testProduct };
    mockProductService.deleteProduct.and.returnValue(of({}));
    spyOn(component, 'onSaveComplete');
    component.deleteProduct();
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(testProduct.id!);
    expect(component.onSaveComplete).toHaveBeenCalled();
  });

  it('should call onSaveComplete if deleting unsaved product', () => {
    component.product = { ...testProduct, id: 0 };
    spyOn(component, 'onSaveComplete');
    component.deleteProduct();
    expect(component.onSaveComplete).toHaveBeenCalled();
  });

  it('should not call deleteProduct if confirm is false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.product = { ...testProduct };
    component.deleteProduct();
    expect(mockProductService.deleteProduct).not.toHaveBeenCalled();
  });

  it('should call productService.createProduct on saveProduct for new product', () => {
    component.product = { ...testProduct, id: 0 };
    component.productForm.patchValue({
      productName: 'New Product',
      productCode: 'NP-001',
      starRating: 3,
      description: 'desc'
    });
    component.productForm.markAsDirty();
    mockProductService.createProduct.and.returnValue(of({}));
    spyOn(component, 'onSaveComplete');
    component.saveProduct();
    expect(mockProductService.createProduct).toHaveBeenCalled();
    expect(component.onSaveComplete).toHaveBeenCalled();
  });

  it('should call productService.updateProduct on saveProduct for existing product', () => {
    component.product = { ...testProduct };
    component.productForm.patchValue({
      productName: 'Updated Product',
      productCode: 'UP-001',
      starRating: 5,
      description: 'desc'
    });
    component.productForm.markAsDirty();
    mockProductService.updateProduct.and.returnValue(of({}));
    spyOn(component, 'onSaveComplete');
    component.saveProduct();
    expect(mockProductService.updateProduct).toHaveBeenCalled();
    expect(component.onSaveComplete).toHaveBeenCalled();
  });

  it('should call onSaveComplete if form is valid but not dirty', () => {
    component.product = { ...testProduct };
    spyOn(component, 'onSaveComplete');
    component.saveProduct();
    expect(component.onSaveComplete).toHaveBeenCalled();
  });

  it('should set errorMessage if form is invalid', () => {
    component.productForm.get('productName')?.setValue('');
    component.productForm.get('productCode')?.setValue('');
    component.productForm.markAsDirty();
    component.saveProduct();
    expect(component.errorMessage).toBe('Please correct the validation errors.');
  });

  it('should reset form and navigate on onSaveComplete', () => {
    spyOn(component.productForm, 'reset');
    component.onSaveComplete();
    expect(component.productForm.reset).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });
});
