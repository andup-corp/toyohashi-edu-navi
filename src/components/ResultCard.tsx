"use client";

import { ConsultationService } from "@/types";

type Props = {
  service: ConsultationService;
  index: number;
};

const appointmentLabel = {
  不要: { text: "予約不要", color: "bg-green-100 text-green-700" },
  要予約: { text: "要予約", color: "bg-orange-100 text-orange-700" },
  学校経由: { text: "学校経由で申込", color: "bg-blue-100 text-blue-700" },
};

export default function ResultCard({ service, index }: Props) {
  const appt = appointmentLabel[service.appointment];

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <span className="text-2xl font-bold text-blue-600 flex-shrink-0">{service.number}</span>
        <h3 className="text-base font-bold text-gray-900 leading-snug mt-0.5">{service.name}</h3>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3">{service.summary}</p>

      {/* Info grid */}
      <div className="flex flex-col gap-1.5 text-sm">
        {service.phone && (
          <a
            href={`tel:${service.phone.replace(/-/g, "")}`}
            className="flex items-center gap-2 text-blue-600 hover:underline"
            aria-label={`電話をかける: ${service.phone}`}
          >
            <span>📞</span>
            <span>{service.phone}</span>
          </a>
        )}
        {service.address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(service.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
            aria-label={`Googleマップで開く: ${service.address}`}
          >
            <span>📍</span>
            <span>{service.address}</span>
          </a>
        )}
        {service.hours && (
          <div className="flex items-center gap-2 text-gray-600">
            <span>🕐</span>
            <span>{service.hours}</span>
          </div>
        )}
        {service.notes && (
          <div className="flex items-center gap-2 text-gray-500">
            <span>📌</span>
            <span>{service.notes}</span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">💰 {service.cost}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${appt.color}`}>
          📋 {appt.text}
        </span>
      </div>
    </div>
  );
}
