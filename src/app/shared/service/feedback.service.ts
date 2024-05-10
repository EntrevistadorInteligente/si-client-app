import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeedbackService {

  feedbackURL = environment.feedbackURL;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private httpClient: HttpClient,
    private oauthService: OAuthService
  ) { }


  public crearSolicitudFeedback(feedbackDto: FeedbackDto): Observable<any> {
    return this.httpClient.post(`${this.feedbackURL}/feedback/solicitudes/entrevistas/${feedbackDto.idEntrevista}`, feedbackDto.procesoEntrevista, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const token = this.oauthService.getAccessToken();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
