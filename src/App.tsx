import { useState } from 'react';
import StageOne from './components/stage1/StageOne';
import RealityCheck from './components/stage2/RealityCheck';
import Report from './components/stage3/Report';
import { Sparkles } from 'lucide-react';
import type { UserResponse } from './types';

export default function App() {
  const [userName, setUserName] = useState('');
  const [stage, setStage] = useState(0); 
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const goToStage1 = () => {
    if (userName.trim()) setStage(1);
  };

  const goToStage2 = (data: UserResponse[]) => {
    setResponses(data);
    setStage(2);
    window.scrollTo(0, 0);
  };

  const goToStage3 = (finalData: UserResponse[]) => {
    setResponses(finalData);
    setStage(3);
    window.scrollTo(0, 0);
  };

  // --- STAGE 0: FIXED ALIGNMENT ---
  if (stage === 0) {
    return (
      <div className="welcome-screen">
        <div className="welcome-card animate-in">
          <div className="brand-icon">
            <Sparkles size={40} />
          </div>

          <h1 className="brand-title">Soul Map</h1>
          <p className="brand-subtitle">Archetype & Personality Discovery</p>

          <div className="name-input-box">
            <label>How should the AI address you?</label>
            <input 
              type="text" 
              placeholder="Your name..."
              value={userName}
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goToStage1()}
            />
          </div>
          
          <button 
            disabled={!userName.trim()}
            onClick={goToStage1}
            className="main-btn"
          >
            Start Discovery ➔
          </button>

          <div className="footer-tags">
            <span>Private</span>
            <span>•</span>
            <span>Insightful</span>
            <span>•</span>
            <span>Personal</span>
          </div>
        </div>
      </div>
    );
  }

  // --- STAGES 1, 2, 3: APP SHELL ---
  return (
    <div className="app-shell">
      {stage === 1 && <StageOne onComplete={goToStage2} />}
      {stage === 2 && <RealityCheck responses={responses} onComplete={goToStage3} />}
      {stage === 3 && <Report data={responses} userName={userName} />}
    </div>
  );
}