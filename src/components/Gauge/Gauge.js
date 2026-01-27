'use client';

import React from 'react';

export default function RiskScore2({ value = 0 }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));

  let color = 'from-emerald-500 to-emerald-400';
  let soft = 'bg-emerald-500/10 text-emerald-600';
  let label = 'ریسک پایین';

  if (v > 33 && v <= 66) {
    color = 'from-amber-500 to-amber-400';
    soft = 'bg-amber-500/10 text-amber-600';
    label = 'ریسک متوسط';
  } else if (v > 66) {
    color = 'from-rose-500 to-rose-400';
    soft = 'bg-rose-500/10 text-rose-600';
    label = 'ریسک بالا';
  }

  return (
    <div className="w-full rounded-2xl border border-boxBorderColor dark:border-buttonBorderColor-dark bg-boxColor p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-textColor">امتیاز ریسک</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${soft}`}>
          {label}
        </span>
      </div>

      {/* Value Row */}
      <div className="flex items-end justify-between mb-3">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold text-textColor leading-none">
            {Math.round(v)}
          </span>
          <span className="text-sm text-textColor/60 mb-1">از 100</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
          style={{ width: `${v}%` }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-xs text-textColor/50 mt-2 px-1">
        <span>کم</span>
        <span>متوسط</span>
        <span>زیاد</span>
      </div>
    </div>
  );
}
