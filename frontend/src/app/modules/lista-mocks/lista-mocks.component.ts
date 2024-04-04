import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MockService } from '../../shared/services/mock.service';
import { MockDTO } from '../../shared/interfaces/mock.interface';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-lista-mocks',
  standalone: true,
  imports: [FormsModule, InputSwitchModule, ButtonModule, RouterModule, ConfirmDialogModule, MessagesModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './lista-mocks.component.html',
  styleUrl: './lista-mocks.component.scss'
})
export class ListaMocksComponent implements OnInit {

  mocks: MockDTO[] = [];

  constructor(
    private mockService: MockService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.mockService.listarMocks().subscribe({
      next: (response) => {
        this.mocks = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  remover(event: Event, mock: MockDTO) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Você deseja realmente excluir esse registro?',
        header: 'Confirmar exclusão',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
            this.mockService.removerMock(mock.id).subscribe({
                next: (response) => {
                  this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mock foi excluído com sucesso!' });
                  this.mocks = this.mocks.filter((mockItem) => mockItem.id !== mock.id);
                },
                error: (error) => {
                  this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o mock' });
                }
            });
        }
    });
  }
}
