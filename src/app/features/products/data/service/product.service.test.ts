import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Product } from '../types/product';

describe('ProductService', () => {
    let service: ProductService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        service = new ProductService(httpClientSpy);
    });

    const mockProducts: Product[] = [
        { id: 1, productName: 'Test1', productCode: 'T1', tags: ['tag1'], releaseDate: '2023-01-01', price: 10, description: 'desc', starRating: 4, imageUrl: 'img1' },
        { id: 2, productName: 'Test2', productCode: 'T2', tags: ['tag2'], releaseDate: '2023-02-01', price: 20, description: 'desc2', starRating: 5, imageUrl: 'img2' }
    ];

    it('should return expected products (getProducts)', (done) => {
        httpClientSpy.get.and.returnValue(of(mockProducts));
        service.getProducts().subscribe(products => {
            expect(products).toEqual(mockProducts);
            done();
        });
    });

    it('should handle error on getProducts', (done) => {
        const errorResponse = { error: { message: 'fail' }, status: 500, body: { error: 'fail' } };
        httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
        service.getProducts().subscribe({
            next: () => fail('expected error'),
            error: err => {
                expect(err).toContain('Backend returned code 500');
                done();
            }
        });
    });

    it('should return initialized product for id 0 (getProduct)', (done) => {
        service.getProduct(0).subscribe(product => {
            expect(product.id).toBe(0);
            expect(product.starRating).toBe(0);
            done();
        });
    });

    it('should return expected product (getProduct)', (done) => {
        const product = mockProducts[0];
        httpClientSpy.get.and.returnValue(of(product));
        service.getProduct(product.id).subscribe(result => {
            expect(result).toEqual(product);
            done();
        });
    });

    it('should handle error on getProduct', (done) => {
        const errorResponse = { error: { message: 'fail' }, status: 404, body: { error: 'not found' } };
        httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
        service.getProduct(99).subscribe({
            next: () => fail('expected error'),
            error: err => {
                expect(err).toContain('Backend returned code 404');
                done();
            }
        });
    });

    it('should create a product (createProduct)', (done) => {
        const newProduct: Product = { ...mockProducts[0], id: undefined };
        const createdProduct: Product = { ...mockProducts[0], id: 3 };
        httpClientSpy.post.and.returnValue(of(createdProduct));
        service.createProduct(newProduct).subscribe(result => {
            expect(result).toEqual(createdProduct);
            done();
        });
    });

    it('should handle error on createProduct', (done) => {
        const errorResponse = { error: { message: 'fail' }, status: 400, body: { error: 'bad request' } };
        httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
        service.createProduct(mockProducts[0]).subscribe({
            next: () => fail('expected error'),
            error: err => {
                expect(err).toContain('Backend returned code 400');
                done();
            }
        });
    });

    it('should delete a product (deleteProduct)', (done) => {
        httpClientSpy.delete.and.returnValue(of({}));
        service.deleteProduct(1).subscribe(result => {
            expect(result).toEqual({});
            done();
        });
    });

    it('should handle error on deleteProduct', (done) => {
        const errorResponse = { error: { message: 'fail' }, status: 404, body: { error: 'not found' } };
        httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));
        service.deleteProduct(1).subscribe({
            next: () => fail('expected error'),
            error: err => {
                expect(err).toContain('Backend returned code 404');
                done();
            }
        });
    });

    it('should update a product (updateProduct)', (done) => {
        const updatedProduct = { ...mockProducts[0], productName: 'Updated' };
        httpClientSpy.put.and.returnValue(of(updatedProduct));
        service.updateProduct(updatedProduct).subscribe(result => {
            expect(result).toEqual(updatedProduct);
            done();
        });
    });

    it('should handle error on updateProduct', (done) => {
        const errorResponse = { error: { message: 'fail' }, status: 500, body: { error: 'server error' } };
        httpClientSpy.put.and.returnValue(throwError(() => errorResponse));
        service.updateProduct(mockProducts[0]).subscribe({
            next: () => fail('expected error'),
            error: err => {
                expect(err).toContain('Backend returned code 500');
                done();
            }
        });
    });
});