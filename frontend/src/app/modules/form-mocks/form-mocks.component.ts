import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MockService } from '../../shared/services/mock.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG,  } from 'ngx-monaco-editor-v2';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormCasoEspecialComponent } from '../form-caso-especial/form-caso-especial.component';

@Component({
  selector: 'app-form-mocks',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule, InputTextareaModule, InputNumberModule, 
    InputSwitchModule, MessagesModule, MonacoEditorModule, MultiSelectModule, DynamicDialogModule ],
  providers: [MessageService, DialogService, {
    provide: NGX_MONACO_EDITOR_CONFIG,
    useValue: MonacoEditorModule.forRoot()  
  }],
  templateUrl: './form-mocks.component.html',
  styleUrl: './form-mocks.component.scss'
})
export class FormMocksComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  id: string | undefined;
  ref: DynamicDialogRef | undefined;
  
  editorOptions = {theme: 'vs-dark', language: 'json'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  metodos: any[] = [{label: 'GET', value: 'GET'}, {label: 'POST', value: 'POST'}, {label: 'PUT', value: 'PUT'}, {label: 'DELETE', value: 'DELETE'}, {label: 'PATCH', value: 'PATCH'}, {label: 'OPTIONS', value: 'OPTIONS'}, {label: 'HEAD', value: 'HEAD'}]
  
  constructor(
    private fb: FormBuilder,
    private mockService: MockService, 
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { 
    this.form = this.fb.group({
      endereco: [null, Validators.required],
      httpStatus: [200, Validators.required],
      contentType: ['application/json', Validators.required],
      charset: ['UTF-8', Validators.required],
      headers: [null],
      body: [null, Validators.required],
      ativo: [true, Validators.required],
      gravarRequisicao: [true, Validators.required],
      metodos: [null, Validators.required],
      casosEspeciais: [new Array()]
    });
  }
  
  ngAfterViewInit(): void {
    const msgSucesso = this.route.snapshot.queryParams['msg-sucesso']!;
    if (msgSucesso) {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mock criado com sucesso' });
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.mockService.obterMockPorID(this.id).subscribe({
        next: (response) => {
          this.form.patchValue(response);
          this.form.get('metodos')?.setValue(response.metodos.map((item: any) => this.metodos.find((metodo: any) => metodo.value === item)));
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao consultar o mock' });
        }
      });
    }
  }

  salvar() {
    if (this.form.valid) {
      var command = this.form.value;
      command.metodos = command.metodos.map((item: any) => item.value);
      if (this.id) {
        this.alterarMock(this.id, this.form.value);
      } else {
        this.criarMock(this.form.value);
      }
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  removerCasoEspecial(casoEspecial: any) {
    this.form.get('casosEspeciais')?.setValue(this.form.get('casosEspeciais')?.value.filter((x: any) => x !== casoEspecial));
  }

  adicionarCasoEspecial() {
    this.ref = this.dialogService.open(FormCasoEspecialComponent, {
      header: 'Cadastro de caso especial',
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data: {
        form: this.form
      }
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        const casosEspeciais = this.form.get('casosEspeciais')?.value ?? [];
        casosEspeciais.push(data);
        this.form.get('casosEspeciais')?.setValue(casosEspeciais);
      }
    });
  }

  editarCasoEspecial(casoEspecial: any) {
    this.ref = this.dialogService.open(FormCasoEspecialComponent, {
      header: 'Cadastro de caso especial',
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data: {
        casoEspecial: casoEspecial
      }
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.removerCasoEspecial(casoEspecial);
        const casosEspeciais = this.form.get('casosEspeciais')?.value ?? [];
        casosEspeciais.push(data);
        this.form.get('casosEspeciais')?.setValue(casosEspeciais);
      }
    });
  }

  private criarMock(command: any) {
    this.mockService.inserirMock(command).subscribe({
      next: result => {
        this.router.navigate([`/mock/${result.id}`], { queryParams: { "msg-sucesso" : true }});
      },
      error: (erro) => {
        console.error(erro);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o mock' });
      }
    });
  }

  private alterarMock(id: any, command: any) {
    this.mockService.alterarMock(id, command).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mock alterado com sucesso' });
      },
      error: (erro) => {
        console.error(erro);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar o mock' });
      }
    });
  }
}
