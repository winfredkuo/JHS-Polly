import React, { useState, useEffect } from 'react';
import { getDailyVocab, Vocab } from '../data/vocabulary';
import { format } from 'date-fns';
import { CheckCircle2, Circle, BookOpen, Volume2, Sparkles } from 'lucide-react';

interface DailyVocabProps {
  reviewCounts: Record<string, number>;
  onReview: (id: string) => void;
  onShowAI: (word: string) => void;
}

export function DailyVocab({ reviewCounts, onReview, onShowAI }: DailyVocabProps) {
  const [dailyWords, setDailyWords] = useState<Vocab[]>([]);
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    setDailyWords(getDailyVocab(todayStr));
  }, [todayStr]);

  const allReviewed = dailyWords.every(w => (reviewCounts[w.id] || 0) > 0);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // American English
    utterance.rate = 0.9; // Slightly slower for clarity
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          每日單字片語 (8個)
        </h2>
        <p className="text-indigo-100 text-sm mt-2">
          {todayStr} · 5個常見(含2片語) / 3個稍難(含1片語)
        </p>
        {allReviewed && dailyWords.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            今日任務已完成！
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {dailyWords.map((vocab, index) => {
          const isReviewed = (reviewCounts[vocab.id] || 0) > 0;
          return (
            <div 
              key={vocab.id} 
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isReviewed 
                  ? 'bg-slate-50 border-slate-200 opacity-75' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 text-center text-sm font-bold text-slate-400">
                  {index + 1}
                </div>
                <button
                  onClick={() => onShowAI(vocab.word)}
                  className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm group"
                  title="AI 深度解析"
                >
                  <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                </button>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold text-lg ${isReviewed ? 'text-slate-600 line-through' : 'text-slate-800'}`}>
                      {vocab.word}
                    </span>
                    {vocab.phonetic && (
                      <span className="text-sm font-mono text-slate-400">
                        {vocab.phonetic}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(vocab.word);
                      }}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-indigo-500 transition-colors"
                      title="播放美式發音"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      vocab.type === 'hard' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {vocab.type === 'hard' ? '稍難' : '常見'}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      vocab.category === 'phrase' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {vocab.category === 'phrase' ? '片語' : '單字'}
                    </span>
                  </div>
                  <div className={`text-sm mt-0.5 ${isReviewed ? 'text-slate-500' : 'text-slate-600'}`}>
                    {vocab.meaning}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onReview(vocab.id)}
                disabled={isReviewed}
                className={`p-2 rounded-full transition-colors ${
                  isReviewed 
                    ? 'text-emerald-500 cursor-default' 
                    : 'text-slate-300 hover:text-indigo-500 hover:bg-indigo-50'
                }`}
              >
                {isReviewed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
