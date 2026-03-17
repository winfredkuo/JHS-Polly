import React, { useState } from 'react';
import { getAllVocabMap } from '../data/vocabulary';
import { Search, CheckCircle2, RefreshCw, Star, AlertCircle } from 'lucide-react';

interface VocabReviewProps {
  reviewCounts: Record<string, number>;
  onReview: (id: string) => void;
}

export function VocabReview({ reviewCounts, onReview }: VocabReviewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const allVocab = getAllVocabMap();
  
  // Get all reviewed vocab objects
  const reviewedList = Object.keys(reviewCounts)
    .map(id => allVocab[id])
    .filter(Boolean); // Filter out any undefined just in case

  // Filter by search term
  const filteredList = reviewedList.filter(v => 
    v.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.meaning.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full min-h-[600px]">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">單字片語庫</h2>
            <p className="text-slate-500 mt-1">
              您已經複習了 <strong className="text-indigo-600">{reviewedList.length}</strong> 個單字/片語
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋已複習的單字..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto max-h-[800px]">
        {reviewedList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-12">
            <CheckCircle2 className="w-16 h-16 text-slate-200" />
            <p>目前還沒有已複習的單字，趕快到左側完成今日任務吧！</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            找不到符合「{searchTerm}」的單字
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredList.map(vocab => {
              const count = reviewCounts[vocab.id] || 0;
              const isMastered = count >= 3;
              
              return (
                <div key={vocab.id} className={`border rounded-xl p-4 transition-all flex flex-col ${isMastered ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`font-bold text-lg ${isMastered ? 'text-slate-600' : 'text-slate-800'}`}>{vocab.word}</span>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-1">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                          vocab.type === 'hard' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {vocab.type === 'hard' ? '稍難' : '常見'}
                        </span>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                          vocab.category === 'phrase' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {vocab.category === 'phrase' ? '片語' : '單字'}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1 ${isMastered ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {isMastered ? <Star className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                        複習 {count} 次
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-600 mb-4">{vocab.meaning}</div>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                    {isMastered ? (
                      <div className="text-xs text-amber-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        已熟記！建議複習其他單字
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400">
                        多複習幾次加深印象吧！
                      </div>
                    )}
                    <button 
                      onClick={() => onReview(vocab.id)}
                      className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      再次複習
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
