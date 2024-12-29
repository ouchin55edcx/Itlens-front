import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey, ApiResponse } from '../models/survey.interface';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<ApiResponse<Survey>> {
    return this.http.get<ApiResponse<Survey>>(this.apiUrl);
  }
}
