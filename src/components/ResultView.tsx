"use client";

import { ConsultationService } from "@/types";
import ResultCard from "./ResultCard";
import PdfDownload from "./PdfDownload";

type Props = {
  results: ConsultationService[];
  answers: { questionId: string; optionLabel: string }[];
  onReset: () => void;
};

export default function ResultView({ results, answers, onReset }: Props) {
  const displayResults = results.length > 0 ? results : [];
  const hasResults = displayResults.length > 0;

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Common advisory callout */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-sm text-yellow-900 leading-relaxed">
          💡 まずは学校の <strong>生活サポート主任</strong> にご連絡いただくと、相談がスムーズに進みます。担任の先生を通じてつないでもらうこともできます。
        </p>
      </div>

      {/* Results */}
      {hasResults ? (
        <>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
            おすすめの相談先 ({displayResults.length}件)
          </h2>
          <div className="flex flex-col gap-3">
            {displayResults.map((service, index) => (
              <ResultCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-sm text-gray-600">
            まずは学校の生活サポート主任にご相談ください。
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mt-2">
        <PdfDownload results={displayResults} answers={answers} />
        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          aria-label="最初からやり直す"
        >
          🔄 最初からやり直す
        </button>
      </div>

      {/* Privacy notice */}
      <p className="text-xs text-gray-400 text-center pb-4 leading-relaxed">
        このサービスは入力された情報をサーバーに保存しません。<br />
        ページを閉じると回答内容は消去されます。
      </p>
    </div>
  );
}
