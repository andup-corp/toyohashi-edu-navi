import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q1",
    text: "お子さんのことで、どのようなことが気になっていますか？",
    options: [
      {
        label: "学校生活の悩み（不登校・行きしぶり・いじめ・友人関係など）",
        icon: "🏫",
        nextQuestionId: "q2a",
      },
      {
        label: "成長や発達について心配がある",
        icon: "🌱",
        resultIds: ["nijinoko", "dev-center"],
      },
      {
        label: "こころの健康（眠れない・食べられない・気分の落ち込みなど）",
        icon: "💙",
        nextQuestionId: "q2c",
      },
      {
        label: "子育て・家庭の問題（しつけ・非行・家庭内の困りごと・就労や自立）",
        icon: "🏠",
        resultIds: ["cocoale"],
      },
      {
        label: "学校や教室以外の居場所・活動先を探したい",
        icon: "🌿",
        resultIds: ["hot-plaza", "hidamari", "wakaba", "mental-friend"],
      },
      {
        label: "よくわからないが、まず誰かに相談したい",
        icon: "❓",
        resultIds: ["edu-counsel", "sc"],
      },
    ],
  },
  {
    id: "q2a",
    text: "現在、お子さんは学校に通えていますか？",
    options: [
      {
        label: "通えているが、悩みがある",
        nextQuestionId: "q3a",
      },
      {
        label: "行きしぶり・遅刻・早退が増えている",
        nextQuestionId: "q3b",
      },
      {
        label: "ほとんど通えていない（不登校）",
        nextQuestionId: "q3b",
      },
    ],
  },
  {
    id: "q3a",
    text: "どこで相談したいですか？",
    options: [
      {
        label: "学校の中で相談したい",
        icon: "🏫",
        resultIds: ["sc", "clinical", "support-room"],
      },
      {
        label: "学校以外の場所で相談したい",
        icon: "🏢",
        resultIds: ["edu-counsel"],
      },
      {
        label: "どちらでもよい",
        resultIds: ["sc", "clinical", "support-room", "edu-counsel"],
      },
    ],
  },
  {
    id: "q3b",
    text: "お子さんの学年を教えてください",
    options: [
      {
        label: "小学生（1〜6年）",
        resultIds: ["hot-plaza", "hidamari", "edu-counsel", "sc", "clinical"],
      },
      {
        label: "中学生（1〜3年）",
        resultIds: ["hot-plaza", "e-room", "night-school", "hidamari", "edu-counsel", "sc", "clinical"],
      },
    ],
  },
  {
    id: "q2c",
    text: "こころの悩みは、主にどなたについてですか？",
    options: [
      {
        label: "お子さん自身",
        resultIds: ["adolescent", "kokoro"],
      },
      {
        label: "保護者ご自身",
        resultIds: ["kokoro"],
      },
      {
        label: "両方",
        resultIds: ["adolescent", "kokoro"],
      },
    ],
  },
];

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
