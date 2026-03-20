"use client";

import { ConsultationService } from "@/types";
import { useState } from "react";

type Props = {
  results: ConsultationService[];
  answers: { questionId: string; optionLabel: string }[];
};

export default function PdfDownload({ results, answers }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Dynamic import to avoid SSR issues
      const { generatePdf } = await import("@/lib/generatePdf");
      await generatePdf(results, answers);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDFの生成に失敗しました。もう一度お試しください。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      aria-label="結果をPDFで保存"
    >
      {isGenerating ? "⏳ 生成中..." : "📄 結果をPDFで保存"}
    </button>
  );
}
