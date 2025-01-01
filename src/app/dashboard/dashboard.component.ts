import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Survey, SurveyEdition } from '../models/survey.interface';
import { SurveyService } from '../services/survey.service';
import { AddSurveyPopupComponent } from '../components/add-survey-popup/add-survey-popup.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AddSurveyPopupComponent,
    SidebarComponent
  ],
})
export class DashboardComponent implements OnInit {
  surveys: Survey[] = [];
  loading = false;
  error: string | null = null;
  showAddSurveyPopup = false;

  constructor(
    private router: Router,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.loading = true;
    this.error = null;

    this.surveyService.getSurveys().subscribe({
      next: (response) => {
        this.surveys = response.content;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load surveys. Please try again later.';
        this.loading = false;
        console.error('Error loading surveys:', err);
      }
    });
  }


  openAddSurveyPopup(): void {
    this.showAddSurveyPopup = true;
  }

  closeAddSurveyPopup(): void {
    this.showAddSurveyPopup = false;
  }


  onEditionClick(survey: Survey, edition: SurveyEdition): void {
    this.router.navigate(['/survey-edition', survey.title, edition.year]);
  }

  getEditionStatus(edition: SurveyEdition): string {
    const currentYear = new Date().getFullYear();
    if (edition.year < currentYear) {
      return 'archived';
    } else if (edition.year === currentYear) {
      return 'active';
    }
    return 'draft';
  }

  onUpdateSurvey(survey: Survey): void {
    this.router.navigate(['/edit-survey', survey.id]);
  }

}
