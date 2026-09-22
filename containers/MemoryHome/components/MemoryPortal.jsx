import { useEffect, useRef, useState } from 'react';
import { agentLogos } from '../data/agentLogos';

const pairs = [
  ['Claude','Codex'], ['Claude','ChatGPT'], ['Codex','Claude Desktop'],
  ['ChatGPT','Gemini'], ['Gemini','Cursor'], ['Cursor','Windsurf'],
  ['Windsurf','Cline'], ['Cline','Roo Code'], ['Roo Code','Goose'],
  ['Goose','GitHub Copilot'], ['GitHub Copilot','Continue'], ['Continue','Aider'],
  ['Aider','OpenHands'], ['OpenHands','CrewAI'], ['CrewAI','AutoGen'],
  ['AutoGen','LangGraph'], ['LangGraph','Replit Agent'], ['Replit Agent','Devin'],
  ['Devin','OpenCode'], ['OpenCode','Claude Code'], ['Claude Code','Claude'],
];
const memories = ['Preferences', 'Project state', 'Decisions', 'Files'];

function Workspace({ name, restored }) {
  return <div className={`mp-window ${restored ? 'mp-destination' : 'mp-source'}`}>
    <header><span className="mp-monogram"><img src={agentLogos[name]} alt={`${name} logo`} width="26" height="26" /></span><strong>{name}</strong><span className="mp-window-menu">···</span></header>
    <div className="mp-window-body">
      <span className="mp-metadata">{restored ? 'CONTEXT RESTORED' : 'CURRENT THREAD'}</span>
      <div className="mp-chat"><span className="mp-avatar" /><div><i /><i /><i /></div></div>
      <div className="mp-memory"><span>Project brief</span><strong>Pick up the thread.</strong><div className="mp-lines"><i/><i/></div></div>
      <div className="mp-context-list">{memories.map((m,i)=><div key={m} style={{'--order':i}}><span>{restored ? '✓' : '◇'}</span>{m}</div>)}</div>
      <div className="mp-input">{restored ? 'Ready to continue' : 'Keep this context'}<span>↗</span></div>
    </div>
  </div>;
}

export default function MemoryPortal({ motionDisabled }) {
  const [index,setIndex]=useState(0), [paused,setPaused]=useState(false), [visible,setVisible]=useState(false);
  const ref=useRef(null);
  const stopped=motionDisabled || paused || !visible;
  useEffect(()=>{const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:0.15});observer.observe(ref.current);return()=>observer.disconnect();},[]);
  useEffect(()=>{if(stopped)return;const timer=setInterval(()=>setIndex(i=>(i+1)%pairs.length),7200);return()=>clearInterval(timer);},[stopped,index]);
  const [from,to]=pairs[index];
  return <div ref={ref} className={`continuity-visual memory-portal ${stopped?'mp-paused':''}`}>
    <div className="mp-topline"><span>SAME THREAD. NEW MIND.</span><span className="mp-counter">{String(index+1).padStart(2,'0')} / {pairs.length}</span></div>
    <div className="mp-scene" key={index} aria-label={`Illustrative memory handoff from ${from} to ${to}`}>
      <Workspace name={from}/>
      <div className="mp-bridge" aria-hidden="true"><div className="mp-halo"/><div className="mp-halo mp-halo-inner"/><div className="mp-beam"/>{memories.map((m,i)=><span className="mp-fragment" key={m} style={{'--order':i}}>{m}</span>)}<span className="mp-core"><img src="/memory/lighthouse-mark.svg" alt="" width="40" height="48" /></span></div>
      <Workspace name={to} restored/>
    </div>
    <div className="mp-route"><span key={index}>{from}<b>→</b>{to}</span><div><button type="button" onClick={()=>setPaused(p=>!p)} aria-label={paused?'Play portal animation':'Pause portal animation'} aria-pressed={paused}>{paused?'▷':'Ⅱ'}</button><button type="button" onClick={()=>setIndex(i=>(i+1)%pairs.length)} aria-label="Show next agent pairing">→</button></div></div>
    <div className="mp-steps"><div><small>01 / CONNECT</small><strong>Your choice of agent.</strong></div><div><small>02 / REMEMBER</small><strong>The context you keep.</strong></div><div><small>03 / CONTINUE</small><strong>Already up to speed.</strong></div></div>
  </div>;
}
