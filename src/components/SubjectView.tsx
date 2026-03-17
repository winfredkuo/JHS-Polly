import React, { useState } from 'react';
import { curriculum, Subject, Book, Unit } from '../data/curriculum';
import { format } from 'date-fns';
import { CheckCircle2, Plus, Calendar, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react';

export interface ReviewRecord {
  id: string;
  date: string;
  note: string;
}

export interface UserData {
  [unitId: string]: ReviewRecord[];
}

interface SubjectViewProps {
  userData: UserData;
  onAddReview: (unitId: string, date: string, note: string) => void;
}

export function SubjectView({ userData, onAddReview }: SubjectViewProps) {
  const [activeSubject, setActiveSubject] = useState<string>(curriculum[0].id);
  const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({
    [curriculum[0].books[0].id]: true
  });
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [reviewDate, setReviewDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [reviewNote, setReviewNote] = useState('');

  const subject = curriculum.find(s => s.id === activeSubject)!;

  const toggleBook = (bookId: string) => {
    setExpandedBooks(prev => ({ ...prev, [bookId]: !prev[bookId] }));
  };

  const handleAddReview = () => {
    if (!selectedUnit) return;
    onAddReview(selectedUnit.id, reviewDate, reviewNote);
    setSelectedUnit(null);
    setReviewDate(format(new Date(), 'yyyy-MM-dd'));
    setReviewNote('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar for Subjects */}
      <div className="w-full md:w-48 bg-slate-50 border-r border-slate-100 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
        {curriculum.map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveSubject(sub.id)}
            className={`px-4 py-3 rounded-xl text-left font-medium transition-colors whitespace-nowrap md:whitespace-normal ${
              activeSubject === sub.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {sub.title}
          </button>
        ))}
      </div>

      {/* Main Content for Books and Units */}
      <div className="flex-1 p-6 overflow-y-auto max-h-[800px]">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{subject.title} 複習計畫</h2>
        
        <div className="space-y-6">
          {subject.books.map(book => {
            const isExpanded = expandedBooks[book.id];
            
            // Calculate progress
            const totalUnits = book.units.length;
            const reviewedUnits = book.units.filter(u => userData[u.id] && userData[u.id].length > 0).length;
            const progress = totalUnits > 0 ? Math.round((reviewedUnits / totalUnits) * 100) : 0;

            return (
              <div key={book.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleBook(book.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
                    <h3 className="text-lg font-semibold text-slate-800">{book.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 font-medium">{progress}% ({reviewedUnits}/{totalUnits})</div>
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="divide-y divide-slate-100">
                    {book.units.map(unit => {
                      const records = userData[unit.id] || [];
                      const hasReviewed = records.length > 0;

                      return (
                        <div key={unit.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 ${hasReviewed ? 'text-emerald-500' : 'text-slate-300'}`}>
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-800">{unit.title}</div>
                              {hasReviewed && (
                                <div className="mt-2 space-y-2">
                                  {records.map((r, i) => (
                                    <div key={r.id} className="text-sm bg-slate-100 rounded-lg p-2 flex items-start gap-2">
                                      <div className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                                        第 {i + 1} 次
                                      </div>
                                      <div>
                                        <div className="text-slate-600 font-medium flex items-center gap-1">
                                          <Calendar className="w-3 h-3" /> {r.date}
                                        </div>
                                        {r.note && (
                                          <div className="text-slate-500 mt-1 flex items-start gap-1">
                                            <MessageSquare className="w-3 h-3 mt-0.5" /> {r.note}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setSelectedUnit(unit)}
                            className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            新增複習紀錄
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for adding review */}
      {selectedUnit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold text-slate-800 mb-4">新增複習紀錄</h3>
            <div className="mb-4">
              <div className="text-sm text-slate-500 mb-1">單元</div>
              <div className="font-medium text-slate-800">{selectedUnit.title}</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">複習日期</label>
                <input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">備註 (選填)</label>
                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="例如：錯題已訂正、觀念還需加強..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedUnit(null)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg transition-colors"
              >
                儲存紀錄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
