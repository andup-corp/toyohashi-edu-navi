import { Question, Option, ConsultationService } from "@/types";
import { getQuestionById } from "@/data/questions";
import { getServicesByIds } from "@/data/services";

export type FlowResult = {
  nextQuestion: Question | null;
  results: ConsultationService[];
  isComplete: boolean;
};

export function processOption(option: Option): FlowResult {
  if (option.nextQuestionId) {
    const nextQuestion = getQuestionById(option.nextQuestionId) || null;
    return {
      nextQuestion,
      results: [],
      isComplete: false,
    };
  }

  if (option.resultIds && option.resultIds.length > 0) {
    const results = getServicesByIds(option.resultIds);
    return {
      nextQuestion: null,
      results,
      isComplete: true,
    };
  }

  // fallback
  return {
    nextQuestion: null,
    results: [],
    isComplete: true,
  };
}
