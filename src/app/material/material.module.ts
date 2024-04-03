import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,
        MatTooltipModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,
        MatTooltipModule
    ],
})
export class MaterialModule {}
