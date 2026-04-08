import { useState } from 'react';
import { QUESTIONS } from '../../data';
import type { UserResponse } from '../../types';
import { Copy, ClipboardCheck, ExternalLink } from 'lucide-react';

export default function Report({ data, userName }: { data: UserResponse[], userName: string }) {
  const [copied, setCopied] = useState(false);

  // NEW STRUCTURED PROMPT FOR BETTER AI ANALYSIS
  const magicPrompt = `Act as a Professional Personality Analyst. 
My name is ${userName}. I have provided a detailed self-reflection mapping my life vision and inner needs against real people I know.

USER DATA FOR ${userName.toUpperCase()}:
${data.map((res, _i) => {
  const qText = QUESTIONS.find(q => q.id === res.questionId)?.text;
  return `[Question]: ${qText}\n[${userName}'s Answer]: ${res.answer}\n[Person Reference]: ${res.realLifeMatch || 'N/A'}`;
}).join('\n\n')}

PLEASE PROVIDE THE REPORT IN THESE 4 SPECIFIC SECTIONS:

1. MY PERSONALITY: Analyze my answers to describe my own personality. What are my core values and how do I approach life?
2. MY EXPECTATIONS: Based on what I wrote, what am I clearly expecting from my relationships and future? What is most important to me?
3. MY IDEAL PARTNER ARCHETYPE: Describe the personality profile of the person I am looking for. What specific "energy" or "vibe" do they need to have to match me?
4. REALITY CHECK & MATCH ANALYSIS: Look at the names I provided (like Charan, Chaitu, etc.). Based on the traits I associated with them, which of these people is the closest match to my requirements? Explain why their personality type is a fit for me.

Note: Address me directly as ${userName} in a warm, insightful, and clear manner.`.trim();

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
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended Platforms</p>
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