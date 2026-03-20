import { ConsultationService } from "@/types";

export async function generatePdf(
  results: ConsultationService[],
  answers: { questionId: string; optionLabel: string }[]
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const now = new Date();
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const pageW = 210;
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = 20;

  // Helper: draw text with wrapping
  const addLine = (text: string, x: number, fontSize: number, bold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(text, x, y);
    y += fontSize * 0.5 + 2;
  };

  const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    y += lines.length * (fontSize * 0.5 + 1) + 2;
  };

  const drawHLine = (color = "#e2e8f0") => {
    doc.setDrawColor(color);
    doc.line(margin, y, pageW - margin, y);
    y += 4;
  };

  // Title
  doc.setFillColor("#1d4ed8");
  doc.rect(0, 0, pageW, 18, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Toyohashi Educational Consultation Sheet", margin, 12);
  doc.setTextColor("#000000");
  y = 26;

  // Subtitle
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");
  doc.text(`Date: ${dateStr}`, margin, y);
  y += 8;
  doc.setTextColor("#000000");

  drawHLine();

  // Section: Answers
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Your Answers / ご回答内容", margin, y);
  y += 6;

  answers.forEach((answer, i) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#374151");
    const lines = doc.splitTextToSize(`${i + 1}. ${answer.optionLabel}`, contentW - 5);
    doc.text(lines, margin + 3, y);
    y += lines.length * 5 + 1;
  });
  y += 4;
  drawHLine();

  // Section: Results
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("Recommended Services / おすすめの相談先", margin, y);
  y += 6;

  results.forEach((service) => {
    // Check page break
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor("#eff6ff");
    doc.roundedRect(margin, y, contentW, 4, 1, 1, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#1e40af");
    doc.text(`${service.number} ${service.name}`, margin + 2, y + 3);
    y += 7;

    doc.setTextColor("#374151");
    addWrappedText(service.summary, margin + 2, contentW - 4, 8);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    if (service.phone) {
      doc.text(`Tel: ${service.phone}`, margin + 2, y);
      y += 4;
    }
    if (service.address) {
      const addrLines = doc.splitTextToSize(`Address: ${service.address}`, contentW - 4);
      doc.text(addrLines, margin + 2, y);
      y += addrLines.length * 4;
    }
    if (service.hours) {
      doc.text(`Hours: ${service.hours}`, margin + 2, y);
      y += 4;
    }
    doc.text(`Cost: ${service.cost}  /  Appointment: ${service.appointment}`, margin + 2, y);
    y += 6;
    drawHLine("#f1f5f9");
  });

  // Section: Free writing
  y += 2;
  if (y > 210) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("Notes / 自由記入欄", margin, y);
  y += 6;

  const fields = [
    "お子さんの様子で特に気になること",
    "いつ頃からそのような状態ですか",
    "これまでに相談したことのある機関",
  ];

  fields.forEach((label) => {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#374151");
    doc.text(label, margin, y);
    y += 4;
    doc.setDrawColor("#d1d5db");
    doc.rect(margin, y, contentW, 18);
    y += 22;
  });

  // Footer
  const footerY = 285;
  doc.setFillColor("#f1f5f9");
  doc.rect(0, footerY - 4, pageW, 16, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");
  doc.text(
    "Please give this sheet to the Life Support Homeroom Teacher at your school.",
    margin,
    footerY + 2
  );
  doc.text("Issued by: Toyohashi Educational Consultation Navi", margin, footerY + 7);

  doc.save("kyoiku-sodan-sheet.pdf");
}
