import { getFreshIdToken } from './auth.js';

const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:8080').replace(/\/$/, '');
const DEMO = (import.meta.env.VITE_DEMO_MODE || 'true') === 'true';

const demoState = {
  run_id: 'demo-run', status: 'active', simulation_version: 'rl-lab-01-v1', round: 2, month: 6, leadership_attention: 7,
  project_health: { purpose:'Stable',scope:'Strained',capacity:'Strained',clarity:'Stable',trust:'Stable',evidence:'Stable',time:'Strained',budget:'Stable',adaptive_reserve:'Strained',stakeholder_alignment:'Stable' },
  current_decision: { id:'ethics_fieldwork', title:'Twelve firms are ready next Monday', prompt:'Partner access becomes available before the relevant ethics/governance approval is complete.', reflection:'What did you need to know before deciding, and where should that knowledge come from?', options:[{id:'start',label:'Begin interviews while the approval is being finalised because access may disappear.'},{id:'pause_and_resequence',label:'Do not collect data yet; use the window for permitted preparation and resequence activity.'},{id:'consult_then_act',label:'Urgently confirm what is and is not permitted, then proceed only within approved boundaries.'}], toolkit:['ethics','data_management'], consult:['research_ethics','data_protection','research_office'] },
};
const demoToolkit = {
  ethics:{title:'Research ethics and governance',purpose:'Understand the route from research design to proportionate review, approval, amendments, consent, confidentiality and ongoing governance.',principles:['Clarify which institutional and funder requirements apply before collecting data.','Align participant information, consent, recruitment, confidentiality and data handling with the approved design.','Treat material changes as potential amendment triggers.','Keep an auditable record of approvals and consequential decisions.']},
  data_management:{title:'Data management and stewardship',purpose:'Plan lawful, secure and proportionate handling of research data.',principles:['Collect only what is necessary.','Define access, storage, retention and sharing responsibilities.','Distinguish anonymisation from pseudonymisation.','Revisit the plan when methods or partners materially change.']},
};

function errorMessage(body, status) {
  try {
    const parsed = JSON.parse(body);
    if (typeof parsed.detail === 'string') return parsed.detail;
    if (parsed.detail) return JSON.stringify(parsed.detail);
  } catch (_) {}
  return body || `Request failed (${status})`;
}

async function request(path, options = {}) {
  const token = DEMO ? null : await getFreshIdToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    if (!response.ok) throw new Error(errorMessage(text, response.status));
    return text ? JSON.parse(text) : {};
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The server took too long to respond. Your project has not been intentionally advanced; please retry.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function healthCheck() { return request('/health'); }
export async function createRun() { if (DEMO) return {run_id:'demo-run',status:'active'}; return request('/api/v1/research-leadership/runs',{method:'POST'}); }
export async function currentRun(runId) { if (DEMO) return structuredClone(demoState); return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/current`); }
export async function getLearning(runId, decisionId) { if (DEMO) return {toolkit:demoState.current_decision.toolkit.map(id=>({id,...demoToolkit[id]})).filter(x=>x.title),consult:demoState.current_decision.consult.map(id=>({id,label:id.replaceAll('_',' ')}))}; return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/decisions/${encodeURIComponent(decisionId)}/learning`); }
export async function openToolkit(runId, decisionId, resourceId) { if (DEMO) return {resource:{id:resourceId,...demoToolkit[resourceId]}}; return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/decisions/${encodeURIComponent(decisionId)}/toolkit/${encodeURIComponent(resourceId)}`,{method:'POST'}); }
export async function consult(runId, decisionId, supportId) { if (DEMO) return {consultation:supportId,leadership_attention:Math.max(0,demoState.leadership_attention-1)}; return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/decisions/${encodeURIComponent(decisionId)}/consult/${encodeURIComponent(supportId)}`,{method:'POST',body:JSON.stringify({attention_cost:1})}); }
export async function choose(runId, decisionId, optionId, payload) { if (DEMO) return {chosen:optionId,state:demoState,reflection_prompt:demoState.current_decision.reflection}; return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/decisions/${encodeURIComponent(decisionId)}/choose`,{method:'POST',body:JSON.stringify({option_id:optionId,request_id:crypto.randomUUID(),...payload})}); }
export async function reflect(runId, decisionId, reflection) { if (DEMO) return {ok:true}; return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/decisions/${encodeURIComponent(decisionId)}/reflect`,{method:'POST',body:JSON.stringify({reflection})}); }
export async function profile(runId) { if (DEMO) return {title:'Your Research Leadership Decision Profile',disclaimer:'This is a developmental reflection on decisions within this simulation, not a diagnosis or assessment of workplace competence.',repeated_patterns:['You tended to protect evidence quality when procedural uncertainty became consequential.','You sought specialist information before acting where governance boundaries were unclear.'],developmental_edges:['Continue making the opportunity cost of protective decisions explicit, especially when time and capacity are already constrained.'],adaptive_reflection:'Where might the same strength become excessive caution in your real research?',final_project_state:demoState.project_health}; return request(`/api/v1/research-leadership/runs/${encodeURIComponent(runId)}/profile`); }
export { DEMO, API_BASE };
