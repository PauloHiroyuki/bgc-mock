import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MockDTO } from '../interfaces/mock.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(
    private http: HttpClient,
  ) { }

  obterMockPorID(id: string): Observable<MockDTO> {
    return this.http.get<MockDTO>(`${environment.API}/mocks/${id}`).pipe(take(1));
  }

  listarMocks(): Observable<MockDTO[]> {
    return this.http.get<MockDTO[]>(`${environment.API}/mocks`).pipe(take(1));
  }

  removerMock(id: string): Observable<any> {
    return this.http.delete(`${environment.API}/mocks/${id}`).pipe(take(1));
  }

  inserirMock(command: MockDTO): Observable<any> {
    return this.http.post(`${environment.API}/mocks`, command).pipe(take(1));
  }

  alterarMock(id: any, command: MockDTO): Observable<any> {
    return this.http.put(`${environment.API}/mocks/${id}`, command).pipe(take(1));
  }

  limparRequisicoes(id: any): Observable<any> {
    return this.http.delete(`${environment.API}/mocks/${id}/requisicoes`).pipe(take(1));
  }
}
