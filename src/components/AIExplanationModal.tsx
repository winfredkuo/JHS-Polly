import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Loader2, AlertCircle, BookOpen, Repeat, ArrowRightLeft } from 'lucide-react';
import { getVocabExplanation, AIExplanation } from '../services/aiService';
import { motion, AnimatePresence } from 'motion/react';

interface AIExplanationModalProps {
  word: string;
  onClose: () => void;
}

export function AIExplanationModal({ word, onClose }: AIExplanationModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AIExplanation | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await getVocabExplanation(word);
        setData(result);
      } catch (err: any) {
        setError(err.message || '發生錯誤，請稍後再試');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [word]);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{word}</h2>
              <p className="text-indigo-100 text-sm font-medium">AI 深度解析</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">AI 正在為您整理重點...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <div className="bg-rose-50 p-4 rounded-full">
                <AlertCircle className="w-12 h-12 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">哎呀！出了一點問題</h3>
              <p className="text-slate-600 max-w-xs">{error}</p>
              <button 
                onClick={onClose}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                我知道了
              </button>
            </div>
          ) : data && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Word Forms */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-slate-800">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-lg">詞性與變化 ({data.partOfSpeech})</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(data.forms).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                      <p className="font-bold text-slate-700">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Examples */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2 text-slate-800">
                  <Repeat className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-lg">精選例句</h3>
                </div>
                {data.examples.map((ex, idx) => (
                  <div key={idx} className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-3xl relative group">
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => playAudio(ex.en)}
                        className="p-2 bg-white text-indigo-600 rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all"
                        title="播放發音"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-indigo-200 text-indigo-700 text-[10px] font-black rounded-md uppercase tracking-tighter mb-3">
                      {ex.type === 'dialogue' ? '生活對話' : '挑戰閱讀'}
                    </span>
                    <p className="text-slate-800 font-bold text-lg leading-snug mb-2 pr-10">{ex.en}</p>
                    <p className="text-slate-500 font-medium">{ex.zh}</p>
                  </div>
                ))}
              </section>

              {/* Related Words */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-800">
                    <ArrowRightLeft className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold">同義詞</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.synonyms.map(word => (
                      <span key={word} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-800">
                    <ArrowRightLeft className="w-5 h-5 text-rose-600" />
                    <h3 className="font-bold">反義詞</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.antonyms.map(word => (
                      <span key={word} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-sm font-bold border border-rose-100">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
          >
            關閉視窗
          </button>
        </div>
      </motion.div>
    </div>
  );
}
