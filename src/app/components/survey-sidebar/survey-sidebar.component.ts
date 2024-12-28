import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, SubSubject } from '../../models/survey.interface';

@Component({
  selector: 'app-survey-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        Survey Structure - {{ surveyTitle }} ({{ surveyYear }})
      </div>
      <div class="sidebar-content">
        <ul class="tree">
          <li *ngFor="let subject of subjects" class="tree-item">
            <div 
              (click)="selectSubject(subject)"
              class="tree-item-header"
              [class.expanded]="subject.id === selectedSubject?.id"
              [class.selected]="subject.id === selectedSubject?.id && !selectedSubSubject"
            >
              <span class="tree-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 18l6-6-6-6"
                  />
                </svg>
              </span>
              {{ subject.name }}
            </div>
            
            <ul *ngIf="subject.id === selectedSubject?.id" class="tree-sublist">
              <li 
                *ngFor="let subSubject of subject.subSubjects"
                (click)="selectSubSubject(subSubject)"
                class="tree-subitem"
                [class.selected]="selectedSubSubject?.id === subSubject.id"
              >
                <span class="tree-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 6L9 17l-5-5"
                    />
                  </svg>
                </span>
                {{ subSubject.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100%;
      border-right: 1px solid #e0e0e0;
      background-color: #f9f9f9;
      overflow-y: auto;
    }

    .sidebar-header {
      padding: 16px;
      font-weight: 600;
      font-size: 18px;
      border-bottom: 1px solid #e0e0e0;
    }

    .sidebar-content {
      padding: 8px;
    }

    .tree {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .tree-item {
      margin-bottom: 8px;
    }

    .tree-item-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .tree-item-header:hover {
      background-color: #f0f0f0;
    }

    .tree-icon {
      display: inline-flex;
      transition: transform 0.2s;
    }

    .tree-item-header.expanded .tree-icon {
      transform: rotate(90deg);
    }

    .tree-item-header.selected {
      background-color: #e6e6e6;
    }

    .tree-sublist {
      list-style-type: none;
      padding-left: 24px;
      margin-top: 4px;
    }

    .tree-subitem {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .tree-subitem:hover {
      background-color: #f0f0f0;
    }

    .tree-subitem.selected {
      background-color: #e6e6e6;
    }

    .tree-subitem::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 16px;
      height: 1px;
      background-color: #ccc;
    }

    .tree-subitem:last-child::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      bottom: 0;
      width: 1px;
      background-color: #f9f9f9;
    }
  `]
})
export class SurveySidebarComponent {
  @Input() surveyTitle: string = '';
  @Input() surveyYear: string = '';
  @Input() subjects: Subject[] = [];
  @Input() selectedSubject: Subject | null = null;
  @Input() selectedSubSubject: SubSubject | null = null;

  @Output() subjectSelected = new EventEmitter<Subject>();
  @Output() subSubjectSelected = new EventEmitter<SubSubject>();

  selectSubject(subject: Subject) {
    this.subjectSelected.emit(subject);
  }

  selectSubSubject(subSubject: SubSubject) {
    this.subSubjectSelected.emit(subSubject);
  }
}

