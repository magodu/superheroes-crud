import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { SuperheroesTableComponent } from './superheroes-table.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


describe('SuperheroesTableComponent', () => {
    let component: SuperheroesTableComponent;
    let fixture: ComponentFixture<SuperheroesTableComponent>;
    let superheroesService: SuperheroesService;
    let localStorageService: LocalStorageService;
    let dialog: MatDialog;

    beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                declarations: [SuperheroesTableComponent],
                providers: [
                    { provide: MatDialog, useValue: {} },
                    LocalStorageService,
                    SuperheroesService
                ],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: true }

            }).compileComponents();

            fixture = TestBed.createComponent(SuperheroesTableComponent);
            component = fixture.componentInstance;
            superheroesService = TestBed.inject(SuperheroesService);
            localStorageService = TestBed.inject(LocalStorageService);
            dialog = TestBed.inject(MatDialog);
            fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch superheroes data on init', () => {
        const mockSuperheroes = [{ nameLabel: 'Hulk' }, { nameLabel: 'Thor' }];
        spyOn(superheroesService, 'getSuperheroesData').and.returnValue(of(mockSuperheroes as any));

        component.ngOnInit();

        expect(component.superheroesList.length).toBe(2);
        expect(component.superheroesList[0].nameLabel).toBe('Hulk');
        expect(component.superheroesList[1].nameLabel).toBe('Thor');
    });

    it('should filter superheroes correctly', () => {
        component.superheroesList = [
            {
                nameLabel: 'Hulk',
                genderLabel: 'male',
                citizenshipLabel: 'United States of America',
                skillsLabel: 'healing factor',
                occupationLabel: 'scientist',
                memberOfLabel: 'Avengers',
                creatorLabel: 'Stan Lee'
            },
            {
                "nameLabel": "Black Panther",
                "genderLabel": "male",
                "citizenshipLabel": "Wakanda",
                "skillsLabel": "superhuman agility / reflexes",
                "occupationLabel": "superhero",
                "memberOfLabel": "The Avengers",
                "creatorLabel": "Stan Lee"
            }];
        component.filterItems(['Hulk']);

        expect(component.superheroesFilteredList.length).toBe(1);
        expect(component.superheroesFilteredList[0].nameLabel).toBe('Hulk');
    });

});
