export type Alternative = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  order: number;
};

export type Question = {
  id: string;
  content: string;
  subject: string;
  statement: string;
  alternatives: Alternative[];
  createdAt: string;
};

export type Stage = 'setup' | 'studying' | 'quiz' | 'results';

export type StudyConfig = {
  subject: string;
  content: string;
  questionCount: number;
  studyTime: number;
};

export type QuizResults = {
  correct: number;
  incorrect: number;
};
