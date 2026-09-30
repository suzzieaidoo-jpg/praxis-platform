import { getFreshIdToken } from './auth.js';

export const PUZZLE_BACKEND_ENABLED = (import.meta.env.VITE_PUZZLE_BACKEND_ENABLED || 'false') === 'true';
export const PUZZLE_API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:8080').replace(/\/$/, '');

function errorMessage(body,status){
  try{
    const parsed=JSON.parse(body);
    if(typeof parsed.detail==='string') return parsed.detail;
    if(parsed.detail) return JSON.stringify(parsed.detail);
  }catch(_){}
  return body || `Request failed (${status})`;
}

async function request(path,options={}){
  if(!PUZZLE_BACKEND_ENABLED) throw new Error('Research Puzzle backend is disabled.');
  const token=await getFreshIdToken();
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  try{
    const response=await fetch(`${PUZZLE_API_BASE}${path}`,{
      ...options,
      signal:controller.signal,
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`,
        ...(options.headers||{})
      }
    });
    const text=await response.text();
    if(!response.ok) throw new Error(errorMessage(text,response.status));
    return text?JSON.parse(text):{};
  }catch(error){
    if(error.name==='AbortError') throw new Error('The server took too long to respond. Please retry.');
    throw error;
  }finally{
    clearTimeout(timeout);
  }
}

export async function createPuzzleRun(){
  return request('/api/v1/research-puzzle/runs',{method:'POST'});
}

export async function getPuzzleRun(runId){
  return request(`/api/v1/research-puzzle/runs/${encodeURIComponent(runId)}`);
}

export async function savePuzzleDecision(runId,record){
  return request(`/api/v1/research-puzzle/runs/${encodeURIComponent(runId)}/decisions/${encodeURIComponent(record.decisionId)}`,{
    method:'POST',
    body:JSON.stringify({
      option_id:record.optionId,
      reason_id:record.reasonId,
      custom_reason:record.customReason||null,
      reflection:record.reflection||null,
      confidence:record.confidence??null,
      limitation:record.limitation||null,
      request_id:crypto.randomUUID(),
    })
  });
}

export async function savePuzzleFinalReflection(runId,responses){
  return request(`/api/v1/research-puzzle/runs/${encodeURIComponent(runId)}/final-reflection`,{
    method:'POST',
    body:JSON.stringify({responses})
  });
}

export async function getPuzzleProfile(runId){
  return request(`/api/v1/research-puzzle/runs/${encodeURIComponent(runId)}/profile`);
}

export async function savePuzzleTransfer(runId,responses){
  return request(`/api/v1/research-puzzle/runs/${encodeURIComponent(runId)}/transfer`,{
    method:'POST',
    body:JSON.stringify({responses})
  });
}

export function normalizeRemoteState(payload){
  const state=payload?.state||{};
  return {
    index:Number(state.current_index||0),
    records:(state.records||[]).map(r=>({
      decisionId:r.decision_id,
      optionId:r.option_id,
      reasonId:r.reason_id,
      customReason:r.custom_reason||null,
      reflection:r.reflection||'',
      confidence:r.confidence??null,
      limitation:r.limitation||null,
    })),
    finalReflection:state.final_reflection||{},
    status:state.status||payload?.status||'active',
  };
}
