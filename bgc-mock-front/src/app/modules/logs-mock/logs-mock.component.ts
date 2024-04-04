import { Component, OnInit } from '@angular/core';
import { MockService } from '../../shared/services/mock.service';
import { ActivatedRoute } from '@angular/router';
import { MockDTO } from '../../shared/interfaces/mock.interface';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-logs-mock',
  standalone: true,
  imports: [DatePipe, ButtonModule, ConfirmDialogModule, MessagesModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './logs-mock.component.html',
  styleUrl: './logs-mock.component.scss'
})
export class LogsMockComponent implements OnInit{
  mock: MockDTO | undefined;
  constructor(
    private mockService: MockService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.mockService.obterMockPorID(id).subscribe({
      next: (response) => {
        this.mock = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  limpar(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Você deseja realmente limpar as requisições dos mocks?',
        header: 'Limpar as requisicões',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
          this.mockService.limparRequisicoes(this.mock!.id).subscribe({
            next: () => {
              this.mock!.requisicoes = [];
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Requisições removidas com sucesso' });
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao removidas as requisições' });
            }
          });
        }
    });

  }
}
