export interface Owner {
  id: number;
  name: string;
}

export interface SurveyEdition {
  id: number;
  year: number;
  status?: 'active' | 'draft' | 'archived';
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  owner: Owner;
  surveyEditions: SurveyEdition[];
}

export interface ApiResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
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
  
  