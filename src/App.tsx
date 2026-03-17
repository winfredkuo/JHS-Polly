import React, { useState, useEffect } from 'react';
import { Timeline } from './components/Timeline';
import { SubjectView, UserData, ReviewRecord } from './components/SubjectView';
import { DailyVocab } from './components/DailyVocab';
import { VocabReview } from './components/VocabReview';
import { BookOpen, GraduationCap, CalendarDays, BookMarked, LibraryBig, LogIn, LogOut, User, AlertCircle } from 'lucide-react';
import { auth, signInWithGoogle, logout, db } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'subjects' | 'vocab'>('subjects');

  // Handle Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Clear data if logged out or use local if preferred?
        // For now, let's keep local data as fallback or initial state
        setIsLoaded(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync with Firestore when logged in
  useEffect(() => {
    if (!user) return;

    // Sync Subject Progress
    const unsubSubjects = onSnapshot(collection(db, `users/${user.uid}/subjectProgress`), (snapshot) => {
      const newData: UserData = {};
      snapshot.forEach((doc) => {
        newData[doc.id] = doc.data().records;
      });
      setUserData(newData);
    });

    // Sync Vocab Progress
    const unsubVocab = onSnapshot(collection(db, `users/${user.uid}/vocabProgress`), (snapshot) => {
      const newCounts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        newCounts[doc.id] = doc.data().count;
      });
      setReviewCounts(newCounts);
    });

    setIsLoaded(true);

    return () => {
      unsubSubjects();
      unsubVocab();
    };
  }, [user]);

  // Initial Local Storage Load (only if not logged in or as initial state)
  useEffect(() => {
    if (user) return; // Skip if logged in (Firestore is source of truth)

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
          const migrated: Record<string, number> = {};
          parsed.forEach(id => { migrated[id] = 1; });
          setReviewCounts(migrated);
        } else {
          setReviewCounts(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved vocab', e);
      }
    }
    
    setIsLoaded(true);
  }, [user]);

  const handleAddReview = async (unitId: string, date: string, note: string) => {
    const newRecord: ReviewRecord = {
      id: crypto.randomUUID(),
      date,
      note
    };

    const updatedRecords = [...(userData[unitId] || []), newRecord];

    if (user) {
      try {
        await setDoc(doc(db, `users/${user.uid}/subjectProgress`, unitId), {
          records: updatedRecords
        });
      } catch (e) {
        console.error('Error saving to Firestore', e);
      }
    } else {
      const updatedData = {
        ...userData,
        [unitId]: updatedRecords
      };
      setUserData(updatedData);
      localStorage.setItem('studyPlanData', JSON.stringify(updatedData));
    }
  };

  const handleReviewVocab = async (vocabId: string) => {
    const currentCount = reviewCounts[vocabId] || 0;
    const newCount = currentCount + 1;

    if (user) {
      try {
        await setDoc(doc(db, `users/${user.uid}/vocabProgress`, vocabId), {
          count: newCount
        });
      } catch (e) {
        console.error('Error saving vocab to Firestore', e);
      }
    } else {
      const updatedCounts = {
        ...reviewCounts,
        [vocabId]: newCount
      };
      setReviewCounts(updatedCounts);
      localStorage.setItem('reviewedVocab', JSON.stringify(updatedCounts));
    }
  };

  const handleSyncLocalToCloud = async () => {
    if (!user) return;
    
    const batch = writeBatch(db);
    
    // Sync subjects
    Object.entries(userData).forEach(([unitId, records]) => {
      const ref = doc(db, `users/${user.uid}/subjectProgress`, unitId);
      batch.set(ref, { records });
    });
    
    // Sync vocab
    Object.entries(reviewCounts).forEach(([vocabId, count]) => {
      const ref = doc(db, `users/${user.uid}/vocabProgress`, vocabId);
      batch.set(ref, { count });
    });
    
    await batch.commit();
    alert('本地資料已同步至雲端！');
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
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
              <CalendarDays className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">
                距離 2027 會考還有 <strong className="text-lg text-indigo-700">{diffDays}</strong> 天
              </span>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                  <span className="text-sm font-medium text-slate-700 hidden sm:inline">{user.displayName}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="登出"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                登入同步
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sync Banner */}
        {!user && Object.keys(userData).length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">您目前有本地儲存的進度，登入後可將資料同步至雲端，防止遺失。</p>
            </div>
            <button 
              onClick={signInWithGoogle}
              className="bg-amber-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
            >
              立即登入同步
            </button>
          </div>
        )}

        {user && localStorage.getItem('studyPlanData') && (
          <div className="mb-6 bg-indigo-50 border border-indigo-200 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-indigo-800">
              <BookMarked className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">偵測到本地有舊資料，是否要將其合併至雲端帳號？</p>
            </div>
            <button 
              onClick={handleSyncLocalToCloud}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
            >
              同步本地資料
            </button>
          </div>
        )}

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
