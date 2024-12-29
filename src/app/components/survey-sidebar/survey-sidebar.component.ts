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
  template: `
    <aside class="tree-sidebar">
      <div class="tree-header">
        <h1 class="tree-title">{{ surveyTitle }}</h1>
        <span class="tree-subtitle">{{ surveyYear }}</span>
      </div>

      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search branches..."
        >
      </div>

      <div class="tree-container">
        <ul class="tree-root">
          <li *ngFor="let subject of subjects" class="tree-branch">
            <!-- Main Branch -->
            <div class="branch-content"
                 [class.active]="subject === selectedSubject"
                 (click)="selectSubject(subject)">
              <div class="branch-connector">
                <div class="connector-line"></div>
                <div class="connector-dot"></div>
              </div>
              <div class="branch-label">
                <span class="branch-icon">🌳</span>
                {{ subject.title }}
              </div>
            </div>

            <!-- Sub Branches -->
            <ul *ngIf="subject === selectedSubject" 
                class="sub-branches"
                [@branchAnimation]>
              <li *ngFor="let subSubject of subject.subSubjects" 
                  class="sub-branch"
                  [class.active]="subSubject === selectedSubSubject">
                <div class="sub-branch-content" 
                     (click)="selectSubSubject(subSubject)">
                  <div class="branch-connector">
                    <div class="connector-line"></div>
                    <div class="connector-dot"></div>
                  </div>
                  <div class="branch-label">
                    <span class="branch-icon">🌿</span>
                    {{ subSubject.title }}
                  </div>
                </div>

                <!-- Leaves (Questions) -->
                <ul *ngIf="subSubject === selectedSubSubject" 
                    class="leaves"
                    [@branchAnimation]>
                  <li *ngFor="let question of subSubject.questions" 
                      class="leaf"
                      (click)="questionSelected.emit(question)">
                    <div class="leaf-content">
                      <span class="leaf-icon">🍃</span>
                      {{ question.text }}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  `,
  styles: [`
    .tree-sidebar {
      width: 500px;
      height: 100vh;
      background: linear-gradient(to bottom, #f8f9fa, #ffffff);
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    .tree-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, #2d3436 0%, #1a1c1d 100%);
      color: white;
    }

    .tree-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: #ffffff;
    }

    .tree-subtitle {
      font-size: 0.875rem;
      color: #a0aec0;
    }

    .search-container {
      padding: 1rem;
      background: rgba(255, 255, 255, 0.9);
      border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: white;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #68D391;
      box-shadow: 0 0 0 3px rgba(104, 211, 145, 0.1);
    }

    .tree-container {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem 1rem;
      background: linear-gradient(180deg, 
        rgba(255,255,255,0.9) 0%,
        rgba(249,250,251,0.9) 100%
      );
    }

    .tree-root {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tree-branch {
      margin-bottom: 1rem;
      position: relative;
    }

    .branch-content, .sub-branch-content {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
      border: 1px solid #e2e8f0;
      position: relative;
      z-index: 1;
    }

    .branch-content:hover, .sub-branch-content:hover {
      transform: translateX(4px);
      background: #f7fafc;
      border-color: #68D391;
    }

    .branch-content.active {
      background: #68D391;
      color: white;
      border-color: #68D391;
    }

    .branch-connector {
      position: relative;
      margin-right: 1rem;
    }

    .connector-line {
      position: absolute;
      left: -20px;
      top: 50%;
      width: 20px;
      height: 2px;
      background: #68D391;
      transform-origin: right;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .branch-content:hover .connector-line,
    .branch-content.active .connector-line {
      transform: scaleX(1);
    }

    .connector-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #68D391;
      transition: all 0.3s ease;
    }

    .branch-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }

    .branch-icon {
      font-size: 1.25rem;
    }

    .sub-branches {
      margin-left: 2rem;
      padding-left: 1rem;
      border-left: 2px dashed #68D391;
      margin-top: 0.5rem;
    }

    .sub-branch {
      margin-bottom: 0.5rem;
      position: relative;
    }

    .sub-branch-content {
      background: rgba(255, 255, 255, 0.8);
    }

    .sub-branch.active .sub-branch-content {
      background: #9AE6B4;
      color: #22543D;
      border-color: #68D391;
    }

    .leaves {
      margin-left: 3rem;
      padding-left: 1rem;
      border-left: 2px dotted #9AE6B4;
      margin-top: 0.5rem;
    }

    .leaf {
      margin-bottom: 0.25rem;
    }

    .leaf-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
      color: #4A5568;
    }

    .leaf-content:hover {
      background: rgba(104, 211, 145, 0.1);
      color: #22543D;
      transform: translateX(4px);
    }

    .leaf-icon {
      font-size: 1rem;
      opacity: 0.7;
    }

    /* Custom Scrollbar */
    .tree-container::-webkit-scrollbar {
      width: 6px;
    }

    .tree-container::-webkit-scrollbar-track {
      background: transparent;
    }

    .tree-container::-webkit-scrollbar-thumb {
      background: #CBD5E0;
      border-radius: 3px;
    }

    .tree-container::-webkit-scrollbar-thumb:hover {
      background: #A0AEC0;
    }

    /* Animations */
    @keyframes branchGrow {
      from {
        transform: scaleY(0);
        opacity: 0;
      }
      to {
        transform: scaleY(1);
        opacity: 1;
      }
    }

    .sub-branches, .leaves {
      animation: branchGrow 0.3s ease-out;
      transform-origin: top;
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
  @Output() questionSelected = new EventEmitter<Question>();

  selectSubject(subject: Subject) {
    this.subjectSelected.emit(subject);
  }

  selectSubSubject(subSubject: SubSubject) {
    this.subSubjectSelected.emit(subSubject);
  }
}