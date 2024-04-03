import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsNumberComponent } from './records-number.component';

describe('RecordsNumberComponent', () => {
    let component: RecordsNumberComponent;
    let fixture: ComponentFixture<RecordsNumberComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ RecordsNumberComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(RecordsNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the number of records', () => {
        const testRecords = '1 unique values';
        component.recordsNum = 1;
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain(testRecords);
    });

});
