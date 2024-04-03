import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
    let service: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [LocalStorageService],
        });
        service = TestBed.inject(LocalStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set and get an item in localStorage', () => {
        const key = 'testKey';
        const value = 'testValue';
        service.setItem(key, value);
        expect(service.getItem(key)).toEqual(value);
    });

    it('should remove item from localStorage', () => {
        const key = 'testKey';
        const value = 'testValue';
        service.setItem(key, value);
        service.removeItem(key);
        expect(service.getItem(key)).toBeNull();
    });

    it('should clear all items', () => {
        service.setItem('key1', 'value1');
        service.setItem('key2', 'value2');
        service.clear();
        expect(service.getItem('key1')).toBeNull();
        expect(service.getItem('key2')).toBeNull();
    });
});
