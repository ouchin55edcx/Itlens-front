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
  templateUrl:'./survey-edition.component.html',
  styleUrls: ['./survey-edition.component.css']
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