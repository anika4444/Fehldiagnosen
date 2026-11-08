export interface CommunicationAnswerResponse {
  id: number;
  text: string;
}

export interface CommunicationQuestionResponse {
  id: number;
  text: string;
  answers: CommunicationAnswerResponse[];
}

export interface CommunicationLevelResponse {
  id: number;
  patientId: number;
  levelName: string;
  levelDescription: string;
  actionRecommendation: string;
}

export interface CreateCommunicationLevelRequest {
  selectedAnswerIds: number[];
}
