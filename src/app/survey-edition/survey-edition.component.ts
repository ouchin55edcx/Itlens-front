import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, SubSubject, Question, Answer } from '../models/surveyDetails.interface';
import { SurveySidebarComponent } from '../components/survey-sidebar/survey-sidebar.component';
import { SurveyService } from '../services/surveyDetails.service';

@Component({
  selector: 'app-survey-edition',
  standalone: true,
  imports: [CommonModule, RouterModule, SurveySidebarComponent],
  template: `
    <div class="survey-container">
      <app-survey-sidebar
        [surveyTitle]="surveyTitle"
        [surveyYear]="surveyYear"
        [subjects]="subjects"
        [selectedSubject]="selectedSubject"
        [selectedSubSubject]="selectedSubSubject"
        (subjectSelected)="selectSubject($event)"
        (subSubjectSelected)="selectSubSubject($event)"
      ></app-survey-sidebar>

      <main class="main-content">
        <!-- Loading State -->
        <div *ngIf="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading subjects...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="error-state">
          <div class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
            <p>{{ error }}</p>
          </div>
          <button class="retry-button" (click)="loadSubjects()">
            Retry
          </button>
        </div>

        <!-- Content -->
        <div *ngIf="!loading && !error" class="content-wrapper">
          <header class="content-header">
            <h1 class="content-title">
              {{ selectedSubSubject ? selectedSubSubject.title : (selectedSubject ? selectedSubject.title : 'Select a subject') }}
            </h1>
          </header>
          
          <div class="content-body">
            <!-- Questions Table -->
            <section *ngIf="selectedSubSubject" class="questions-section">
              <h2 class="section-title">Questions</h2>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Question</th>
                      <th>Type</th>
                      <th>Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let question of selectedSubSubject.questions" 
                        (click)="selectQuestion(question)"
                        [class.selected]="selectedQuestion?.id === question.id"
                        class="table-row">
                      <td>{{ question.id }}</td>
                      <td>{{ question.text }}</td>
                      <td>
                        <span class="badge" [class]="question.type.toLowerCase()">
                          {{ question.type }}
                        </span>
                      </td>
                      <td>
                        <span class="difficulty-badge" [class]="getDifficultyClass(question)">
                          {{ getDifficulty(question) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Answers Table -->
            <section *ngIf="selectedQuestion" class="answers-section">
              <h2 class="section-title">
                Answers for Question {{ selectedQuestion.id }}
              </h2>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Answer</th>
                      <th>Selection Count</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let answer of selectedQuestion.answers" class="table-row">
                      <td>{{ answer.text }}</td>
                      <td>{{ answer.selectionCount }}</td>
                      <td>
                        <div class="progress-wrapper">
                          <div class="progress-bar" 
                               [style.width]="getPercentage(answer) + '%'">
                          </div>
                          <span class="progress-text">
                            {{ getPercentage(answer) }}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .survey-container {
      display: flex;
      min-height: 100vh;
      background-color: var(--gray-50);
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      color: var(--gray-600);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--gray-200);
      border-top-color: var(--primary-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      gap: 1rem;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ef4444;
    }

    .error-icon {
      width: 24px;
      height: 24px;
    }

    .retry-button {
      padding: 0.5rem 1rem;
      background-color: var(--primary-500);
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .retry-button:hover {
      background-color: var(--primary-600);
    }

    .content-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gray-200);
    }

    .content-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
      margin: 0;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-700);
      margin: 0 0 1rem 0;
    }

    .table-container {
      background: white;
      border-radius: 0.5rem;
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background-color: var(--gray-50);
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 500;
      color: var(--gray-600);
      border-bottom: 1px solid var(--gray-200);
    }

    .data-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--gray-100);
    }

    .table-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .table-row:hover {
      background-color: var(--gray-50);
    }

    .table-row.selected {
      background-color: var(--primary-50);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .badge.multiple-choice {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .badge.open-ended {
      background-color: #dcfce7;
      color: #166534;
    }

    .difficulty-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .difficulty-badge.easy {
      background-color: #dcfce7;
      color: #166534;
    }

    .difficulty-badge.medium {
      background-color: #fef9c3;
      color: #854d0e;
    }

    .difficulty-badge.hard {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .progress-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .progress-bar {
      height: 0.5rem;
      background-color: var(--primary-100);
      border-radius: 9999px;
      overflow: hidden;
      position: relative;
    }

    .progress-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: var(--primary-500);
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.875rem;
      color: var(--gray-600);
      min-width: 3rem;
    }

    .answers-section {
      margin-top: 2rem;
    }
  `]
})
export class SurveyEditionComponent implements OnInit {
  surveyTitle: string = '';
  surveyYear: string = '';
  subjects: Subject[] = [];
  selectedSubject: Subject | null = null;
  selectedSubSubject: SubSubject | null = null;
  selectedQuestion: Question | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.surveyTitle = params['title'];
      this.surveyYear = params['year'];
      this.loadSubjects();
    });
  }

  loadSubjects() {
    this.loading = true;
    this.error = null;
    
    this.surveyService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load subjects. Please try again.';
        this.loading = false;
        console.error('Error loading subjects:', err);
      }
    });
  }

  getDifficultyClass(question: Question): string {
    // You can customize this logic based on your question properties
    const difficulty = this.getDifficulty(question);
    return difficulty.toLowerCase();
  }
  
  getDifficulty(question: Question): string {
    // You can customize this logic based on your question properties
    // For example, based on question.type or other metrics
    if (question.type === 'EASY') return 'Easy';
    if (question.type === 'HARD') return 'Hard';
    return 'Medium';
  }
  
  getPercentage(answer: Answer): number {
    if (!this.selectedQuestion) return 0;
    
    const total = this.selectedQuestion.answers.reduce(
      (sum, a) => sum + a.selectionCount, 
      0
    );
    
    if (total === 0) return 0;
    return Math.round((answer.selectionCount / total) * 100);
  }

  selectSubject(subject: Subject) {
    this.selectedSubject = subject;
    this.selectedSubSubject = null;
    this.selectedQuestion = null;
  }

  selectSubSubject(subSubject: SubSubject) {
    this.selectedSubSubject = subSubject;
    this.selectedQuestion = null;
  }

  selectQuestion(question: Question) {
    this.selectedQuestion = question;
  }
}