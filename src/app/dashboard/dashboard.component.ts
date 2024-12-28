import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Survey, Edition } from '../models/survey.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardComponent {
  surveys: Survey[] = [
    {
      title: 'Employee Satisfaction Survey',
      editions: [
        { 
          year: 2023, 
          status: 'active',
          subjects: []
        },
        { 
          year: 2024, 
          status: 'draft',
          subjects: []
        },
      ],
    },
    {
      title: 'Customer Feedback Survey',
      editions: [
        { 
          year: 2023, 
          status: 'active',
          subjects: []
        },
      ],
    },
    {
      title: 'Product Development Survey',
      editions: [
        { 
          year: 2023, 
          status: 'active',
          subjects: []
        },
        { 
          year: 2024, 
          status: 'draft',
          subjects: []
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  onEditionClick(survey: Survey, edition: Edition): void {
    console.log(`Redirecting to Survey Edition Page for: ${survey.title}, Year: ${edition.year}`);
    this.router.navigate(['/survey-edition', survey.title, edition.year]);
  }
}

