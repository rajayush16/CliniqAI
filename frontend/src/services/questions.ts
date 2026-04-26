import { apiRequest } from "./api";
import type { AnswerResult, AskQuestionPayload, QuestionHistoryItem } from "../types/question";

export function askQuestion(payload: AskQuestionPayload) {
  return apiRequest<AnswerResult>("/api/questions/ask", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getQuestion(id: string) {
  return apiRequest<QuestionHistoryItem>(`/api/questions/${id}`);
}

export function getHistory() {
  return apiRequest<QuestionHistoryItem[]>("/api/questions/history");
}

export function deleteQuestion(id: number) {
  return apiRequest<void>(`/api/questions/${id}`, { method: "DELETE" });
}

