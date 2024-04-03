import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MarvelContainerComponent } from './marvel-container.component';

import { SuperheroesService } from '../../services/superheroes.service';

describe('MarvelContainerComponent', () => {
    let component: MarvelContainerComponent;
    let fixture: ComponentFixture<MarvelContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                SharedModule
            ],
            declarations: [
                MarvelContainerComponent
            ],
            providers: [SuperheroesService],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        fixture = TestBed.createComponent(MarvelContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
