import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-caso-especial',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule, MonacoEditorModule, InputNumberModule],
  templateUrl: './form-caso-especial.component.html',
  styleUrl: './form-caso-especial.component.scss'
})
export class FormCasoEspecialComponent {
  form: FormGroup;
  instance: DynamicDialogComponent | undefined;
  editorOptions = {theme: 'vs-dark', language: 'json'};
  editorJavascriptOptions = {theme: 'vs-dark', language: 'javascript'};
  
  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef, 
    private dialogService: DialogService
  ) { 
    this.form = this.fb.group({
      descricao: [null, Validators.required],
      validador: ["(body, queryParams, pathParams) => {\n  return false;\n}", Validators.required],
      httpStatus: [200, Validators.required],
      contentType: ['application/json', Validators.required],
      charset: ['UTF-8', Validators.required],
      headers: [null],
      body: [null, Validators.required]
    });

    this.instance = this.dialogService.getInstance(this.ref);
    if (this.instance.data.casoEspecial) {
      this.form.patchValue(this.instance.data.casoEspecial);
    }
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }
    this.ref.close(this.form.value);
  }

  fechar() {
    this.ref.close();
  }
}
