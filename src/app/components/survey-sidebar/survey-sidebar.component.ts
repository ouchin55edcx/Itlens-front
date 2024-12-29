import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, SubSubject,Question } from '../../models/surveyDetails.interface';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-survey-sidebar',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('branchAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ],
  templateUrl: './survey-sidebar.component.html',
  styleUrls: ['./survey-sidebar.component.css'],
})
export class SurveySidebarComponent {
  @Input() surveyTitle: string = '';
  @Input() surveyYear: string = '';
  @Input() subjects: Subject[] = [];
  @Input() selectedSubject: Subject | null = null;
  @Input() selectedSubSubject: SubSubject | null = null;

  @Output() subjectSelected = new EventEmitter<Subject>();
  @Output() subSubjectSelected = new EventEmitter<SubSubject>();
  @Output() questionSelected = new EventEmitter<Question>();

  selectSubject(subject: Subject) {
    this.subjectSelected.emit(subject);
  }

  selectSubSubject(subSubject: SubSubject) {
    this.subSubjectSelected.emit(subSubject);
  }
}