import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsContainerComponent } from './graphics-container.component';

describe('GraphicsContainerComponent', () => {
    let component: GraphicsContainerComponent;
    let fixture: ComponentFixture<GraphicsContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ GraphicsContainerComponent ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        fixture = TestBed.createComponent(GraphicsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
