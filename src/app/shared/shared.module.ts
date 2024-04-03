import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { HttpService } from './services/http.service';
import { LocalStorageService } from './services/local-storage.service';
import { ConfirmationPromptComponent } from './components/confirmation-prompt/confirmation-prompt.component';

@NgModule({
    declarations: [HeaderComponent, ConfirmationPromptComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [HeaderComponent],
    providers: [
        HttpService,
        LocalStorageService
    ],
})
export class SharedModule {}
