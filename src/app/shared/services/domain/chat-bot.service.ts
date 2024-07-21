import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  feedbackURL = "http://localhost:3000/chat";

  public getQuestionChatBotInterview(
    currentQuestion: string, 
    lastUserResponse: string, 
    lastAssistantResponse:string): Observable<any> {
      const candidateName="Jamilton Quintero" 
      const jobTitle="Senior Java Full Stack Developer"
      const companyName="EPAM Systems"
      const request = {
        currentQuestion,
        lastUserResponse,
        lastAssistantResponse,
        candidateName, 
        jobTitle, 
        companyName
      };
      

    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.post(
          `${this.feedbackURL}/process-question`,
          request,
          { headers }
        )
      )
    );
  }

  public generarIntroduction(): Observable<any> {
    const candidateName="Jamilton Quintero" 
    const jobTitle="Senior Java Full Stack Developer"
    const companyName="EPAM Systems"
    const request = {
      candidateName, 
      jobTitle, 
      companyName
    };
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.post(
          `${this.feedbackURL}/generate-intro`,request,
          { headers }
        )
      )
    );
  }
  
  private async getHeaders(): Promise<HttpHeaders> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");

    try {
      const token = await this.authService.getToken();
      headers = headers.set("Authorization", `Bearer ${token}`);
    } catch (error) {
      console.error("Error obteniendo el token", error);
      throw error;
    }

    return headers;
  }

}
