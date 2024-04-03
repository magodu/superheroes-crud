import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SuperheroCrudComponent } from './superhero-crud.component';
import { SuperheroesService } from '../../services/superheroes.service';

describe('SuperheroCrudComponent', () => {
    let component: SuperheroCrudComponent;
    let fixture: ComponentFixture<SuperheroCrudComponent>;
    let superheroesService: SuperheroesService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [SuperheroCrudComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                SuperheroesService
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroCrudComponent);
        component = fixture.componentInstance;
        superheroesService = TestBed.inject(SuperheroesService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with correct values and title for create mode', () => {
        component.data = { mode: 'create' };
        component.ngOnInit();
        expect(component.superheroForm.get('name')?.value).toBe('');
        expect(component.title).toBe('Create superhero');
    });

    it('should initialize form with correct values and title for edit mode', () => {
        component.data = {
            mode: 'edit',
            data: {
                nameLabel: 'Hulk'
            }
        };
        component.ngOnInit();
        expect(component.superheroForm.get('name')?.value).toBe('Hulk');
        expect(component.superheroForm.get('name')?.value).not.toBe('Thor');
        expect(component.title).toBe('Edit superhero');
    });

    it('should call refreshList with correct data on form submission', () => {
        const refreshListSpy = spyOn(superheroesService, 'refreshList');
        component.data = { mode: 'create' };
        component.ngOnInit();
        component.superheroForm.setValue( {
            name: 'Hulk',
            gender: 'male',
            citizenship: 'United States of America',
            skills: 'healing factor',
            occupation: 'scientist',
            memberOf: 'Avengers',
            creator: 'Stan Lee'
        });

        component.send();
        expect(refreshListSpy).toHaveBeenCalledWith({
            mode: 'create',
            data: {
                nameLabel: 'Hulk',
                genderLabel: 'male',
                citizenshipLabel: 'United States of America',
                skillsLabel: 'healing factor',
                occupationLabel: 'scientist',
                memberOfLabel: 'Avengers',
                creatorLabel: 'Stan Lee'
            }
        });
    });


});
