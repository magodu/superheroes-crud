import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
    let service: HttpService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [HttpService]
        });
        service = TestBed.inject(HttpService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a GET request', () => {
        const testData = { id: 1, name: 'Test' };
        service.getVerb<any>('test-endpoint').subscribe(data => {
            expect(data).toEqual(testData);
        });

        const req = httpMock.expectOne('test-endpoint');
        expect(req.request.method).toBe('GET');
        req.flush(testData);
    });

    it('should make a POST request', () => {
        const testData = { id: 1, name: 'Test' };
        const endpoint = 'test-endpoint';
        const postData = { name: 'Test' };

        service.postVerb<any>(endpoint, postData).subscribe(data => {
          expect(data).toEqual(testData);
        });

        const req = httpMock.expectOne(endpoint);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(postData);
        req.flush(testData);
    });

    it('should make a PUT request', () => {
        const testData = { id: 1, name: 'Test' };
        const endpoint = 'test-endpoint';
        const postData = { name: 'Test' };

        service.putVerb<any>(endpoint, postData).subscribe(data => {
          expect(data).toEqual(testData);
        });

        const req = httpMock.expectOne(endpoint);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(postData);
        req.flush(testData);
    });

    it('should make a DELETE request', () => {
        const endpoint = 'test-endpoint/1';

        service.deleteVerb<any>(endpoint).subscribe(data => {
          expect(data).toBeNull();
        });

        const req = httpMock.expectOne(endpoint);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
