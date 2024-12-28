import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, SubSubject, Question, Answer } from '../models/survey.interface';
import { SurveySidebarComponent } from '../components/survey-sidebar/survey-sidebar.component';

@Component({
  selector: 'app-survey-edition',
  standalone: true,
  imports: [CommonModule, RouterModule, SurveySidebarComponent],
  template: `
    <div class="survey-edition">
      <app-survey-sidebar
        [surveyTitle]="surveyTitle"
        [surveyYear]="surveyYear"
        [subjects]="subjects"
        [selectedSubject]="selectedSubject"
        [selectedSubSubject]="selectedSubSubject"
        (subjectSelected)="selectSubject($event)"
        (subSubjectSelected)="selectSubSubject($event)"
      ></app-survey-sidebar>

      <div class="main-content">
        <div class="content-header">
          <h2>{{ selectedSubSubject ? selectedSubSubject.name : (selectedSubject ? selectedSubject.name : 'Select a subject') }}</h2>
        </div>
        
        <div class="questions-table" *ngIf="selectedSubSubject">
          <h3>Questions</h3>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Question Text</th>
                <th>Type</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let question of selectedSubSubject.questions" 
                  (click)="selectQuestion(question)"
                  [class.selected]="selectedQuestion?.id === question.id">
                <td>{{ question.id }}</td>
                <td>{{ question.text }}</td>
                <td>{{ question.answerType }}</td>
                <td>{{ question.difficulty }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="answers-table" *ngIf="selectedQuestion">
          <h3>Answers for {{ selectedQuestion.id }}</h3>
          <table>
            <thead>
              <tr>
                <th>Answer Text</th>
                <th>Correct</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let answer of selectedQuestion.answers">
                <td>{{ answer.text }}</td>
                <td>{{ answer.isCorrect ? 'Yes' : 'No' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .survey-edition {
      display: flex;
      height: 100vh;
      background-color: #ffffff;
    }

    .main-content {
      flex: 1;
      overflow: auto;
      padding: 24px;
    }

    .content-header {
      margin-bottom: 24px;
    }

    .content-header h2 {
      font-size: 24px;
      font-weight: 600;
    }

    .questions-table, .answers-table {
      margin-bottom: 24px;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    th {
      background-color: #f9f9f9;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .questions-table tbody tr {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .questions-table tbody tr:hover {
      background-color: #f0f0f0;
    }

    .questions-table tbody tr.selected {
      background-color: #e6e6e6;
    }
  `]
})
export class SurveyEditionComponent implements OnInit {
  surveyTitle: string = '';
  surveyYear: string = '';
  selectedSubject: Subject | null = null;
  selectedSubSubject: SubSubject | null = null;
  selectedQuestion: Question | null = null;

  subjects: Subject[] = [
    {
      id: '1',
      name: 'Demographics',
      subSubjects: [
        {
          id: '1-1',
          name: 'Age Group',
          questions: [
            {
              id: 'Q1',
              text: 'What is your age group?',
              answerType: 'Multiple Choice',
              difficulty: 'Easy',
              answers: [
                { text: '18-24', isCorrect: false },
                { text: '25-34', isCorrect: false },
                { text: '35-44', isCorrect: false },
                { text: '45+', isCorrect: false }
              ]
            },
            {
              id: 'Q2',
              text: 'Please specify if other',
              answerType: 'Text Input',
              difficulty: 'Medium',
              answers: []
            }
          ]
        },
        {
          id: '1-2',
          name: 'Location',
          questions: [
            {
              id: 'Q3',
              text: 'Which country do you reside in?',
              answerType: 'Dropdown',
              difficulty: 'Easy',
              answers: [
                { text: 'United States', isCorrect: false },
                { text: 'Canada', isCorrect: false },
                { text: 'United Kingdom', isCorrect: false },
                { text: 'Other', isCorrect: false }
              ]
            },
            {
              id: 'Q4',
              text: 'What is your city of residence?',
              answerType: 'Text Input',
              difficulty: 'Medium',
              answers: []
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Product Satisfaction',
      subSubjects: [
        {
          id: '2-1',
          name: 'Overall Experience',
          questions: [
            {
              id: 'Q5',
              text: 'How satisfied are you with our product?',
              answerType: 'Multiple Choice',
              difficulty: 'Easy',
              answers: [
                { text: 'Very Satisfied', isCorrect: false },
                { text: 'Satisfied', isCorrect: false },
                { text: 'Neutral', isCorrect: false },
                { text: 'Dissatisfied', isCorrect: false },
                { text: 'Very Dissatisfied', isCorrect: false }
              ]
            }
          ]
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.surveyTitle = params['title'];
      this.surveyYear = params['year'];
    });
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
