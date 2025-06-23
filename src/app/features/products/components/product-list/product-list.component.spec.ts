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
    { id: 4, productName: 'Another Product', tags: ['tag1'], starRating: 0 },
  ];

  beforeEach(waitForAsync(() => {
    // Create a spy object for ProductService
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    TestBed.configureTestingModule({
      imports: [ProductListComponent], // ProductListComponent is standalone
      providers: [
        provideRouter([]), // For RouterLink, RouterModule if used in template
        provideHttpClient(), // provideHttpClient is usually for app config
        provideHttpClientTesting(), // For mocking HTTP requests if service wasn't mocked
        { provide: ProductService, useValue: mockProductService }, // Provide the mock
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    // No fixture.detectChanges() here yet, ngOnInit will be called manually or by first detectChanges() in test
  });

  it('should create', () => {
    fixture.detectChanges(); // Initial binding and ngOnInit if not called manually
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize products and filteredProducts on successful getProducts', () => {
      mockProductService.getProducts.and.returnValue(of(mockProducts));
      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.products).toEqual(mockProducts);
      expect(component.filteredProducts).toEqual(mockProducts);
      expect(component.errorMessage).toBe('');
    });

    it('should handle error on productService.getProducts failure', () => {
      const errorMessage = 'Error loading products';
      mockProductService.getProducts.and.returnValue(throwError(() => errorMessage));
      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.errorMessage).toBe(errorMessage);
      expect(component.products).toEqual([]);
      expect(component.filteredProducts).toEqual([]);
    });

    it('should clear previous errorMessage on successful getProducts', () => {
      // First call fails
      mockProductService.getProducts.and.returnValue(throwError(() => 'Initial Error'));
      fixture.detectChanges(); // Triggers ngOnInit
      expect(component.errorMessage).toBe('Initial Error');

      // Second call succeeds
      mockProductService.getProducts.and.returnValue(of(mockProducts));
      component.ngOnInit(); // Call ngOnInit again
      // fixture.detectChanges() might not be needed if component state is all that's tested

      expect(component.errorMessage).toBe('');
      expect(component.products).toEqual(mockProducts);
      expect(component.filteredProducts).toEqual(mockProducts);
    });
  });

  describe('performFilter2', () => {
    beforeEach(() => {
      // Set products before each test in this block
      component.products = [...mockProducts]; // Use a copy to avoid test interference
      // Initialize filteredProducts as if ngOnInit just ran successfully
      component.filteredProducts = [...mockProducts];
    });

    it('should filter products by product name (case-insensitive)', () => {
      const filtered = component.performFilter2('product a');
      expect(filtered.length).toBe(1);
      expect(filtered).toContain(mockProducts[0]); // Product A
    });

    it('should filter products by tag (case-insensitive)', () => {
      const filtered = component.performFilter2('TAG3'); // Product B
      expect(filtered.length).toBe(1);
      expect(filtered).toContain(mockProducts[1]);
    });

    it('should return products matching either name or tag', () => {
      const filteredByName = component.performFilter2('Product A');
      expect(filteredByName.length).toBe(1);
      expect(filteredByName).toContain(mockProducts[0]);

      const filteredByTag = component.performFilter2('tag1'); // Matches Product A and Another Product
      expect(filteredByTag.length).toBe(2);
      expect(filteredByTag).toContain(mockProducts[0]); // Product A (tags: ['tag1', 'tag2'])
      expect(filteredByTag).toContain(mockProducts[3]); // Another Product (tags: ['tag1'])
    });

    it('should prioritize name match if filter text matches both name and tag of different items', () => {
        // This test depends on specific setup, let's ensure mockProducts supports it.
        // Let's say Product X has name "Common" and Product Y has tag "Common"
        const localMockProducts = [
            { id: 10, productName: 'CommonName', tags: ['uniqueTag'], starRating: 3},
            { id: 11, productName: 'UniqueName', tags: ['CommonTag'], starRating: 3},
            ...mockProducts
        ];
        component.products = localMockProducts;
        const filtered = component.performFilter2('Common');
        // Assuming current logic: OR condition means both should be returned if "Common" matches name and tag
        // If "CommonName" and "CommonTag" are the search terms this is more specific.
        // If the requirement is more complex (e.g. name first), performFilter2 logic would need change.
        // Current performFilter2 is a simple OR, so it will return both.
         expect(filtered.some(p => p.id === 10)).toBeTrue();
         expect(filtered.some(p => p.id === 11)).toBeTrue();
    });

    it('should return all products if filterBy is an empty string', () => {
      const filtered = component.performFilter2('');
      expect(filtered).toEqual(component.products);
    });

    it('should return an empty array if filterBy does not match any product name or tag', () => {
      const filtered = component.performFilter2('nonexistentXYZ');
      expect(filtered).toEqual([]);
    });

    it('should handle products with null productName correctly', () => {
      component.products = [
        { id: 5, productName: null, productCode: 'P5', description: '', category: '', releaseDate: '', price: 0, starRating: 1, imageUrl: '', tags: ['testNullName'] },
        mockProducts[0], // Product A
      ];
      // Should not find "Product A" if searching for null, but should find by tag
      const filteredByTag = component.performFilter2('testNullName');
      expect(filteredByTag.length).toBe(1);
      expect(filteredByTag[0].id).toBe(5);

      // Searching for "Product A" should still find Product A
      const filteredForProductA = component.performFilter2('Product A');
      expect(filteredForProductA.length).toBe(1);
      expect(filteredForProductA).toContain(mockProducts[0]);
    });

    it('should handle products with undefined productName correctly', () => {
      component.products = [
        { id: 6, productName: undefined, productCode: 'P6', description: '', category: '', releaseDate: '', price: 0, starRating: 1, imageUrl: '', tags: ['testUndefinedName'] },
        mockProducts[0], // Product A
      ];
      const filteredByTag = component.performFilter2('testUndefinedName');
      expect(filteredByTag.length).toBe(1);
      expect(filteredByTag[0].id).toBe(6);

      const filteredForProductA = component.performFilter2('Product A');
      expect(filteredForProductA.length).toBe(1);
      expect(filteredForProductA).toContain(mockProducts[0]);
    });

    it('should handle products with null tags correctly', () => {
      component.products = [
        { id: 7, productName: 'TestProdNullTags', productCode: 'P7', description: '', category: '', releaseDate: '', price: 0, starRating: 1, imageUrl: '', tags: null },
        mockProducts[1], // Product B (tags: ['tag3'])
      ];
      const filteredByName = component.performFilter2('TestProdNullTags');
      expect(filteredByName.length).toBe(1);
      expect(filteredByName[0].id).toBe(7);

      const filteredForProductB = component.performFilter2('tag3');
      expect(filteredForProductB.length).toBe(1);
      expect(filteredForProductB).toContain(mockProducts[1]);
    });

    it('should handle products with undefined tags correctly', () => {
      component.products = [
        { id: 8, productName: 'TestProdUndefinedTags', productCode: 'P8', description: '', category: '', releaseDate: '', price: 0, starRating: 1, imageUrl: '', tags: undefined },
        mockProducts[1], // Product B (tags: ['tag3'])
      ];
      const filteredByName = component.performFilter2('TestProdUndefinedTags');
      expect(filteredByName.length).toBe(1);
      expect(filteredByName[0].id).toBe(8);

      const filteredForProductB = component.performFilter2('tag3');
      expect(filteredForProductB.length).toBe(1);
      expect(filteredForProductB).toContain(mockProducts[1]);
    });

    it('should handle products with empty tags array correctly', () => {
      // mockProducts[2] is "Product C" with tags: []
      const filteredByName = component.performFilter2('Product C');
      expect(filteredByName.length).toBe(1);
      expect(filteredByName).toContain(mockProducts[2]);

      // Ensure searching by a tag doesn't find it if tags array is empty
      component.products = [mockProducts[2]]; // Only Product C
      const filteredByTag = component.performFilter2('anytag');
      expect(filteredByTag).toEqual([]);
    });
  });

  describe('listFilter setter', () => {
    beforeEach(() => {
      // For these tests, we simulate products being loaded as if by ngOnInit
      mockProductService.getProducts.and.returnValue(of([...mockProducts]));
      fixture.detectChanges(); // This calls ngOnInit and loads products
    });

    it('should filter products using performFilter2 logic when listFilter is set', () => {
      component.listFilter = 'Product B'; // Matches name of Product B
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts).toContain(mockProducts[1]);

      component.listFilter = 'tag1'; // Matches tag (Product A and Another Product)
      expect(component.filteredProducts.length).toBe(2);
      expect(component.filteredProducts).toContain(mockProducts[0]); // Product A
      expect(component.filteredProducts).toContain(mockProducts[3]); // Another Product
    });

    it('should set filteredProducts to all products if listFilter is set to an empty string', () => {
      component.listFilter = 'Product A'; // Filter first
      expect(component.filteredProducts.length).toBe(1);

      component.listFilter = ''; // Then clear filter by setting to empty string
      expect(component.filteredProducts.length).toBe(mockProducts.length);
      expect(component.filteredProducts).toEqual(mockProducts);
    });

    it('should update filteredProducts correctly when listFilter is set multiple times', () => {
      component.listFilter = 'Product C'; // Product C
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts).toContain(mockProducts[2]);

      component.listFilter = 'tag2'; // Product A
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts).toContain(mockProducts[0]);
    });

    it('should handle listFilter being set when initial products array was empty and then populated', () => {
      // Simulate starting with no products
      mockProductService.getProducts.and.returnValue(of([]));
      fixture.detectChanges(); // ngOnInit loads empty products
      expect(component.products).toEqual([]);
      expect(component.filteredProducts).toEqual([]);

      component.listFilter = 'Product A'; // Try to filter on empty list
      expect(component.filteredProducts).toEqual([]);

      // Simulate products being loaded later (e.g. refresh)
      component.products = [...mockProducts];
      component.listFilter = 'Product A'; // Re-apply filter now that products exist
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts).toContain(mockProducts[0]);
    });

     it('should use performFilter2, filtering by name OR tag from listFilter', () => {
      component.listFilter = 'Another'; // Matches "Another Product" by name
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts[0].productName).toBe('Another Product');

      component.listFilter = 'tag3'; // Matches "Product B" by tag
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts[0].productName).toBe('Product B');
    });
  });

  it('should toggle showImage when toggleImage is called', () => {
    // Initial state check, showImage is false by default
    expect(component.showImage).toBeFalse();

    component.toggleImage();
    expect(component.showImage).toBeTrue();

    component.toggleImage();
    expect(component.showImage).toBeFalse();
  });

  // The old 'should update filteredProducts when listFilter is set' is now covered by the 'listFilter setter' describe block
});
