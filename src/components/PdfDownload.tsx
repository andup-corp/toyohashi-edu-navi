"use client";

import { ConsultationService } from "@/types";

type Props = {
  results: ConsultationService[];
  answers: { questionId: string; optionLabel: string }[];
};

export default function PdfDownload({ results, answers }: Props) {
  const handlePrint = () => {
    const { printReport } = require("@/lib/printReport");
    printReport(results, answers);
  };

  return (
    <button
      onClick={handlePrint}
      className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
      aria-label="結果をPDFで保存（印刷ダイアログが開きます）"
    >
      📄 結果をPDFで保存
    </button>
  );
}
