import { useEffect } from 'react';
import { useCases } from '../data/usecases';
import Navbar from './Navbar';
import Footer from './Footer';
import UseCaseStory from './UseCaseStory';
import { usecaseDetails } from '../data/usecaseDetails';
export default function UseCases({slug}){
 const item=useCases.find(c=>c.slug===slug);
 useEffect(()=>{
  const nodes=document.querySelectorAll('.uc-records>div,.uc-benefits article,.uc-steps>div,.uc-directory .usecase-card');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('uc-arrived');observer.unobserve(e.target)}}),{threshold:.08});
  nodes.forEach((el,i)=>{el.classList.add('uc-enter');el.style.setProperty('--uc-delay',`${(i%3)*75}ms`);observer.observe(el)});
  return()=>observer.disconnect();
 },[slug]);
 if(slug&&!item)return <><Navbar/><main className="uc-page section"><h1>Page not found.</h1><a className="text-link" href="/use-cases">Explore use cases ↗</a></main><Footer/></>;
 return <><Navbar/><main className="uc-page">
 <section className="uc-intro section">
  <a className="uc-breadcrumb" href={item?'/use-cases':'/'}>{item?'← All use cases':'← Lighthouse'}</a>
  <div className="uc-intro-grid"><div><span className="eyebrow">{item?item.name.toUpperCase():'MEMORY AT WORK'}</span><h1>{item?item.lead:'Real work.'}<br/><span className="shine">{item?item.headline:'Lasting memory.'}</span></h1><p>{item?item.description:'Explore memory for trading agents, market research, tokenised assets and physical AI. Choose a use case to see how the pieces fit together.'}</p>
   {item&&<div className="hero-actions"><a className="button primary" href={item.planned?'mailto:mail@lighthouse.storage':'https://docs.lighthouse.storage/memory/intro'}>{item.planned?'Discuss your use case':'Build this workflow'} <span>↗</span></a><a className="text-link" href="/use-cases">All use cases <span>↗</span></a></div>}
   {item?.planned&&<span className="uc-planned">Physical-AI reference integration · Planned</span>}
  </div><UseCaseVisual item={item}/></div>
 </section>
 {item?<UseCaseStory item={item}/>:<section className="uc-directory section"><div className="usecases-grid">{useCases.map(c=><article className="usecase-card" key={c.slug}><div className="usecase-label"><span>{c.number}</span>{c.name.toUpperCase()}</div><h3>{c.lead}<br/><span>{c.headline}</span></h3><p>{c.description}</p>{c.planned&&<span className="uc-planned">Reference integration · Planned</span>}<a className="text-link" href={'/use-cases/'+c.slug}>Explore {c.name.toLowerCase()} <span>↗</span></a></article>)}</div></section>}
 <section className="uc-bottom section"><span className="eyebrow">EVERY GOOD IDEA DESERVES A MEMORY.</span><h2>{item?usecaseDetails[item.slug].cta:<>Your next agent.<br/><span className="shine">Already up to speed.</span></>}</h2><div className="hero-actions"><a className="button primary" href="https://docs.lighthouse.storage/">Build with Lighthouse <span>↗</span></a><a className="text-link" href="mailto:mail@lighthouse.storage">Talk to us <span>↗</span></a></div></section>
 </main><Footer/></>;
}

const artLabels={
 'trading-agents':'Glass market signals connected to a luminous memory core',
 'prediction-markets':'Branching evidence paths connected through memory',
 'tokenised-assets':'Glass documents and digital asset tokens linked together',
 'physical-ai':'An industrial robot arm interacting with a memory core'
};
function UseCaseVisual({item}){
 if(!item)return <div className="uc-visual-directory" aria-label="Explore use cases">{useCases.map(c=><a key={c.slug} href={'/use-cases/'+c.slug}><img src={'/memory/usecase-'+c.slug+'.webp'} alt={artLabels[c.slug]} width="1024" height="1024"/><span>{c.name}<span aria-hidden="true">↗</span></span></a>)}</div>;
 return <figure className={'uc-visual uc-visual-'+item.slug}><img className="uc-art" src={'/memory/usecase-'+item.slug+'.webp'} alt={artLabels[item.slug]} width="1024" height="1024" fetchpriority="high"/><figcaption><span>{item.planned?'PROPOSED MEMORY FLOW':'MEMORY IN CONTEXT'}</span><div>{(item.planned?['Observe','Persist','Recover']:['Observe','Recall','Record']).map((t,i)=><span key={t}>{i>0&&<i aria-hidden="true">→</i>}{t}</span>)}</div></figcaption></figure>;
}
