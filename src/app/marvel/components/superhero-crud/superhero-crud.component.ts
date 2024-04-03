import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SuperheroesService } from '../../services/superheroes.service';

import { CrudData } from 'src/app/marvel/models/crudData.model';
import { CrudModes } from 'src/app/marvel/enums/crudMode.enum';

@Component({
    selector: 'app-superhero-crud',
    templateUrl: './superhero-crud.component.html',
    styleUrls: ['./superhero-crud.component.scss'],
})

export class SuperheroCrudComponent implements OnInit {

    superheroForm!: FormGroup;
    title = '';

    constructor(private formBuilder: FormBuilder, private superheroesService: SuperheroesService, @Inject(MAT_DIALOG_DATA) public data: any) { }

    send() {
        const formValue = this.superheroForm.value;
        const data: CrudData = {
            mode: this.data.mode,
            data: {
                nameLabel: formValue.name,
                genderLabel: formValue.gender,
                citizenshipLabel: formValue.citizenship,
                skillsLabel: formValue.skills,
                occupationLabel: formValue.occupation,
                memberOfLabel: formValue.memberOf,
                creatorLabel: formValue.creator
            }
        };

        this.superheroesService.refreshList(data);
    }

    private initForm() {
        let name: string = '';
        let skills: string = '';
        let occupation: string = '';
        let memberOf: string = '';
        let gender: string = '';
        let citizenship: string = '';
        let creator: string = '';

        if (this.data.mode === CrudModes.Edit) {
            name = this.data.data.nameLabel;
            skills = this.data.data.skillsLabel;
            occupation = this.data.data.occupationLabel;
            memberOf = this.data.data.memberOfLabel;
            gender = this.data.data.genderLabel;
            citizenship = this.data.data.citizenshipLabel;
            creator = this.data.data.creatorLabel;
        }

        this.superheroForm = this.formBuilder.group({
            'name': [name, Validators.required],
            'skills': [skills, Validators.required],
            'occupation': [occupation, Validators.required],
            'memberOf': [memberOf, Validators.required],
            'gender': [gender, Validators.required],
            'citizenship': [citizenship, Validators.required],
            'creator': [creator, Validators.required]
        });
    }

    ngOnInit() {
        this.initForm();
        this.title = this.data.mode === 'create' ? 'Create superhero' : 'Edit superhero';
    }
}
