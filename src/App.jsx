import React, { useEffect, useMemo, useState } from 'react';
import { SIMULATION_META, INITIAL_CONTEXT, DECISIONS, FINAL_REFLECTION, composeFeedback, buildProfile, optionFor, reasonsFor } from './researchPuzzle.js';
import { PUZZLE_BACKEND_ENABLED, createPuzzleRun, getPuzzleRun, savePuzzleDecision, savePuzzleFinalReflection, getPuzzleProfile, savePuzzleTransfer, normalizeRemoteState } from './puzzleApi.js';
import { firebaseConfigured } from './auth.js';

function App(){
  const saved = (()=>{try{return JSON.parse(localStorage.getItem('research_puzzle_progress')||'null')}catch{return null}})();
  const [started,setStarted]=useState(saved?.started||false);
  const [runId,setRunId]=useState(saved?.runId||null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [serverProfile,setServerProfile]=useState(null);
  const [index,setIndex]=useState(saved?.index||0);
  const [phase,setPhase]=useState('decision');
  const [optionId,setOptionId]=useState('');
  const [reasonId,setReasonId]=useState('');
  const [reflection,setReflection]=useState('');
  const [confidence,setConfidence]=useState(4);
  const [limitation,setLimitation]=useState('');
  const [records,setRecords]=useState(saved?.records||[]);
  const [finalReflection,setFinalReflection]=useState(saved?.finalReflection||{priorities:[],reconsider:'',difficult:'',difficultWhy:'',recurring:'',changed:'',changedWhy:'',ownResearch:'',supportingEvidence:'',challengingEvidence:'',alternative:'',missing:'',next:''});
  const [customReason,setCustomReason]=useState('');

  const decision=DECISIONS[index];
  const option=decision && optionFor(decision,optionId);
  const reason=option?.reasons.find(r=>r[0]===reasonId);
  const feedback=decision&&optionId&&reasonId?composeFeedback(decision,optionId,reasonId):null;
  const progress=started?Math.round((index/DECISIONS.length)*100):0;

  useEffect(()=>{
    localStorage.setItem('research_puzzle_progress',JSON.stringify({started,index,records,finalReflection,runId}));
  },[started,index,records,finalReflection,runId]);

  useEffect(()=>{
    if(!PUZZLE_BACKEND_ENABLED||!runId) return;
    let cancelled=false;
    (async()=>{
      try{
        const remote=normalizeRemoteState(await getPuzzleRun(runId));
        if(cancelled) return;
        if(remote.records.length>=records.length){setRecords(remote.records);setIndex(Math.min(remote.index,DECISIONS.length-1));}
        if(remote.finalReflection&&Object.keys(remote.finalReflection).length){setFinalReflection(f=>({...f,...remote.finalReflection}));}
      }catch(e){if(!cancelled)setError(`Could not restore the secure session: ${e.message}`);}
    })();
    return ()=>{cancelled=true;};
  },[runId]);

  function resetDecision(){
    setOptionId(''); setReasonId(''); setReflection(''); setConfidence(4); setLimitation(''); setCustomReason('');
  }

  function chooseOption(id){
    setOptionId(id); setReasonId(''); setReflection(''); setLimitation('');
  }

  function continueFromDecision(){
    if(!optionId) return;
    setPhase('reason');
  }

  function continueFromReason(){
    if(!reasonId) return;
    setPhase('reflection');
  }

  async function saveReflection(){
    const rec={decisionId:decision.id,optionId,reasonId,customReason:reasonId==='other'?customReason:null,reflection,confidence:decision.confidence?Number(confidence):null,limitation:decision.limitation?limitation:null};
    setBusy(true); setError('');
    try{
      if(PUZZLE_BACKEND_ENABLED){
        if(!runId) throw new Error('No secure run is available.');
        await savePuzzleDecision(runId,rec);
      }
      setRecords(prev=>[...prev.filter(r=>r.decisionId!==decision.id),rec]);
      setPhase('feedback');
    }catch(e){setError(e.message);}
    finally{setBusy(false);}
  }

  function nextDecision(){
    if(index===DECISIONS.length-1){
      setPhase('finalReflection');
      return;
    }
    setIndex(i=>i+1);
    resetDecision();
    setPhase('decision');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  const localProfile=useMemo(()=>buildProfile(records,finalReflection),[records,finalReflection]);
  const profile=serverProfile?{
    priorities:(serverProfile.priorities||[]).map(x=>typeof x==='string'?x:x.text),
    strengths:(serverProfile.strengths||[]).map(x=>({title:x.title||'Pattern across your decisions',text:x.text})),
    developmentOverTime:serverProfile.development_over_time||'',
    development:serverProfile.consideration?.text||null,
    finalQuestion:serverProfile.question
  }:localProfile;

  async function beginSimulation(){
    setBusy(true);setError('');
    try{
      if(PUZZLE_BACKEND_ENABLED){
        if(!firebaseConfigured) throw new Error('Secure mode is enabled but Firebase is not configured.');
        if(!runId){
          const created=await createPuzzleRun();
          setRunId(created.run_id);
        }
      }
      setStarted(true);
    }catch(e){setError(e.message);}
    finally{setBusy(false);}
  }

  async function openProfile(){
    setBusy(true);setError('');
    try{
      if(PUZZLE_BACKEND_ENABLED){
        await savePuzzleFinalReflection(runId,finalReflection);
        setServerProfile(await getPuzzleProfile(runId));
      }
      setPhase('profile');
    }catch(e){setError(e.message);}
    finally{setBusy(false);}
  }

  async function saveTransfer(){
    setBusy(true);setError('');
    try{
      if(PUZZLE_BACKEND_ENABLED){
        await savePuzzleTransfer(runId,{
          ownResearch:finalReflection.ownResearch,
          supportingEvidence:finalReflection.supportingEvidence,
          challengingEvidence:finalReflection.challengingEvidence,
          alternative:finalReflection.alternative,
          missing:finalReflection.missing,
          next:finalReflection.next,
        });
      }
    }catch(e){setError(e.message);}
    finally{setBusy(false);}
  }

  if(!started){
    return <main className="welcome">
      <section className="welcome-card">
        <p className="eyebrow">{SIMULATION_META.lab}</p>
        <h1>{SIMULATION_META.title}</h1>
        <p className="lede">{SIMULATION_META.subtitle}</p>
        <p>Research questions often change as a study develops. New evidence may support an initial explanation, complicate it or show that the original question needs to be reconsidered.</p>
        <div className="principle">
          <strong>Approximate time:</strong> {SIMULATION_META.duration}<br/>
          <strong>Format:</strong> Individual online simulation
        </div>
        <p>You will receive information in stages and make eight research decisions. At several points, you will be asked why you made a choice before seeing what can be learned from it.</p>
        <p>There is no overall score. Your final Research Decision Profile reflects patterns across your decisions and reflections within this simulation.</p>
        <button className="primary" disabled={busy} onClick={beginSimulation}>{busy?'Preparing…':saved?.started?'Resume the simulation':'Begin the simulation'}</button>
        {saved?.started&&<button className="text-button" onClick={()=>{localStorage.removeItem('research_puzzle_progress');location.reload();}}>Start again</button>}
        {error&&<div className="error" role="alert">{error}</div>}
        <p className="demo">{PUZZLE_BACKEND_ENABLED?'Secure save is enabled.':'Development mode: progress is stored only in this browser.'}</p>
      </section>
    </main>;
  }

  if(phase==='finalReflection'){
    return <div className="sim-shell">
      <Header progress={100} label="Final reflection"/>
      <main className="sim-main narrow">
        <section className="card">
          <p className="eyebrow">BEFORE YOU SEE YOUR PROFILE</p>
          <h1>Looking across your decisions</h1>
          <p>You have now made eight decisions about evidence, explanation, uncertainty and the development of the study. Consider the reasoning that guided them before reviewing the profile.</p>

          <Question title="What were you most often trying to achieve?">
            <div className="check-grid">
              {FINAL_REFLECTION.priorities.map(p=><label key={p} className="check-option"><input type="checkbox" checked={finalReflection.priorities.includes(p)} onChange={e=>{
                const next=e.target.checked?[...finalReflection.priorities,p]:finalReflection.priorities.filter(x=>x!==p);
                if(next.length<=3)setFinalReflection(f=>({...f,priorities:next}));
              }}/><span>{p}</span></label>)}
            </div>
          </Question>

          <Question title="What was most likely to make you reconsider an explanation?">
            <select value={finalReflection.reconsider} onChange={e=>setFinalReflection(f=>({...f,reconsider:e.target.value}))}>
              <option value="">Select one</option>
              {FINAL_REFLECTION.reconsider.map(x=><option key={x}>{x}</option>)}
            </select>
          </Question>

          <Question title="Which decision did you find most difficult?">
            <select value={finalReflection.difficult} onChange={e=>setFinalReflection(f=>({...f,difficult:e.target.value}))}>
              <option value="">Select one</option>
              {DECISIONS.map(d=><option key={d.id} value={d.id}>{d.label}: {d.title}</option>)}
            </select>
            <textarea placeholder="What made it difficult?" value={finalReflection.difficultWhy} onChange={e=>setFinalReflection(f=>({...f,difficultWhy:e.target.value}))}/>
          </Question>

          <Question title="Did you notice yourself returning to any particular consideration when making decisions?">
            <textarea value={finalReflection.recurring} onChange={e=>setFinalReflection(f=>({...f,recurring:e.target.value}))}/>
          </Question>

          <Question title="Has the way you approached the research problem changed during the simulation?">
            <select value={finalReflection.changed} onChange={e=>setFinalReflection(f=>({...f,changed:e.target.value}))}>
              <option value="">Select one</option><option>Yes</option><option>No</option><option>I am not sure</option>
            </select>
            {finalReflection.changed&&<textarea placeholder={finalReflection.changed==='Yes'?'What changed?':finalReflection.changed==='No'?'What remained consistent?':'Is there a decision you would now approach differently?'} value={finalReflection.changedWhy} onChange={e=>setFinalReflection(f=>({...f,changedWhy:e.target.value}))}/>}
          </Question>

          <button className="primary" disabled={busy} onClick={openProfile}>{busy?'Preparing profile…':'See my Research Decision Profile'}</button>
          {error&&<div className="error" role="alert">{error}</div>}
        </section>
      </main>
    </div>;
  }

  if(phase==='profile'){
    return <div className="sim-shell">
      <Header progress={100} label="Research Decision Profile"/>
      <main className="sim-main narrow">
        <section className="card profile-card">
          <p className="eyebrow">YOUR RESEARCH DECISION PROFILE</p>
          <h1>What your decisions suggest</h1>
          <p className="muted">This profile reflects decisions you made in this simulation and the reasons you gave for them. It is intended to support reflection on your research practice. It is not an assessment of your overall ability as a researcher.</p>

          <h2>What you tended to prioritise</h2>
          {profile.priorities.map((p,i)=><p className="profile-point" key={i}>{p}</p>)}

          {profile.strengths.length>0&&<>
            <h2>Strengths visible across your decisions</h2>
            {profile.strengths.map((s,i)=><div className="profile-section" key={i}><h3>{s.title}</h3><p>{s.text}</p></div>)}
          </>}

          {profile.developmentOverTime&&<>
            <h2>How your approach developed</h2>
            <p className="profile-point">{profile.developmentOverTime}</p>
          </>}

          {profile.development&&<>
            <h2>Something you may want to consider</h2>
            <p className="profile-point">{profile.development}</p>
          </>}

          <div className="principle"><strong>A question for your own research</strong><br/>{profile.finalQuestion}</div>

          <h2>Apply this to your own research</h2>
          <Question title="What do you currently think is happening?"><textarea value={finalReflection.ownResearch} onChange={e=>setFinalReflection(f=>({...f,ownResearch:e.target.value}))}/></Question>
          <Question title="What evidence gives you confidence in that explanation?"><textarea value={finalReflection.supportingEvidence} onChange={e=>setFinalReflection(f=>({...f,supportingEvidence:e.target.value}))}/></Question>
          <Question title="What evidence would make you reconsider it?"><textarea value={finalReflection.challengingEvidence} onChange={e=>setFinalReflection(f=>({...f,challengingEvidence:e.target.value}))}/></Question>
          <Question title="Is there another plausible explanation that deserves more attention?"><textarea value={finalReflection.alternative} onChange={e=>setFinalReflection(f=>({...f,alternative:e.target.value}))}/></Question>
          <Question title="Is a perspective or form of evidence currently missing?"><textarea value={finalReflection.missing} onChange={e=>setFinalReflection(f=>({...f,missing:e.target.value}))}/></Question>
          <Question title="In the next two weeks, I will…"><textarea value={finalReflection.next} onChange={e=>setFinalReflection(f=>({...f,next:e.target.value}))}/></Question>

          <button className="primary" disabled={busy} onClick={saveTransfer}>{busy?'Saving…':'Save my next step'}</button>
          {error&&<div className="error" role="alert">{error}</div>}
          <div className="end-note">The purpose of the simulation is to make research decisions more visible so that you can examine the reasoning behind them and consider how similar decisions arise in your own work.</div>
        </section>
      </main>
    </div>;
  }

  return <div className="sim-shell">
    <Header progress={progress} label={decision.label}/>
    <main className="sim-main">
      <aside className="context-panel">
        <p className="eyebrow">CURRENT STAGE</p>
        <h2>{decision.stage}</h2>
        <div className="decision-map">
          {DECISIONS.map((d,i)=><div className={`map-row ${i===index?'current':i<index?'done':''}`} key={d.id}><span>{i<index?'✓':i+1}</span><small>{d.stage}</small></div>)}
        </div>
      </aside>

      <section className="card decision-card">
        {index===0&&<InitialContext/>}
        <p className="eyebrow">{decision.evidenceTitle}</p>
        <div className="evidence-block">{decision.evidence.map((p,i)=><p key={i}>{p}</p>)}</div>

        {phase==='decision'&&<>
          <div className="section-rule"/>
          <p className="eyebrow">{decision.label}</p>
          <h1>{decision.title}</h1>
          <p className="prompt">{decision.prompt}</p>
          <div className="options">
            {decision.options.map(o=><button key={o.id} className={`option-card ${optionId===o.id?'selected':''}`} onClick={()=>chooseOption(o.id)}><span className="option-letter">{o.id.toUpperCase()}</span><span>{o.label}</span></button>)}
          </div>
          <button className="primary" disabled={!optionId} onClick={continueFromDecision}>Continue</button>
        </>}

        {phase==='reason'&&option&&<>
          <div className="section-rule"/>
          <p className="eyebrow">LOOKING BACK AT YOUR DECISION</p>
          <h1>Why did you choose this approach?</h1>
          <div className="selected-choice"><strong>Your decision</strong><p>{option.label}</p></div>
          <p className="prompt">Choose the response that comes closest to your reasoning.</p>
          <div className="reason-list">{reasonsFor(option).map(r=><label className={`reason-option ${reasonId===r[0]?'selected':''}`} key={r[0]}><input type="radio" name="reason" checked={reasonId===r[0]} onChange={()=>setReasonId(r[0])}/><span>{r[1]}</span></label>)}</div>
          {reasonId==='other'&&<textarea className="large-textarea" placeholder="Briefly explain the reason for your decision." value={customReason} onChange={e=>setCustomReason(e.target.value)}/>}
          <button className="primary" disabled={!reasonId||(reasonId==='other'&&customReason.trim().length<5)} onClick={continueFromReason}>Continue</button>
        </>}

        {phase==='reflection'&&<>
          <div className="section-rule"/>
          <p className="eyebrow">REFLECTION</p>
          <h1>Before you see what your decision suggests</h1>
          <p className="prompt">{decision.reflection}</p>
          <textarea className="large-textarea" value={reflection} onChange={e=>setReflection(e.target.value)} placeholder="Write a short response. This is for your reflection, not for assessment."/>

          {decision.confidence&&<div className="confidence-block"><label>How confident are you in your current view? <strong>{confidence}/7</strong></label><input type="range" min="1" max="7" value={confidence} onChange={e=>setConfidence(e.target.value)}/></div>}

          {decision.limitation&&<Question title="What is the most important limitation on the conclusion you selected?">
            <select value={limitation} onChange={e=>setLimitation(e.target.value)}>
              <option value="">Select one</option>
              <option>The number of organisations.</option>
              <option>Differences between the organisations.</option>
              <option>Uncertainty about cause and effect.</option>
              <option>Reliance on particular forms of evidence.</option>
              <option>Possible alternative explanations.</option>
              <option>Uncertainty about whether the findings apply elsewhere.</option>
              <option>I do not think there is a major limitation.</option>
            </select>
          </Question>}

          <button className="primary" disabled={busy} onClick={saveReflection}>{busy?'Saving…':'See what this decision suggests'}</button>
          {error&&<div className="error" role="alert">{error}</div>}
        </>}

        {phase==='feedback'&&feedback&&<>
          <div className="section-rule"/>
          <p className="eyebrow">{feedback.heading}</p>
          <h1>{decision.title}</h1>
          <div className="feedback-section"><h2>What your decision allows you to examine</h2><p>{feedback.value}</p></div>
          <div className="feedback-section"><h2>Why your reason matters</h2><p>{feedback.reason}</p></div>
          <div className="feedback-section"><h2>What to keep in mind</h2><p>{feedback.consider}</p></div>
          <div className="transition-box"><strong>Moving forward</strong><p>{feedback.transition}</p></div>
          <button className="primary" onClick={nextDecision}>{index===DECISIONS.length-1?'Continue to final reflection':'Continue to the next stage'}</button>
        </>}
      </section>

      <aside className="research-note">
        <p className="eyebrow">RESEARCH NOTE</p>
        <p>The information is deliberately incomplete. Your task is to decide what the evidence allows you to do next, not to find a hidden correct answer.</p>
      </aside>
    </main>
  </div>;
}

function Header({progress,label}){
  return <><header className="topbar"><div><p className="eyebrow">{SIMULATION_META.lab}</p><strong>{SIMULATION_META.title}</strong></div><div className="topmeta"><span>{label}</span><span>{SIMULATION_META.duration}</span></div></header><div className="progress"><div style={{width:`${progress}%`}}/></div></>;
}

function Question({title,children}){
  return <div className="question-block"><label>{title}</label>{children}</div>;
}

function InitialContext(){
  return <section className="initial-context">
    <p className="eyebrow">{INITIAL_CONTEXT.heading}</p>
    {INITIAL_CONTEXT.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
    <div className="comparison-table">
      <div className="tr head"><div></div><div>Northbridge</div><div>Westford</div></div>
      {INITIAL_CONTEXT.comparison.map((r,i)=><div className="tr" key={i}><div>{r[0]}</div><div>{r[1]}</div><div>{r[2]}</div></div>)}
    </div>
    <p className="note">{INITIAL_CONTEXT.note}</p>
  </section>;
}

export default App;
