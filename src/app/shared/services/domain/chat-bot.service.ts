import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { from, Observable, switchMap } from 'rxjs';
import { EntrevistaUsuarioDto } from '../../model/entrevista-usuario-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  feedbackURL = environment.chatURL;

  public getQuestionChatBotInterview(
    currentQuestion: string,
    lastUserResponse: string,
    lastAssistantResponse: string,
    entrevistaUsuarioDto: EntrevistaUsuarioDto
  ): Observable<any> {
    const candidateName = this.authService.getUsername();
    const jobTitle =
      entrevistaUsuarioDto.seniorityEmpresa +
      ' ' +
      entrevistaUsuarioDto.perfilEmpresa;
    const companyName = entrevistaUsuarioDto.empresa;

    const request = {
      currentQuestion,
      lastUserResponse,
      lastAssistantResponse,
      candidateName,
      jobTitle,
      companyName,
    };

    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.httpClient.post(`${this.feedbackURL}/process-question`, request, {
          headers,
        })
      )
    );
  }

  public generarIntroduction( entrevistaUsuarioDto: EntrevistaUsuarioDto): Observable<any> {
    const candidateName = this.authService.getUsername();
    const jobTitle =
      entrevistaUsuarioDto.seniorityEmpresa +
      ' ' +
      entrevistaUsuarioDto.perfilEmpresa;
    const companyName = entrevistaUsuarioDto.empresa;
 
    const request = {
      candidateName,
      jobTitle,
      companyName,
    };
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.httpClient.post(`${this.feedbackURL}/generate-intro`, request, {
          headers,
        })
      )
    );
  }

  private async getHeaders(): Promise<HttpHeaders> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    try {
      const token = await this.authService.getToken();
      headers = headers.set('Authorization', `Bearer ${token}`);
    } catch (error) {
      console.error('Error obteniendo el token', error);
      throw error;
    }

    return headers;
  }
}
