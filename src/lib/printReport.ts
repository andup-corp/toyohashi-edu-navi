import { ConsultationService } from "@/types";

export function printReport(
  results: ConsultationService[],
  answers: { questionId: string; optionLabel: string }[]
): void {
  const now = new Date();
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const answersHtml = answers
    .map(
      (a, i) => `<li>${i + 1}. ${escapeHtml(a.optionLabel)}</li>`
    )
    .join("");

  const resultsHtml = results
    .map(
      (s) => `
      <div class="service-card">
        <div class="service-header">
          <span class="service-number">${s.number}</span>
          <span class="service-name">${escapeHtml(s.name)}</span>
        </div>
        <p class="service-summary">${escapeHtml(s.summary)}</p>
        <div class="service-meta">
          ${s.phone ? `<span>📞 ${escapeHtml(s.phone)}</span>` : ""}
          ${s.address ? `<span>📍 ${escapeHtml(s.address)}</span>` : ""}
          ${s.hours ? `<span>🕐 ${escapeHtml(s.hours)}</span>` : ""}
          <span>💰 ${s.cost}</span>
          <span>📋 ${
            s.appointment === "不要"
              ? "予約不要"
              : s.appointment === "要予約"
              ? "要予約"
              : "学校経由で申込"
          }</span>
        </div>
      </div>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>教育相談 事前シート</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 11pt;
      color: #1f2937;
      background: white;
      padding: 12mm 15mm;
    }
    .page-title {
      font-size: 18pt;
      font-weight: 700;
      color: #1d4ed8;
      border-bottom: 3px solid #1d4ed8;
      padding-bottom: 6px;
      margin-bottom: 4px;
    }
    .date-line {
      font-size: 9pt;
      color: #6b7280;
      margin-bottom: 16px;
    }
    .section {
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12pt;
      font-weight: 700;
      background: #eff6ff;
      color: #1e40af;
      padding: 4px 10px;
      border-left: 4px solid #1d4ed8;
      margin-bottom: 8px;
    }
    .answers-list {
      list-style: none;
      padding-left: 8px;
    }
    .answers-list li {
      padding: 3px 0;
      font-size: 10.5pt;
      border-bottom: 1px solid #f1f5f9;
    }
    .service-card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .service-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 4px;
    }
    .service-number {
      font-size: 14pt;
      font-weight: 700;
      color: #1d4ed8;
      flex-shrink: 0;
    }
    .service-name {
      font-size: 11pt;
      font-weight: 700;
    }
    .service-summary {
      font-size: 9.5pt;
      color: #374151;
      margin-bottom: 6px;
      line-height: 1.5;
    }
    .service-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 9pt;
      color: #4b5563;
    }
    .advisory {
      background: #fefce8;
      border: 1px solid #fde68a;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 10pt;
      margin-bottom: 16px;
    }
    .free-writing-field {
      margin-bottom: 12px;
    }
    .free-writing-label {
      font-size: 10pt;
      font-weight: 700;
      color: #374151;
      margin-bottom: 4px;
    }
    .free-writing-box {
      border: 1px solid #d1d5db;
      border-radius: 4px;
      height: 30mm;
      width: 100%;
    }
    .footer {
      margin-top: 20px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      font-size: 8.5pt;
      color: #6b7280;
      text-align: center;
    }
    @media print {
      body { padding: 8mm 12mm; }
      @page { margin: 10mm; }
    }
  </style>
</head>
<body>
  <h1 class="page-title">豊橋市 教育相談 事前シート</h1>
  <p class="date-line">回答日時：${dateStr}</p>

  <div class="advisory">
    💡 <strong>学校の生活サポート主任</strong>に、このシートをお渡しください。相談がスムーズに進みます。
  </div>

  <div class="section">
    <h2 class="section-title">■ ご回答内容</h2>
    <ul class="answers-list">
      ${answersHtml}
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">■ おすすめの相談先（${results.length}件）</h2>
    ${resultsHtml || "<p style='padding-left:8px;font-size:10pt;color:#6b7280;'>まずは学校の生活サポート主任にご相談ください。</p>"}
  </div>

  <div class="section">
    <h2 class="section-title">■ 自由記入欄（印刷後に手書きでご記入ください）</h2>
    <div class="free-writing-field">
      <p class="free-writing-label">お子さんの様子で特に気になること：</p>
      <div class="free-writing-box"></div>
    </div>
    <div class="free-writing-field">
      <p class="free-writing-label">いつ頃からそのような状態ですか：</p>
      <div class="free-writing-box"></div>
    </div>
    <div class="free-writing-field">
      <p class="free-writing-label">これまでに相談したことのある機関：</p>
      <div class="free-writing-box"></div>
    </div>
  </div>

  <div class="footer">
    このシートは学校の生活サポート主任にお渡しください ／ 発行：豊橋市 教育相談ナビ
  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => { window.print(); }, 400);
    });
  </script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) {
    alert("ポップアップがブロックされています。ブラウザのポップアップ許可を確認してください。");
    return;
  }
  win.document.write(html);
  win.document.close();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
