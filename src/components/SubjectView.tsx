import React, { useState, useEffect } from 'react';
import { curriculum, Subject, Book, Unit } from '../data/curriculum';
import { format } from 'date-fns';
import { CheckCircle2, Plus, Calendar, MessageSquare, ChevronDown, ChevronRight, FileText, Upload, Loader2 } from 'lucide-react';
import { auth, db, storage } from '../firebase';
import { collection, doc, getDocs, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ReviewRecord {
  id: string;
  date: string;
  note: string;
}

export interface UserData {
  [unitId: string]: ReviewRecord[];
}

interface UnitMetadata {
  pdfUrl?: string;
  manualNoteUrl?: string;
  updatedAt: string;
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
  
  // Unit Metadata (PDF URLs)
  const [unitMetadata, setUnitMetadata] = useState<Record<string, UnitMetadata>>({});
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const isAdmin = auth.currentUser?.email === 'theoder@gmail.com';

  useEffect(() => {
    // Listen for unit metadata changes
    const unsubscribe = onSnapshot(collection(db, 'unit_metadata'), (snapshot) => {
      const metadata: Record<string, UnitMetadata> = {};
      snapshot.forEach((doc) => {
        metadata[doc.id] = doc.data() as UnitMetadata;
      });
      setUnitMetadata(metadata);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (unitId: string, file: File, noteType: 'ai' | 'manual') => {
    if (!isAdmin) {
      alert('您沒有管理員權限，無法上傳。');
      return;
    }
    
    // Check file size (limit to 20MB for safety)
    if (file.size > 20 * 1024 * 1024) {
      alert(`檔案過大 (${(file.size / 1024 / 1024).toFixed(1)}MB)，請先壓縮至 20MB 以下再上傳。`);
      return;
    }

    const uploadId = `${unitId}-${noteType}`;
    setIsUploading(uploadId);
    console.log(`Starting upload for ${unitId} (${noteType})...`);
    
    try {
      // 1. Upload to Storage (overwrites if same path)
      const storageRef = ref(storage, `unit_notes/${unitId}_${noteType}.pdf`);
      console.log('Storage reference created:', storageRef.fullPath);
      
      const uploadResult = await uploadBytes(storageRef, file);
      console.log('Upload bytes completed:', uploadResult.metadata.fullPath);
      
      // 2. Get Download URL
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadUrl);
      
      // 3. Update Firestore
      const fieldToUpdate = noteType === 'ai' ? 'pdfUrl' : 'manualNoteUrl';
      await setDoc(doc(db, 'unit_metadata', unitId), {
        [fieldToUpdate]: downloadUrl,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      alert(`${noteType === 'ai' ? 'AI 智能導讀' : '手寫精華筆記'} 上傳成功！`);
    } catch (error: any) {
      console.error('Upload failed with error:', error);
      let errorMsg = '上傳失敗。';
      
      if (error.code === 'storage/unauthorized') {
        errorMsg = '上傳失敗：權限不足。請檢查 Firebase Storage 規則。';
      } else if (error.code === 'storage/canceled') {
        errorMsg = '上傳已取消。';
      } else if (error.message) {
        errorMsg = `上傳失敗：${error.message}`;
      }
      
      alert(errorMsg);
    } finally {
      setIsUploading(null);
    }
  };

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
                      const metadata = unitMetadata[unit.id];

                      return (
                        <div key={unit.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 ${hasReviewed ? 'text-emerald-500' : 'text-slate-300'}`}>
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="font-medium text-slate-800">{unit.title}</div>
                                {hasReviewed && (
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] sm:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {records[records.length - 1].date}
                                    </span>
                                    {records[records.length - 1].note && (
                                      <span className="text-[10px] sm:text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        {records[records.length - 1].note}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              {/* PDF Note Links */}
                              {metadata && (
                                <div className="mt-2 flex flex-wrap gap-3">
                                  {metadata.pdfUrl && (
                                    <a 
                                      href={metadata.pdfUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50/50 px-2 py-1 rounded-md"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      🤖 AI 智能導讀
                                    </a>
                                  )}
                                  {metadata.manualNoteUrl && (
                                    <a 
                                      href={metadata.manualNoteUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50/50 px-2 py-1 rounded-md"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      ✍️ 手寫精華筆記
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {/* Admin Upload Buttons */}
                            {isAdmin && (
                              <div className="flex items-center gap-2">
                                {/* AI Note Upload */}
                                <div className="relative">
                                  <input 
                                    type="file" 
                                    accept=".pdf"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleFileUpload(unit.id, file, 'ai');
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={!!isUploading}
                                  />
                                  <button
                                    title="上傳 AI 智能導讀"
                                    className={`flex items-center gap-1 px-2 py-1.5 text-[10px] font-medium rounded-lg transition-colors ${
                                      isUploading === `${unit.id}-ai`
                                        ? 'bg-indigo-100 text-indigo-400' 
                                        : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                                    }`}
                                  >
                                    {isUploading === `${unit.id}-ai` ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <Upload className="w-3.5 h-3.5" />
                                    )}
                                    AI 導讀
                                  </button>
                                </div>

                                {/* Manual Note Upload */}
                                <div className="relative">
                                  <input 
                                    type="file" 
                                    accept=".pdf"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleFileUpload(unit.id, file, 'manual');
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={!!isUploading}
                                  />
                                  <button
                                    title="上傳 手寫精華筆記"
                                    className={`flex items-center gap-1 px-2 py-1.5 text-[10px] font-medium rounded-lg transition-colors ${
                                      isUploading === `${unit.id}-manual`
                                        ? 'bg-emerald-100 text-emerald-400' 
                                        : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                                    }`}
                                  >
                                    {isUploading === `${unit.id}-manual` ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <Upload className="w-3.5 h-3.5" />
                                    )}
                                    手寫筆記
                                  </button>
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => setSelectedUnit(unit)}
                              className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              新增複習紀錄
                            </button>
                          </div>
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
