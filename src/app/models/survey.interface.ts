export interface Survey {
    title: string;
    editions: Edition[];
  }
  
  export interface Edition {
    year: number;
    status: 'active' | 'draft' | 'archived';
    subjects: Subject[];
  }
  
  export interface Subject {
    id: string;
    name: string;
    subSubjects: SubSubject[];
  }
  
  export interface SubSubject {
    id: string;
    name: string;
    questions: Question[];
  }
  
  export interface Question {
    id: string;
    text: string;
    answerType: 'Multiple Choice' | 'Text Input' | 'Dropdown';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    answers: Answer[];
  }
  
  export interface Answer {
    text: string;
    isCorrect: boolean;
  }
  
  