import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';

interface Milestone {
  date: string;
  title: string;
  type: 'today' | 'review';
  note?: string;
}

import { UserData } from './SubjectView';
import { curriculum } from '../data/curriculum';
import { MessageSquare, History, Calendar } from 'lucide-react';

interface TimelineProps {
  userData: UserData;
}

export function Timeline({ userData }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  
  // Combine today's date and user reviews
  const allMilestones: Milestone[] = [];
  
  // Add user reviews as milestones
  Object.entries(userData).forEach(([unitId, records]) => {
    const unit = curriculum.flatMap(s => s.books).flatMap(b => b.units).find(u => u.id === unitId);
    if (unit) {
      records.forEach(record => {
        allMilestones.push({
          date: record.date,
          title: unit.title,
          type: 'review',
          note: record.note
        });
      });
    }
  });

  if (!allMilestones.find(m => m.date === todayStr && m.type === 'today')) {
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
        const itemWidth = 160; 
        const scrollPosition = (todayIndex * itemWidth) - (container.clientWidth / 2) + (itemWidth / 2);
        
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
        }, 100);
      }
    }
  }, [allMilestones]);

  if (allMilestones.length <= 1 && allMilestones[0]?.type === 'today') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8 text-center">
        <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <History className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">複習歷史時間軸</h2>
        <p className="text-slate-500 text-sm">目前還沒有複習紀錄，開始複習後會在這裡顯示您的學習足跡！</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-800">複習歷史時間軸</h2>
        </div>
        <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          依日期排序
        </div>
      </div>
      
      <div className="relative">
        {/* Horizontal Line */}
        <div className="absolute top-[44px] left-0 right-0 h-1 bg-slate-100 rounded-full" />
        
        <div ref={scrollRef} className="flex overflow-x-auto pb-6 pt-2 snap-x hide-scrollbar relative z-10 scroll-smooth">
          {allMilestones.map((m, i) => {
            const isToday = m.type === 'today';
            const isReview = m.type === 'review';
            
            return (
              <div key={i} className="flex-shrink-0 w-40 snap-start flex flex-col items-center group">
                {/* Date (Top) */}
                <div className={`text-xs font-black mb-3 transition-colors uppercase tracking-wider ${
                  isToday ? 'text-blue-700 bg-blue-50 px-3 py-1 rounded-full shadow-sm border border-blue-200' :
                  'text-emerald-700'
                }`}>
                  {m.date}
                </div>
                
                {/* Node */}
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-transform group-hover:scale-125 ${
                  isToday ? 'bg-blue-500 w-6 h-6 animate-pulse ring-4 ring-blue-100' :
                  'bg-emerald-500 w-3 h-3'
                }`} />
                
                {/* Title (Bottom) */}
                <div className="mt-3 text-center px-2 flex flex-col items-center gap-1">
                  <div className={`text-xs font-bold transition-colors line-clamp-2 ${
                    isToday ? 'text-blue-700' : 'text-emerald-700'
                  }`}>
                    {m.title}
                  </div>
                  {isReview && m.note && (
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 max-w-full">
                      <MessageSquare className="w-2.5 h-2.5 shrink-0 text-indigo-400" />
                      <span className="truncate">{m.note}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
