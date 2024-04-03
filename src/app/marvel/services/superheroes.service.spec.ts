import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { SuperheroesService } from './superheroes.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { CrudData } from 'src/app/marvel/models/crudData.model';
import { Superhero } from 'src/app/marvel/models/superhero.model';

describe('SuperheroesService', () => {
 let service: SuperheroesService;
 let httpService: HttpService;
 let localStorageService: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SuperheroesService,
                { provide: HttpService, useValue: { getVerb: () => of([]) } },
                { provide: LocalStorageService, useValue: { getItem: () => null } }
            ]
        });

        service = TestBed.inject(SuperheroesService);
        httpService = TestBed.inject(HttpService);
        localStorageService = TestBed.inject(LocalStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should refresh list data', fakeAsync(() => {
        const testData: CrudData = {
            mode: 'create',
            data: {
                citizenshipLabel: 'test',
                creatorLabel: 'test',
                genderLabel: 'test',
                memberOfLabel: 'test',
                nameLabel: 'test',
                occupationLabel: 'test',
                skillsLabel: 'test'
            }
        };
        let result!: CrudData;

        service.refreshListData.subscribe(data => {
            result = data;
        });

        service.refreshList(testData);
        tick();

        expect(result).toEqual(testData);
    }));

    it('should get superheroes data from local storage', (done) => {
        const testData: Superhero[] = [{
            citizenshipLabel: 'test',
            creatorLabel: 'test',
            genderLabel: 'test',
            memberOfLabel: 'test',
            nameLabel: 'test',
            occupationLabel: 'test',
            skillsLabel: 'test'
        }];

        spyOn(localStorageService, 'getItem').and.returnValue(testData);

        service.getSuperheroesData('test-url').subscribe(data => {
           expect(data).toEqual(testData);
           done();
        });
    });

    it('should get superheroes data from URL when not in local storage', (done) => {
        const testData: Superhero[] = [{
            citizenshipLabel: 'test',
            creatorLabel: 'test',
            genderLabel: 'test',
            memberOfLabel: 'test',
            nameLabel: 'test',
            occupationLabel: 'test',
            skillsLabel: 'test'
        }];

        spyOn(localStorageService, 'getItem').and.returnValue(null);
        spyOn(httpService, 'getVerb').and.returnValue(of(testData));

        service.getSuperheroesData('test-url').subscribe(data => {
           expect(data).toEqual(testData);
           done();
        });
    });

});

