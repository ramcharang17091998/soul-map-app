import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase'; // Adjust path if your firebase.ts is elsewhere
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { QUESTIONS } from '../../data';
import type { UserResponse } from '../../types';
import { Copy, ClipboardCheck, ExternalLink } from 'lucide-react';

export default function Report({ data, userName }: { data: UserResponse[], userName: string }) {
  const [copied, setCopied] = useState(false);
  const hasSaved = useRef(false); // Prevents double-saving data

  // 1. CONSTRUCT THE UPDATED 27-QUESTION STRUCTURED PROMPT
  const magicPrompt = `Act as a Professional Personality Analyst and Master Life Coach. 
My name is ${userName}. I have completed a 27-step deep-mapping funnel divided into three distinct psychological layers.

### DATA STRUCTURE FOR YOUR ANALYSIS:
- LAYER 1 (THE MIRROR): My internal baseline, emotional triggers, and shadow traits.
- LAYER 2 (THE VISION): My conscious and subconscious expectations in a partner.
- LAYER 3 (THE REALITY): How my current world (real names provided) maps to those expectations.

### COMPLETE DATASET:
${data.map((res) => {
  const qText = QUESTIONS.find(q => q.id === res.questionId)?.text;
  const section = res.type === 'self' ? 'MIRROR' : 'VISION';
  return `[${section}] ${qText}\nAnswer: ${res.answer}${res.realLifeMatch ? `\nReality Reference: ${res.realLifeMatch}` : ''}`;
}).join('\n\n')}

PLEASE PROVIDE THE REPORT IN THESE 4 SPECIFIC SECTIONS:

1. MY PERSONALITY (THE MIRROR): Based on my Stage 1 answers, analyze my core values, emotional patterns, and how I approach life. What defines me?
2. MY EXPECTATIONS (THE VISION): Based on Stage 2, what am I subconsciously and consciously looking for in a partner? Is there a gap between who I AM and what I WANT?
3. MY IDEAL PARTNER ARCHETYPE: Describe the soul profile or "energy" of the person I am looking for. What specific vibe do they need to have to truly match my soul?
4. REALITY CHECK & MATCH ANALYSIS: Look at the names I provided in Layer 3. Based on the traits I associated with them, who is the closest match to my requirements? If I wrote "No one yet" frequently, what does that say about my current standards or environment?

Note: Address me directly as ${userName} in a warm, insightful, and clear manner.`.trim();

  // 2. SAVE TO FIREBASE ON LOAD
  useEffect(() => {
    const logReportToFirebase = async () => {
      if (hasSaved.current) return;
      
      try {
        await addDoc(collection(db, "user_reports"), {
          userName: userName,
          generatedPrompt: magicPrompt,
          timestamp: serverTimestamp(),
          responsesCount: data.length
        });
        hasSaved.current = true;
        console.log("Analytics: Report stored successfully.");
      } catch (error) {
        console.error("Firebase Storage Error:", error);
      }
    };

    logReportToFirebase();
  }, [userName, magicPrompt, data.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(magicPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="report-container animate-in">
      <div className="report-header">
        <h2 className="text-3xl font-black text-slate-900 leading-tight">Done, {userName}! ✨</h2>
        <p className="text-slate-500 text-sm mt-1">Your Blueprint is ready for analysis.</p>
      </div>

      <div className="copy-section">
        <button 
          onClick={handleCopy} 
          className={`copy-btn ${copied ? 'success' : ''}`}
        >
          {copied ? <ClipboardCheck size={22} /> : <Copy size={22} />}
          <span>{copied ? 'Copied Successfully!' : 'Copy Magic Prompt'}</span>
        </button>
      </div>

      <div className="prompt-document">
        <div className="scroll-area custom-scrollbar">
          {magicPrompt}
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Recommended Platforms</p>
        <div className="flex gap-3">
          <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all">
            Open Gemini <ExternalLink size={14}/>
          </a>
          <a href="https://chatgpt.com" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all">
            Open ChatGPT <ExternalLink size={14}/>
          </a>
        </div>
      </div>
    </div>
  );
}