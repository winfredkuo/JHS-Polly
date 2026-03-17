import React, { useState, useEffect } from 'react';
import { Timeline } from './components/Timeline';
import { SubjectView, UserData, ReviewRecord } from './components/SubjectView';
import { DailyVocab } from './components/DailyVocab';
import { VocabReview } from './components/VocabReview';
import { BookOpen, GraduationCap, CalendarDays, BookMarked, LibraryBig } from 'lucide-react';

export default function App() {
  const [userData, setUserData] = useState<UserData>({});
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'subjects' | 'vocab'>('subjects');

  useEffect(() => {
    const savedData = localStorage.getItem('studyPlanData');
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }

    const savedVocab = localStorage.getItem('reviewedVocab');
    if (savedVocab) {
      try {
        const parsed = JSON.parse(savedVocab);
        if (Array.isArray(parsed)) {
          // Migrate old string[] to Record<string, number>
          const migrated: Record<string, number> = {};
          parsed.forEach(id => {
            migrated[id] = 1;
          });
          setReviewCounts(migrated);
          localStorage.setItem('reviewedVocab', JSON.stringify(migrated));
        } else {
          setReviewCounts(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved vocab', e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  const handleAddReview = (unitId: string, date: string, note: string) => {
    const newRecord: ReviewRecord = {
      id: crypto.randomUUID(),
      date,
      note
    };

    const updatedData = {
      ...userData,
      [unitId]: [...(userData[unitId] || []), newRecord]
    };

    setUserData(updatedData);
    localStorage.setItem('studyPlanData', JSON.stringify(updatedData));
  };

  const handleReviewVocab = (vocabId: string) => {
    setReviewCounts(prev => {
      const currentCount = prev[vocabId] || 0;
      const updatedCounts = {
        ...prev,
        [vocabId]: currentCount + 1
      };
      localStorage.setItem('reviewedVocab', JSON.stringify(updatedCounts));
      return updatedCounts;
    });
  };

  if (!isLoaded) return null;

  // Calculate days until exam
  const examDate = new Date('2027-05-15');
  const today = new Date();
  const diffTime = Math.abs(examDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">會考戰士計畫表</h1>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-900">
              距離 2027 會考還有 <strong className="text-lg text-indigo-700">{diffDays}</strong> 天
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section: Horizontal Timeline */}
        <Timeline />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Daily Vocab */}
          <div className="lg:col-span-4">
            <DailyVocab 
              reviewCounts={reviewCounts} 
              onReview={handleReviewVocab} 
            />
          </div>

          {/* Right Column: Main Content Area */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm self-start">
              <button
                onClick={() => setActiveTab('subjects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'subjects' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BookMarked className="w-4 h-4" />
                各科複習進度
              </button>
              <button
                onClick={() => setActiveTab('vocab')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'vocab' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <LibraryBig className="w-4 h-4" />
                單字片語庫
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              {activeTab === 'subjects' ? (
                <SubjectView userData={userData} onAddReview={handleAddReview} />
              ) : (
                <VocabReview reviewCounts={reviewCounts} onReview={handleReviewVocab} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
