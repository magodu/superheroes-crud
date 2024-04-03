import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from 'src/app/material/material.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            MaterialModule
        ],
        declarations: [ HeaderComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the title in header', () => {
        const testTitle = 'Test Title';
        component.title = testTitle;
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('span').textContent).toContain(testTitle);
    });

});
