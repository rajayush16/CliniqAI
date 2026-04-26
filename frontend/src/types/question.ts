import type { Paper } from "./paper";

export type QuestionFilters = {
  recent_only: boolean;
  last_five_years: boolean;
  review_only: boolean;
  clinical_trials_only: boolean;
};

export type AskQuestionPayload = {
  query: string;
  filters: QuestionFilters;
};

export type AnswerResult = {
  id: number;
  query: string;
  answer: string;
  confidence: "High" | "Medium" | "Low" | string;
  evidence_strength: "High" | "Medium" | "Low" | string;
  key_findings: string[];
  citations: Paper[];
  response_time_ms: number;
  cached: boolean;
  created_at: string;
};

export type QuestionHistoryItem = {
  id: number;
  query: string;
  answer: string;
  confidence: string;
  response_time_ms: number;
  sources_json: Paper[];
  created_at: string;
};

