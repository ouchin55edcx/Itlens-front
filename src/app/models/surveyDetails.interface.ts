export interface Subject {
    id: number;
    title: string;
    surveyEditionId: number;
    parentSubjectId: number | null;
    subSubjects: SubSubject[];
  }
  
  export interface SubSubject {
    id: number;
    title: string;
    surveyEditionId: number;
    parentSubjectId: number;
    subSubjects: SubSubject[];
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    text: string;
    type: string;
    subjectId: number | null;
    answers: Answer[];
  }
  
  export interface Answer {
    id: number;
    text: string;
    selectionCount: number;
  }