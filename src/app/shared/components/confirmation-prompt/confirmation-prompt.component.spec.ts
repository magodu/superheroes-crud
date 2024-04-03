import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from 'src/app/material/material.module';

import { ConfirmationPromptComponent } from './confirmation-prompt.component';

describe('ConfirmationPromptComponent', () => {
    let component: ConfirmationPromptComponent;
    let fixture: ComponentFixture<ConfirmationPromptComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            MaterialModule
        ],
        declarations: [ ConfirmationPromptComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ConfirmationPromptComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the dialog title and content', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.header').textContent).toContain('Confirm');
        expect(compiled.querySelector('mat-dialog-content p').textContent).toContain('Are you sure you want to delete this record?');
    });
});
