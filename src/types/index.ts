export type Question = {
  id: string;
  text: string;
  options: Option[];
  urgent?: boolean; // 緊急性が高い質問（特別なUIで表示）
};

export type Option = {
  label: string;
  icon?: string;
  nextQuestionId?: string;
  resultIds?: string[];
  tags?: string[];
};

export type ConsultationService = {
  id: string;
  number: string;
  name: string;
  category: "school" | "general" | "development" | "mental" | "family" | "place";
  summary: string;
  phone?: string;
  address?: string;
  hours?: string;
  cost: "無料";
  appointment: "不要" | "要予約" | "学校経由";
  target: ("小学生" | "中学生" | "保護者" | "若者")[];
  tags: string[];
  notes?: string;
};

export type ChatMessage = {
  id: string;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
  urgent?: boolean;
};

export type ChatState = {
  messages: ChatMessage[];
  currentQuestionId: string | null;
  answers: { questionId: string; optionLabel: string }[];
  results: ConsultationService[];
  isComplete: boolean;
};
