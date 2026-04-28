import React, { useState, useEffect } from 'react';
import { hazardData } from '../data/hazardData';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, Clock, Info } from 'lucide-react';

const HazardHunter = ({ setView, addScore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0 && !feedback) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !feedback) {
      handleChoice(null); // Süre bitti
    }
    return () => clearInterval(timer);
  }, [timeLeft, timerActive, feedback]);

  const handleChoice = (option) => {
    if (feedback) return;
    
    setSelectedOption(option);
    setTimerActive(false);

    if (option === hazardData[currentIndex].correct) {
      setFeedback('correct');
      addScore(10 + timeLeft); // Hız bonusu
    } else {
      setFeedback('incorrect');
    }
  };

  const nextQuestion = () => {
    if (currentIndex < hazardData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback(null);
      setSelectedOption(null);
      setTimeLeft(15);
      setTimerActive(true);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '80px auto', padding: '60px', textAlign: 'center' }}>
        <ShieldAlert size={80} color="var(--primary)" style={{ marginBottom: '24px' }} />
        <h2 className="hero-text" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Görev Tamamlandı</h2>
        <p style={{ color: 'var(--text-main)', marginBottom: '32px', fontSize: '1.2rem', fontWeight: 500 }}>
          Laboratuvar tehlikelerini başarıyla yönettiniz. Güvenlik bilginiz artık en üst seviyede!
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setView('menu')}>
            Ana Menü
          </button>
          <button className="btn btn-secondary" onClick={() => { setCompleted(false); setCurrentIndex(0); setFeedback(null); setSelectedOption(null); setTimeLeft(15); setTimerActive(true); }}>
            Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  const currentHazard = hazardData[currentIndex];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div className="glass-card" style={{ padding: '40px', overflow: 'hidden', position: 'relative', background: 'white' }}>
        {/* Süre Çubuğu */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          height: '6px', 
          width: `${(timeLeft / 15) * 100}%`, 
          background: timeLeft < 5 ? 'var(--danger)' : 'var(--primary)',
          transition: 'width 1s linear'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: 800 }}>
              SENARYO {currentIndex + 1}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: timeLeft < 5 ? 'var(--danger)' : 'var(--primary)', fontWeight: 700 }}>
            <Clock size={20} />
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-main)', padding: '30px', borderRadius: '15px', border: '2px solid var(--primary)', marginBottom: '30px' }}>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'var(--text-main)', fontWeight: 500 }}>
            "{currentHazard.scenario}"
          </p>
        </div>

        <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
          {currentHazard.question}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {currentHazard.options.map((option, i) => (
            <button
              key={i}
              className="btn"
              disabled={feedback !== null}
              style={{
                padding: '20px',
                justifyContent: 'flex-start',
                fontSize: '1.1rem',
                borderWidth: '2px',
                background: selectedOption === option ? (feedback === 'correct' ? 'var(--success)' : 'var(--danger)') : 'white',
                color: 'var(--primary)',
                opacity: feedback && option !== currentHazard.correct && option !== selectedOption ? 0.5 : 1,
                boxShadow: selectedOption === option ? 'none' : '4px 4px 0px 0px var(--primary)'
              }}
              onClick={() => handleChoice(option)}
            >
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                border: '2px solid var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginRight: '12px',
                background: 'white',
                fontSize: '0.9rem',
                fontWeight: 800
              }}>
                {String.fromCharCode(65 + i)}
              </div>
              {option}
            </button>
          ))}
        </div>

        {feedback && (
          <div className="animate-slide-up" style={{ 
            marginTop: '40px', 
            padding: '30px', 
            borderRadius: '15px', 
            border: '2px solid var(--primary)',
            background: feedback === 'correct' ? 'var(--success)' : 'var(--danger)',
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: 'white', padding: '10px', borderRadius: '50%', border: '2px solid var(--primary)' }}>
                {feedback === 'correct' ? <CheckCircle2 color="var(--primary)" size={24} /> : <XCircle color="var(--primary)" size={24} />}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--primary)', fontWeight: 800 }}>
                  {feedback === 'correct' ? 'Harika Karar!' : 'Güvenlik Uyarısı!'}
                </h4>
                <p style={{ fontSize: '1.1rem', color: 'var(--primary)', lineHeight: '1.5', marginBottom: '20px', fontWeight: 500 }}>
                  {currentHazard.explanation}
                </p>
                <button className="btn btn-primary" onClick={nextQuestion}>
                  {currentIndex < hazardData.length - 1 ? 'Sonraki Senaryo' : 'Sonuçları Gör'} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardHunter;
