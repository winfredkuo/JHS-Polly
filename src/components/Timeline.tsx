import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';

interface Milestone {
  date: string;
  title: string;
  type: 'school' | 'exam' | 'today';
  highlight?: boolean;
}

const baseMilestones: Milestone[] = [
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

export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  
  // Combine base milestones with today's date
  const allMilestones = [...baseMilestones];
  if (!allMilestones.find(m => m.date === todayStr && m.title === '今天')) {
    allMilestones.push({ date: todayStr, title: '今天', type: 'today' });
  }
  
  // Sort chronologically
  allMilestones.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Auto-scroll to today's date on load
  useEffect(() => {
    if (scrollRef.current) {
      const todayIndex = allMilestones.findIndex(m => m.type === 'today');
      if (todayIndex !== -1) {
        const container = scrollRef.current;
        const itemWidth = 144; // w-36 = 9rem = 144px
        const scrollPosition = (todayIndex * itemWidth) - (container.clientWidth / 2) + (itemWidth / 2);
        
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
        }, 100);
      }
    }
  }, [allMilestones]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">重要日程與模擬考時間軸</h2>
      
      <div className="relative">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full" />
        
        <div ref={scrollRef} className="flex overflow-x-auto pb-4 pt-2 snap-x hide-scrollbar relative z-10 scroll-smooth">
          {allMilestones.map((m, i) => {
            const isPast = new Date(m.date) < new Date(todayStr);
            const isToday = m.type === 'today';
            
            return (
              <div key={i} className={`flex-shrink-0 w-36 snap-start flex flex-col items-center group ${isPast && !isToday ? 'opacity-40' : ''}`}>
                {/* Date (Top) */}
                <div className={`text-xs font-semibold mb-3 transition-colors ${
                  isToday ? 'text-blue-600 bg-blue-50 px-3 py-1 rounded-full shadow-sm border border-blue-100' :
                  m.highlight ? 'text-red-600' : 
                  'text-slate-500 group-hover:text-indigo-600'
                }`}>
                  {m.date}
                </div>
                
                {/* Node */}
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-transform group-hover:scale-125 ${
                  isToday ? 'bg-blue-500 w-6 h-6 animate-pulse ring-4 ring-blue-100' :
                  m.highlight ? 'bg-red-500 w-5 h-5' : 
                  m.type === 'exam' ? 'bg-indigo-500' : 'bg-emerald-500'
                }`} />
                
                {/* Title (Bottom) */}
                <div className={`text-sm mt-3 text-center px-2 font-medium transition-colors ${
                  isToday ? 'text-blue-700 font-bold' :
                  m.highlight ? 'text-red-700 font-bold' : 
                  'text-slate-700 group-hover:text-indigo-700'
                }`}>
                  {m.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
