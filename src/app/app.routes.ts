import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyEditionComponent } from './survey-edition/survey-edition.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'survey-edition/:title/:year', component: SurveyEditionComponent },
  { path: '**', redirectTo: '' }
];

