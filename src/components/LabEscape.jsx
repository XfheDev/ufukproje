import React, { useState } from 'react';
import { equipmentData } from '../data/equipmentData';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Beaker, FlaskConical, TestTube2, Pipette } from 'lucide-react';

const icons = {
  Beaker: <Beaker size={32} />,
  FlaskConical: <FlaskConical size={32} />,
  TestTube2: <TestTube2 size={32} />,
  Pipette: <Pipette size={32} />
};

const LabEscape = ({ setView }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleChoice = (choiceId) => {
    if (choiceId === equipmentData[currentTask].id) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextTask = () => {
    if (currentTask < equipmentData.length - 1) {
      setCurrentTask(currentTask + 1);
      setFeedback(null);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '100px auto', padding: '60px', textAlign: 'center' }}>
        <CheckCircle2 size={80} color="var(--success)" style={{ marginBottom: '24px' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--primary)' }}>Laboratuvardan Kaçıldı!</h2>
        <p style={{ color: 'var(--primary)', marginBottom: '32px', fontWeight: 500 }}>
          Harika iş! Laboratuvar ekipmanları konusundaki uzmanlığınızı kanıtladınız.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setView('menu')}>
            Menüye Dön
          </button>
          <button className="btn btn-secondary" onClick={() => { setCompleted(false); setCurrentTask(0); setFeedback(null); }}>
            Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  const task = equipmentData[currentTask];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div className="glass-card" style={{ padding: '40px', marginBottom: '30px', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
            SEVİYE {currentTask + 1} / {equipmentData.length}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {equipmentData.map((_, i) => (
              <div key={i} style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: i <= currentTask ? 'var(--primary)' : 'rgba(88, 92, 154, 0.1)',
                transition: 'all 0.3s'
              }} />
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', lineHeight: '1.4', color: 'var(--primary)' }}>
          {task.task}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {equipmentData.map((item) => (
            <button
              key={item.id}
              className="btn"
              disabled={feedback !== null}
              style={{
                padding: '30px 20px',
                flexDirection: 'column',
                textAlign: 'center',
                cursor: feedback ? 'default' : 'pointer',
                transition: 'all 0.2s',
                background: feedback === 'correct' && item.id === task.id ? 'var(--success)' : 
                           feedback === 'incorrect' && item.id !== task.id ? 'white' : 'white',
                opacity: feedback && item.id !== task.id && feedback !== 'incorrect' ? 0.5 : 1,
                boxShadow: feedback === 'correct' && item.id === task.id ? 'none' : '4px 4px 0px 0px var(--primary)'
              }}
              onClick={() => handleChoice(item.id)}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '12px' }}>
                {icons[item.icon] || <Beaker size={32} />}
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.name.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="animate-slide-up" style={{ 
          background: feedback === 'correct' ? 'var(--success)' : 'var(--danger)',
          padding: '24px',
          borderRadius: '16px',
          border: `2px solid var(--primary)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {feedback === 'correct' ? <CheckCircle2 color="var(--primary)" /> : <XCircle color="var(--primary)" />}
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--primary)' }}>
                {feedback === 'correct' ? 'Doğru Seçim!' : 'Hatalı Seçim'}
              </strong>
              <span style={{ color: 'var(--primary)', fontWeight: 500 }}>
                {feedback === 'correct' ? task.description : 'Bu görev için özel olarak hangi aletin tasarlandığını düşünün.'}
              </span>
            </div>
          </div>
          {feedback === 'correct' ? (
            <button className="btn btn-primary" onClick={nextTask}>
              Sonraki Senaryo <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btn-secondary" style={{ background: 'white' }} onClick={() => setFeedback(null)}>
              Tekrar Dene <RotateCcw size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LabEscape;
