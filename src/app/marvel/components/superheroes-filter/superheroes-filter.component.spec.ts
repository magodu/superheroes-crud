import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MarvelModule } from 'src/app/marvel/marvel.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SuperheroesFilterComponent } from './superheroes-filter.component';

describe('SuperheroesFilterComponent', () => {
    let component: SuperheroesFilterComponent;
    let fixture: ComponentFixture<SuperheroesFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            NoopAnimationsModule,
            MarvelModule,
            MaterialModule,
            SharedModule
        ],
        declarations: [ SuperheroesFilterComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SuperheroesFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
