const founders = [
 {name:'Nandit Mehra',role:'Co-founder & CEO',photo:'nandit-mehra',link:'https://www.linkedin.com/in/nanditmehra/',bio:'Building Lighthouse’s vision for persistent, verifiable memory. Previously at Fleek and Somish Blockchain Labs.'},
 {name:'Ravish Sharma',role:'Co-founder & CTO',photo:'ravish-sharma',link:'https://www.linkedin.com/in/ravish1729/',bio:'Building the technology behind Lighthouse. Experience across decentralised infrastructure, financial services and IoT.'}
];
export default function Founders(){return <section className="founders section" id="founders" aria-labelledby="founders-heading">
 <div className="founders-heading"><div><span className="eyebrow">THE FOUNDERS</span><h2 id="founders-heading">The people behind<br/><span className="shine">the persistent brain.</span></h2></div><p>From decentralised storage to a shared memory layer. Building Lighthouse together.</p></div>
 <div className="founder-grid">{founders.map(f=><article className="founder-card" key={f.name}><div className="founder-top"><img src={'/assets/founders/'+f.photo+'.jpg'} alt={f.name} width="112" height="112" loading="lazy"/><a href={f.link} target="_blank" rel="noopener noreferrer" aria-label={f.name+' on LinkedIn'}><span>in</span></a></div><span className="founder-role">{f.role}</span><h3>{f.name}</h3><p>{f.bio}</p></article>)}</div>
 </section>}
