export interface Question {
  id: number;
  text: string;
  category: 'emotional' | 'lifestyle' | 'vision';
}

export interface UserResponse {
  questionId: number;
  answer: string;
  category: string;
  realLifeMatch?: string;
}