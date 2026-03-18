import React from 'react';
import { format, isAfter, parseISO } from 'date-fns';
import { Bell, ChevronRight } from 'lucide-react';

export interface Milestone {
  date: string;
  title: string;
  type: 'school' | 'exam';
  highlight?: boolean;
}

export const baseMilestones: Milestone[] = [
  { date: '2026-08-31', title: '九年級開學', type: 'school' },
  { date: '2026-09-05', title: '北北基模考(1~2冊)', type: 'exam' },
  { date: '2026-10-10', title: '九上第一次段考', type: 'exam' },
  { date: '2026-11-15', title: '校內模考(1~3冊)', type: 'exam' },
  { date: '2026-12-05', title: '九上第二次段考', type: 'exam' },
  { date: '2026-12-25', title: '北北基模考(1~4冊)', type: 'exam' },
  { date: '2027-01-15', title: '九上第三次段考', type: 'exam' },
  { date: '2027-02-15', title: '九下開學', type: 'school' },
  { date: '2027-02-25', title: '北北基模考(1~5冊)', type: 'exam' },
  { date: '2027-04-15', title: '九下段考(全面自習)', type: 'exam' },
  { date: '2027-04-25', title: '北北基模考(1~6冊)', type: 'exam' },
  { date: '2027-05-05', title: '全國模考(1~6冊)', type: 'exam' },
  { date: '2027-05-15', title: '會考 (Day 1)', type: 'exam', highlight: true },
  { date: '2027-05-16', title: '會考 (Day 2)', type: 'exam', highlight: true },
];

export function UpcomingMilestones() {
  const today = new Date();
  const upcoming = baseMilestones
    .filter(m => isAfter(parseISO(m.date), today));

  if (upcoming.length === 0) return null;

  return (
    <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar py-1 w-full relative">
      <div className="flex items-center gap-3">
        {upcoming.map((m, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border whitespace-nowrap transition-all flex-shrink-0 ${
              m.highlight 
                ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm' 
                : m.type === 'exam'
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              m.highlight ? 'bg-rose-500 animate-pulse' : m.type === 'exam' ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{m.date}</span>
            <span className="text-xs font-bold">{m.title}</span>
            {i < upcoming.length - 1 && <ChevronRight className="w-3 h-3 opacity-30" />}
          </div>
        ))}
      </div>
    </div>
  );
}
