export interface Question {
  id: number;
  text: string;
  type: 'self' | 'partner'; // Ensure this is 'type', not 'category'
}

export interface UserResponse {
  questionId: number;
  answer: string;
  type: 'self' | 'partner'; 
  realLifeMatch?: string;
}