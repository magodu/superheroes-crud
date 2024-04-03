import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync,} from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SuperheroDetailComponent } from './superhero-detail.component';

describe('SuperheroDetailComponent', () => {
    let component: SuperheroDetailComponent;
    let fixture: ComponentFixture<SuperheroDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SharedModule
            ],
            declarations: [ SuperheroDetailComponent ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {
                    nameLabel: 'Hulk',
                    genderLabel: 'male',
                    citizenshipLabel: 'United States of America',
                    skillsLabel: 'healing factor',
                    occupationLabel: 'scientist',
                    memberOfLabel: 'Avengers',
                    creatorLabel: 'Stan Lee'
                }}
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SuperheroDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
