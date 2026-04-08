import { useState } from 'react';
import StageOne from './components/stage1/StageOne';
import RealityCheck from './components/stage2/RealityCheck';
import Report from './components/stage3/Report';
import { Sparkles } from 'lucide-react';
import { QUESTIONS } from './data';
import type { UserResponse } from './types';

export default function App() {
  const [userName, setUserName] = useState('');
  const [stage, setStage] = useState(0); 
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const selfQuestions = QUESTIONS.filter(q => q.type === 'self');
  const partnerQuestions = QUESTIONS.filter(q => q.type === 'partner');

  const startApp = () => userName.trim() && setStage(1);

  const handleSelfDone = (selfData: UserResponse[]) => {
    setResponses(selfData);
    setStage(2);
    window.scrollTo(0, 0);
  };

  const handlePartnerDone = (partnerData: UserResponse[]) => {
    // Merge Stage 1 and Stage 2 responses
    setResponses((prev) => [...prev, ...partnerData]);
    setStage(3);
    window.scrollTo(0, 0);
  };

  const handleRealityDone = (finalData: UserResponse[]) => {
    setResponses(finalData);
    setStage(4);
    window.scrollTo(0, 0);
  };

  if (stage === 0) {
    return (
      <div className="welcome-screen">
        <div className="welcome-card animate-in">
          <div className="brand-icon"><Sparkles size={40} /></div>
          <h1 className="brand-title">Soul Map</h1>
          <p className="brand-subtitle">Discovery of Archetypes</p>
          <div className="name-input-box">
            <label>How should the AI address you?</label>
            <input 
              type="text" placeholder="Your name..." value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startApp()}
            />
          </div>
          <button onClick={startApp} className="main-btn" disabled={!userName.trim()}>Start Journey ➔</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {stage === 1 && (
        <StageOne 
          questions={selfQuestions} 
          title="Part 1: The Mirror" 
          subtitle="Self-reflection and internal patterns"
          onComplete={handleSelfDone} 
        />
      )}
      
      {stage === 2 && (
        <StageOne 
          questions={partnerQuestions} 
          title="Part 2: The Vision" 
          subtitle="Your expectations and needs"
          onComplete={handlePartnerDone} 
        />
      )}
      
      {stage === 3 && (
        <RealityCheck 
          responses={responses.filter(r => r.type === 'partner')} 
          fullResponses={responses}
          onComplete={handleRealityDone} 
        />
      )}
      
      {stage === 4 && <Report data={responses} userName={userName} />}
    </div>
  );
}