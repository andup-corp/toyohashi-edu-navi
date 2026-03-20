import { Question } from "@/types";

export const questions: Question[] = [
  // ===== Q1: 大カテゴリ選択 =====
  {
    id: "q1",
    text: "お子さんのことで、どのようなことが気になっていますか？",
    options: [
      {
        label: "学校生活の悩み（不登校・行きしぶり・いじめ・友人関係など）",
        icon: "🏫",
        nextQuestionId: "q2_school",
      },
      {
        label: "成長や発達について心配がある",
        icon: "🌱",
        nextQuestionId: "q2_develop",
      },
      {
        label: "こころの健康（眠れない・食べられない・気分の落ち込みなど）",
        icon: "💙",
        nextQuestionId: "q2_mental",
      },
      {
        label: "子育て・家庭の問題（しつけ・非行・家庭内の困りごと・就労や自立）",
        icon: "🏠",
        nextQuestionId: "q2_family",
      },
      {
        label: "学校や教室以外の居場所・活動先を探したい",
        icon: "🌿",
        nextQuestionId: "q2_place",
      },
      {
        label: "よくわからないが、まず誰かに相談したい",
        icon: "❓",
        nextQuestionId: "q2_unsure",
      },
    ],
  },

  // ===== 学校生活パス =====
  {
    id: "q2_school",
    text: "現在、お子さんは学校に通えていますか？",
    options: [
      {
        label: "毎日通えているが、悩みがある",
        nextQuestionId: "q3_school_issue",
      },
      {
        label: "行きしぶり・遅刻・早退が増えている",
        nextQuestionId: "q3_school_duration",
      },
      {
        label: "ほとんど通えていない（不登校状態）",
        nextQuestionId: "q3_school_duration",
      },
    ],
  },
  {
    id: "q3_school_issue",
    text: "学校での悩みは、主にどのようなことですか？",
    options: [
      {
        label: "いじめや嫌がらせを受けている（疑いを含む）",
        icon: "😢",
        nextQuestionId: "q4_school_where",
      },
      {
        label: "友人関係・グループ内のトラブル",
        icon: "👫",
        nextQuestionId: "q4_school_where",
      },
      {
        label: "授業・学習への意欲の低下や遅れ",
        icon: "📚",
        nextQuestionId: "q4_school_where",
      },
      {
        label: "先生との関係・学校への不信感",
        icon: "🗣️",
        nextQuestionId: "q4_school_where",
      },
      {
        label: "理由がはっきりしない漠然とした不安",
        icon: "🌫️",
        nextQuestionId: "q4_school_where",
      },
    ],
  },
  {
    id: "q4_school_where",
    text: "相談する場所として、どちらがご希望に近いですか？",
    options: [
      {
        label: "🏫 学校の中で、なるべくそっと相談したい",
        resultIds: ["sc", "clinical", "support-room"],
      },
      {
        label: "🏢 学校とは別の、外部の窓口に相談したい",
        resultIds: ["edu-counsel"],
      },
      {
        label: "どちらでもよい・両方知りたい",
        resultIds: ["sc", "clinical", "support-room", "edu-counsel"],
      },
    ],
  },
  {
    id: "q3_school_duration",
    text: "行きしぶり・欠席が続いて、どのくらいになりますか？",
    options: [
      {
        label: "最近始まった（1ヶ月以内）",
        nextQuestionId: "q4_school_grade",
      },
      {
        label: "しばらく続いている（1〜6ヶ月ほど）",
        nextQuestionId: "q4_school_grade",
      },
      {
        label: "長期間続いている（半年以上）",
        nextQuestionId: "q4_school_grade",
      },
    ],
  },
  {
    id: "q4_school_grade",
    text: "お子さんの学年を教えてください",
    options: [
      {
        label: "小学生（1〜6年）",
        resultIds: ["hot-plaza", "hidamari", "edu-counsel", "sc", "clinical"],
      },
      {
        label: "中学生（1〜3年）",
        resultIds: [
          "hot-plaza",
          "e-room",
          "night-school",
          "hidamari",
          "edu-counsel",
          "sc",
          "clinical",
        ],
      },
    ],
  },

  // ===== 成長・発達パス =====
  {
    id: "q2_develop",
    text: "成長や発達で、主にどのようなことが気になっていますか？",
    options: [
      {
        label: "落ち着きがない・じっとしていられない・衝動的",
        icon: "⚡",
        nextQuestionId: "q3_develop_grade",
      },
      {
        label: "言葉の遅れ・発音・会話のかみ合わなさ",
        icon: "💬",
        nextQuestionId: "q3_develop_grade",
      },
      {
        label: "勉強・読み書き・計算についていけない",
        icon: "📖",
        nextQuestionId: "q3_develop_grade",
      },
      {
        label: "友達とのかかわり方・集団生活への適応",
        icon: "🤝",
        nextQuestionId: "q3_develop_grade",
      },
      {
        label: "就学先・進学先・支援クラスについて迷っている",
        icon: "🏫",
        nextQuestionId: "q3_develop_grade",
      },
    ],
  },
  {
    id: "q3_develop_grade",
    text: "お子さんの年齢・学年を教えてください",
    options: [
      {
        label: "未就学（幼稚園・保育園・0〜6歳）",
        resultIds: ["nijinoko", "dev-center"],
      },
      {
        label: "小学生（1〜6年）",
        resultIds: ["nijinoko", "dev-center"],
      },
      {
        label: "中学生（1〜3年）",
        resultIds: ["nijinoko", "dev-center"],
      },
    ],
  },

  // ===== こころの健康パス =====
  {
    id: "q2_mental",
    text: "こころの悩みは、主にどなたについてですか？",
    options: [
      {
        label: "お子さん自身のこと",
        nextQuestionId: "q3_mental_child",
      },
      {
        label: "保護者（自分自身）のこと",
        nextQuestionId: "q3_mental_parent",
      },
      {
        label: "子どもも自分も、両方つらい",
        nextQuestionId: "q3_mental_child",
      },
    ],
  },
  {
    id: "q3_mental_child",
    text: "お子さんの様子として、最も気になるものを選んでください",
    options: [
      {
        label: "眠れない・食欲がない・体の不調が続く",
        icon: "😴",
        nextQuestionId: "q4_mental_duration",
      },
      {
        label: "気分の落ち込み・無気力・何もする気が起きない",
        icon: "🌧️",
        nextQuestionId: "q4_mental_duration",
      },
      {
        label: "「死にたい」「消えたい」という言葉が出た",
        icon: "🆘",
        nextQuestionId: "q4_mental_urgent",
      },
      {
        label: "強い不安・外出を嫌がる・部屋から出られない",
        icon: "🚪",
        nextQuestionId: "q4_mental_duration",
      },
      {
        label: "感情の激しい波・自傷行為がみられる",
        icon: "⚠️",
        nextQuestionId: "q4_mental_urgent",
      },
    ],
  },
  {
    id: "q4_mental_urgent",
    text: "お子さんの状態をしっかり受け止めています。すぐに専門家に相談することをおすすめします。どのくらい続いていますか？",
    urgent: true,
    options: [
      {
        label: "最近のこと（2週間以内）",
        resultIds: ["kokoro", "adolescent", "edu-counsel"],
      },
      {
        label: "しばらく続いている（1ヶ月以上）",
        resultIds: ["kokoro", "adolescent", "edu-counsel"],
      },
    ],
  },
  {
    id: "q4_mental_duration",
    text: "その様子は、どのくらい続いていますか？",
    options: [
      {
        label: "最近始まった（2週間以内）",
        resultIds: ["adolescent", "kokoro"],
      },
      {
        label: "しばらく続いている（1〜3ヶ月）",
        resultIds: ["adolescent", "kokoro"],
      },
      {
        label: "長期間続いている（3ヶ月以上）",
        resultIds: ["adolescent", "kokoro", "edu-counsel"],
      },
    ],
  },
  {
    id: "q3_mental_parent",
    text: "保護者ご自身の状況として、最も近いものを選んでください",
    options: [
      {
        label: "眠れない・疲弊していて限界を感じる",
        icon: "😓",
        nextQuestionId: "q4_mental_parent",
      },
      {
        label: "子どもへの適切な接し方がわからない",
        icon: "🤔",
        nextQuestionId: "q4_mental_parent",
      },
      {
        label: "子どもに怒りをぶつけてしまい自己嫌悪に陥る",
        icon: "😞",
        nextQuestionId: "q4_mental_parent",
      },
      {
        label: "自分自身の気分の落ち込みが激しい",
        icon: "💭",
        nextQuestionId: "q4_mental_parent",
      },
    ],
  },
  {
    id: "q4_mental_parent",
    text: "そのような状態は、どのくらい続いていますか？",
    options: [
      {
        label: "最近のこと（1ヶ月以内）",
        resultIds: ["kokoro", "cocoale"],
      },
      {
        label: "しばらく続いている（1〜6ヶ月）",
        resultIds: ["kokoro", "cocoale"],
      },
      {
        label: "かなり長い間続いている（半年以上）",
        resultIds: ["kokoro", "cocoale", "edu-counsel"],
      },
    ],
  },

  // ===== 家庭・子育てパス =====
  {
    id: "q2_family",
    text: "家庭や子育てのことで、主にどのような問題が起きていますか？",
    options: [
      {
        label: "しつけ・言うことを聞かない・子育ての方法がわからない",
        icon: "🏠",
        resultIds: ["cocoale"],
      },
      {
        label: "反抗期・家庭内暴力・非行などの問題行動",
        icon: "⚡",
        resultIds: ["cocoale"],
      },
      {
        label: "不登校と家庭内の問題が重なっている",
        icon: "🔗",
        resultIds: ["cocoale", "edu-counsel"],
      },
      {
        label: "子どもの将来（就職・自立・ひきこもり）が心配",
        icon: "🌱",
        resultIds: ["cocoale"],
      },
      {
        label: "その他、家庭全般のことを誰かに聞いてほしい",
        icon: "💬",
        resultIds: ["cocoale"],
      },
    ],
  },

  // ===== 居場所・活動先パス =====
  {
    id: "q2_place",
    text: "お子さんの学年を教えてください",
    options: [
      {
        label: "未就学・小学生",
        nextQuestionId: "q3_place_purpose",
      },
      {
        label: "中学生",
        nextQuestionId: "q3_place_purpose_mid",
      },
    ],
  },
  {
    id: "q3_place_purpose",
    text: "どのような居場所・活動を探していますか？（小学生）",
    options: [
      {
        label: "学習サポートも受けながら過ごせる場所",
        resultIds: ["hot-plaza", "hidamari"],
      },
      {
        label: "のびのびと活動できる居場所（勉強以外）",
        resultIds: ["hidamari", "wakaba"],
      },
      {
        label: "大人や学生との交流・メンタルサポート",
        resultIds: ["mental-friend", "hidamari"],
      },
    ],
  },
  {
    id: "q3_place_purpose_mid",
    text: "どのような居場所・活動を探していますか？（中学生）",
    options: [
      {
        label: "学習サポートも受けながら過ごせる場所",
        resultIds: ["hot-plaza", "e-room", "night-school"],
      },
      {
        label: "のびのびと活動できる居場所（勉強以外）",
        resultIds: ["hidamari", "wakaba", "e-room"],
      },
      {
        label: "大人や学生との交流・メンタルサポート",
        resultIds: ["mental-friend", "hidamari"],
      },
    ],
  },

  // ===== よくわからないパス =====
  {
    id: "q2_unsure",
    text: "今のお気持ちに近いものを選んでください",
    options: [
      {
        label: "なんとなく不安だが、何が問題か言葉にできない",
        resultIds: ["edu-counsel", "sc"],
      },
      {
        label: "気になることはあるが、どこに相談すればよいかわからない",
        resultIds: ["edu-counsel", "sc"],
      },
      {
        label: "とにかく誰かに話を聞いてほしい",
        resultIds: ["edu-counsel", "sc"],
      },
    ],
  },
];

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
