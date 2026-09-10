import React, { useEffect, useMemo, useState } from 'react';
import { DEMO, choose, consult, createRun, currentRun, getLearning, openToolkit, profile, reflect } from './api.js';

const ROUND_NAMES = ['Design', 'Commit', 'Deliver', 'Adapt', 'Lead under pressure', 'Steward'];
const HEALTH_LABELS = { purpose: 'Purpose', scope: 'Scope', capacity: 'Team capacity', clarity: 'Role clarity', trust: 'Trust', evidence: 'Evidence', time: 'Schedule', budget: 'Budget', adaptive_reserve: 'Adaptive reserve', stakeholder_alignment: 'Stakeholder alignment' };

function Status({ value }) { return <span className={`status status-${String(value).toLowerCase()}`}>{value}</span>; }

function App() {
  const [runId, setRunId] = useState(localStorage.getItem('rl_run_id'));
  const [run, setRun] = useState(null);
  const [learning, setLearning] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [selected, setSelected] = useState('');
  const [confidence, setConfidence] = useState(4);
  const [rationale, setRationale] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const token = null; // production shell should inject Firebase ID token from auth provider

  async function load(id = runId) {
    if (!id) return;
    setBusy(true); setError('');
    try {
      const data = await currentRun(id, token);
      setRun(data);
      if (data.current_decision) setLearning(await getLearning(id, data.current_decision.id, token));
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  useEffect(() => { if (runId) load(runId); }, [runId]);

  async function begin() {
    setBusy(true);
    try { const created = await createRun(token); localStorage.setItem('rl_run_id', created.run_id); setRunId(created.run_id); }
    catch (e) { setError(e.message); setBusy(false); }
  }

  async function useToolkit(id) {
    try { const data = await openToolkit(runId, run.current_decision.id, id, token); setDrawer({ type: 'Learn', ...data.resource }); }
    catch (e) { setError(e.message); }
  }

  async function useConsult(id, label) {
    try { const data = await consult(runId, run.current_decision.id, id, token); setRun(r => ({ ...r, leadership_attention: data.leadership_attention })); setDrawer({ type: 'Consult', title: label, purpose: 'You sought specialist input before deciding. Consultation informs judgement; it does not make the decision for you.', principles: ['Clarify the applicable boundary or process.', 'Return responsibility for the project decision to the Co-Lead.', 'Record material advice where it changes the project plan.'] }); }
    catch (e) { setError(e.message); }
  }

  async function submitDecision() {
    if (!selected) return setError('Choose an option before continuing.');
    setBusy(true); setError('');
    try {
      const result = await choose(runId, run.current_decision.id, selected, { confidence: Number(confidence), rationale: rationale || null }, token);
      setReflectionPrompt(result.reflection_prompt || run.current_decision.reflection || 'What do you notice about the judgement you just made?');
      setReflectionText('');
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  async function submitReflection() {
    setBusy(true);
    try { await reflect(runId, run.current_decision.id, reflectionText, token); setReflectionPrompt(''); setSelected(''); setRationale(''); if (!DEMO) await load(); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  async function openProfile() { setProfileData(await profile(runId, token)); setShowProfile(true); }

  const progress = useMemo(() => run ? Math.round(((run.round || 0) / 5) * 100) : 0, [run]);

  if (!runId) return <main className="welcome"><div className="welcome-card"><p className="eyebrow">RESEARCH LEADERSHIP LAB 01</p><h1>The Project</h1><p className="lede">Can you lead the research when reality stops following the proposal?</p><p>You are a Co-Lead on a 24-month interdisciplinary project. You will make consequential decisions about scope, people, evidence, partners and opportunity as the project changes around you.</p><div className="principle"><strong>This is not a test of personality.</strong><br/>There is rarely one uncomplicated correct answer. The simulation is designed to help you notice how you make trade-offs under pressure.</div><button className="primary" onClick={begin} disabled={busy}>Begin the project</button>{DEMO && <p className="demo">Demo mode · no personal data is being sent</p>}</div></main>;
  if (!run) return <main className="loading">Loading your project…</main>;

  const d = run.current_decision;
  return <div className="app-shell">
    <header className="topbar"><div><p className="eyebrow">RESEARCH LEADERSHIP LAB 01</p><strong>The Project</strong></div><div className="topmeta"><span>Month {run.month}</span><span>Round {(run.round || 0)+1}/6 · {ROUND_NAMES[run.round] || 'Project'}</span><span className="attention">Leadership attention <b>{run.leadership_attention}/10</b></span></div></header>
    <div className="progress"><div style={{width:`${progress}%`}}/></div>
    <main className="cockpit">
      <aside className="health-panel"><h2>Project health</h2><p className="muted">Signals, not scores</p>{Object.entries(run.project_health || {}).map(([k,v]) => <div className="health-row" key={k}><span>{HEALTH_LABELS[k] || k}</span><Status value={v}/></div>)}<button className="secondary full" onClick={openProfile}>Decision profile</button></aside>
      <section className="decision-panel">
        <div className="context"><span className="round-pill">{ROUND_NAMES[run.round]}</span><span>Month {run.month}</span></div>
        <h1>{d?.title || 'Project checkpoint'}</h1><p className="scenario">{d?.prompt || 'Review the project and decide what requires your attention.'}</p>
        {learning && (learning.toolkit?.length || learning.consult?.length) ? <div className="learning-strip"><div><strong>Need more information?</strong><span>Learn or consult before deciding. You do not need to use every resource.</span></div><div className="learning-actions">{learning.toolkit?.map(x => <button key={x.id} onClick={()=>useToolkit(x.id)}>Learn · {x.title}</button>)}{learning.consult?.map(x => <button key={x.id} onClick={()=>useConsult(x.id,x.label)}>Consult · {x.label}</button>)}</div></div> : null}
        <fieldset className="options"><legend>What will you do?</legend>{d?.options?.map(o => <label className={`option ${selected===o.id?'selected':''}`} key={o.id}><input type="radio" name="decision" value={o.id} checked={selected===o.id} onChange={()=>setSelected(o.id)}/><span>{o.label}</span></label>)}</fieldset>
        <div className="decision-notes"><label>How confident are you in this decision? <b>{confidence}/7</b><input aria-label="Decision confidence" type="range" min="1" max="7" value={confidence} onChange={e=>setConfidence(e.target.value)}/></label><label>Why this option? <span className="optional">Optional</span><textarea maxLength="500" value={rationale} onChange={e=>setRationale(e.target.value)} placeholder="Capture the trade-off or assumption behind your decision."/></label></div>
        {error && <div className="error" role="alert">{error}</div>}
        <button className="primary" disabled={busy || !selected} onClick={submitDecision}>{busy?'Saving…':'Make decision'}</button>
      </section>
      <aside className="timeline"><h2>Project timeline</h2>{ROUND_NAMES.map((name,i)=><div className={`timeline-item ${i===run.round?'current':i<run.round?'done':''}`} key={name}><span>{i<run.round?'✓':i+1}</span><div><strong>{name}</strong><small>{['Proposal','Award & mobilisation','Months 3–8','Months 8–13','Months 13–19','Months 19–24+'][i]}</small></div></div>)}</aside>
    </main>
    {drawer && <div className="overlay" onClick={()=>setDrawer(null)}><section className="drawer" role="dialog" aria-modal="true" aria-label={drawer.title} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setDrawer(null)}>Close</button><p className="eyebrow">{drawer.type}</p><h2>{drawer.title}</h2><p>{drawer.purpose}</p><ul>{drawer.principles?.map(p=><li key={p}>{p}</li>)}</ul><div className="principle">Use this information to inform your judgement. The simulation does not reward opening more resources.</div></section></div>}
    {reflectionPrompt && <div className="overlay"><section className="modal" role="dialog" aria-modal="true"><p className="eyebrow">REFLECTION</p><h2>Before the project moves on…</h2><p className="reflection-question">{reflectionPrompt}</p><textarea autoFocus maxLength="800" value={reflectionText} onChange={e=>setReflectionText(e.target.value)} placeholder="What do you notice?"/><button className="primary" disabled={busy || reflectionText.trim().length<10} onClick={submitReflection}>Continue</button></section></div>}
    {showProfile && profileData && <div className="overlay" onClick={()=>setShowProfile(false)}><section className="drawer profile" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowProfile(false)}>Close</button><p className="eyebrow">DEVELOPMENTAL FEEDBACK</p><h2>{profileData.title}</h2><p className="muted">{profileData.disclaimer}</p><h3>Patterns emerging</h3>{profileData.repeated_patterns?.map(x=><p className="profile-point" key={x}>{x}</p>)}<h3>Developmental edge</h3>{profileData.developmental_edges?.map(x=><p className="profile-point" key={x}>{x}</p>)}<div className="principle"><strong>Consider:</strong> {profileData.adaptive_reflection}</div></section></div>}
  </div>;
}

export default App;
