"use client";

import { useState } from "react";
import { ConsultationService } from "@/types";

type Props = {
  results: ConsultationService[];
  answers: { questionId: string; optionLabel: string }[];
};

export default function PdfDownload({ results, answers }: Props) {
  const [showGuide, setShowGuide] = useState(false);

  const handlePrint = () => {
    setShowGuide(false);
    const { printReport } = require("@/lib/printReport");
    printReport(results, answers);
  };

  return (
    <>
      {/* ボタン */}
      <button
        onClick={() => setShowGuide(true)}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
        aria-label="結果を保存する"
      >
        📄 結果を保存する
      </button>

      {/* 保存方法ガイドモーダル */}
      {showGuide && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white rounded-t-2xl px-5 pt-5 pb-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ハンドル */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            <h2 className="text-base font-bold text-gray-900 mb-1">
              📋 結果の保存方法を選んでください
            </h2>
            <p className="text-xs text-gray-500 mb-5">
              お子さんの相談先リストを手元に残しておきましょう
            </p>

            {/* 方法1: スクリーンショット */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-3">
              <p className="text-sm font-bold text-yellow-900 mb-2">
                📸 いちばん簡単な方法：スクリーンショット
              </p>
              <div className="text-xs text-yellow-800 space-y-1 leading-relaxed">
                <p>
                  <span className="font-bold">iPhone の場合：</span>
                  サイドボタン＋音量アップボタンを同時に押す
                </p>
                <p>
                  <span className="font-bold">Android の場合：</span>
                  電源ボタン＋音量ダウンボタンを同時に押す
                  <br />
                  ※機種によっては画面を手でスワイプするだけで撮れます
                </p>
              </div>
            </div>

            {/* 方法2: PDF保存 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-bold text-blue-900 mb-2">
                📄 PDF ファイルで保存する（少し手順が必要です）
              </p>
              <div className="text-xs text-blue-800 space-y-2 leading-relaxed">
                <div>
                  <p className="font-bold mb-0.5">iPhone（Safari）の場合：</p>
                  <ol className="list-decimal list-inside space-y-0.5 ml-1">
                    <li>「印刷プレビューを開く」をタップ</li>
                    <li>画面に印刷プレビューが表示される</li>
                    <li>プレビューを2本指でピンチアウト（広げる）</li>
                    <li>左上の共有ボタン（□↑）→「ファイルに保存」</li>
                  </ol>
                </div>
                <div>
                  <p className="font-bold mb-0.5">Android（Chrome）の場合：</p>
                  <ol className="list-decimal list-inside space-y-0.5 ml-1">
                    <li>「印刷プレビューを開く」をタップ</li>
                    <li>プリンターの選択欄で「PDFに保存」を選ぶ</li>
                    <li>右上の保存ボタンをタップ</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 印刷プレビューを開くボタン */}
            <button
              onClick={handlePrint}
              className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors mb-3"
            >
              印刷プレビューを開く →
            </button>

            {/* 閉じる */}
            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
