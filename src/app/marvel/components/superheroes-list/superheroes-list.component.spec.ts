import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SuperheroesListComponent } from './superheroes-list.component';

import { Superhero } from 'src/app/marvel/models/superhero.model';


describe('SuperheroesListComponent', () => {
    let component: SuperheroesListComponent;
    let fixture: ComponentFixture<SuperheroesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SharedModule
            ],
            declarations: [ SuperheroesListComponent ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SuperheroesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update the list when data changes', () => {
        const mockSuperheroes: Superhero[] = [{
                nameLabel: 'Hulk',
                genderLabel: 'male',
                citizenshipLabel: 'United States of America',
                skillsLabel: 'healing factor',
                occupationLabel: 'scientist',
                memberOfLabel: 'Avengers',
                creatorLabel: 'Stan Lee'
            },
            {
                nameLabel: "Black Panther",
                genderLabel: "male",
                citizenshipLabel: "Wakanda",
                skillsLabel: "superhuman agility / reflexes",
                occupationLabel: "superhero",
                memberOfLabel: "The Avengers",
                creatorLabel: "Stan Lee"
            }
        ];

        component.data = mockSuperheroes;
        expect(component.data.length).toBe(2);
        expect(component.data[0].nameLabel).toBe('Hulk');
    });

    it('should emit detail event when showDetail is called', () => {
        const mockSuperhero = {
            nameLabel: 'Hulk',
            genderLabel: 'male',
            citizenshipLabel: 'United States of America',
            skillsLabel: 'healing factor',
            occupationLabel: 'scientist',
            memberOfLabel: 'Avengers',
            creatorLabel: 'Stan Lee'
        };
        spyOn(component.detail, 'emit');

        component.showDetail(mockSuperhero);
        expect(component.detail.emit).toHaveBeenCalledWith(mockSuperhero);
    });

});
