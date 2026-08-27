import Link from 'next/link';
import catalog from '../../data/apis.json';

type Api = (typeof catalog.apis)[number];
type FreeMode = 'no-auth' | 'free-forever' | 'free-tier' | 'free-credits' | 'trial';

const popular = ['ai', 'finance', 'weather', 'games', 'maps', 'social'];
const freeModes: { id: FreeMode; label: string; description: string }[] = [
  { id: 'no-auth', label: 'No authentication', description: 'Use without an API key' },
  { id: 'free-forever', label: 'Free forever', description: 'Free public access' },
  { id: 'free-tier', label: 'Free tier', description: 'Recurring free allowance' },
  { id: 'free-credits', label: 'Free credits', description: 'Credits included to start' },
  { id: 'trial', label: 'Free trial', description: 'Time-limited access' },
];

function freeModesFor(api: Api): FreeMode[] {
  const p = api.pricing.toLowerCase(); const m: FreeMode[] = [];
  if (api.auth === 'none') m.push('no-auth');
  if (p.includes('free public api') || p.includes('free public access') || p.includes('free and open')) m.push('free-forever');
  if (p.includes('free tier')) m.push('free-tier');
  if (p.includes('free credits') || p.includes('free credit')) m.push('free-credits');
  if (p.includes('free trial') || p.includes('trial')) m.push('trial');
  return m;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; auth?: string; free?: FreeMode }> }) {
  const params = await searchParams; const q = (params.q ?? '').trim().toLowerCase(); const category = params.category ?? ''; const auth = params.auth ?? ''; const free = params.free ?? ''; const all = catalog.apis as Api[];
  const filtered = all.filter(api => { const haystack = [api.name, api.description, api.category, ...(api.tags ?? [])].join(' ').toLowerCase(); return (!q || haystack.includes(q)) && (!category || api.category === category) && (!auth || api.auth === auth) && (!free || freeModesFor(api).includes(free)); });
  const categories = [...new Set(all.map(a => a.category))].sort(); const auths = [...new Set(all.map(a => a.auth))].sort(); const isFreeView = Boolean(free);
  return <main className="shell">
    <header className="header"><div className="container nav"><Link className="brand" href="/">api<span>atlas</span></Link><nav className="nav-links"><Link className={isFreeView ? 'nav-active' : ''} href="/?free=no-auth">Free APIs</Link><a href="#categories">Categories</a><a href="https://github.com/Rrachet/apiatlas" target="_blank" rel="noreferrer">GitHub</a></nav><div className="nav-status"><i/> Live</div></div></header>
    <section className="hero"><div className="container hero-inner"><div className="eyebrow">Developer API directory</div><h1>{isFreeView ? <>Free APIs.<br/><em>Build for less.</em></> : <>Find the API.<br/><em>Build the product.</em></>}</h1><p className="lede">{isFreeView ? 'Find APIs you can start using for free, with clear access types.' : 'A clean index of public APIs organized by capability, authentication, and access.'}</p><form className="search" action="/"><span className="search-mark">/</span><input name="q" defaultValue={params.q ?? ''} placeholder="Search APIs, tags, categories…" aria-label="Search APIs"/><button type="submit">Search</button></form><div className="hero-hints"><span>Try</span> <Link href="/?q=weather">weather</Link><b>·</b><Link href="/?q=payments">payments</Link><b>·</b><Link href="/?q=AI">AI</Link><b>·</b><Link href="/?q=maps">maps</Link></div></div></section>
    <section className="stats container"><div><strong>{all.length}</strong><span>APIs indexed</span></div><div><strong>{categories.length}</strong><span>Categories</span></div><div><strong>{all.filter(a => freeModesFor(a).length > 0).length}</strong><span>Free options</span></div><div><strong>{all.filter(a => a.auth === 'none').length}</strong><span>No auth</span></div></section>
    <section className="container free-panel" id="free"><div className="free-panel-copy"><div className="section-kicker">Free API finder</div><h2>Choose what “free” means.</h2><p>Separate no-auth, free forever, free tier, credits, and trials.</p></div><div className="free-modes">{freeModes.map(mode => <Link key={mode.id} className={free === mode.id ? 'free-mode active' : 'free-mode'} href={`/?free=${mode.id}`}><span><strong>{mode.label}</strong><small>{mode.description}</small></span></Link>)}</div></section>
    <section className="container content" id="explore"><aside className="sidebar"><div className="filter-heading">Explore</div><div className="filter-group"><p className="filter-title">Popular</p>{popular.map(c => <Link className={category === c ? 'filter active' : 'filter'} key={c} href={`/?category=${c}`}><span>{c}</span></Link>)}</div><div className="filter-group"><p className="filter-title">Authentication</p>{auths.map(a => <Link className={auth === a ? 'filter active' : 'filter'} key={a} href={`/?auth=${encodeURIComponent(a)}`}><span>{a}</span></Link>)}</div><div className="filter-group" id="categories"><p className="filter-title">Categories</p>{categories.map(c => <Link className={category === c ? 'filter active' : 'filter'} key={c} href={`/?category=${encodeURIComponent(c)}`}><span>{c}</span></Link>)}</div></aside>
      <div className="results"><div className="results-head"><div><div className="section-kicker">{q || category || auth || free ? 'Filtered catalog' : 'Directory'}</div><h2>{free ? freeModes.find(m => m.id === free)?.label : q || category || auth ? 'Search results' : 'Explore APIs'}</h2></div><span className="count">{filtered.length} results</span></div>
        <div className="grid">{filtered.map(api=><Link className="card" key={api.id} href={`/api/${api.id}`}><div className="card-top"><span className="card-category">{api.category}</span><span className="status"><i/> {api.status}</span></div><h3>{api.name}</h3><p className="description">{api.description}</p><div className="meta"><span className="tag">{api.auth}</span>{freeModesFor(api).slice(0,2).map(mode=><span className="tag" key={mode}>{freeModes.find(m=>m.id===mode)?.label}</span>)}{(api.tags??[]).slice(0,1).map(tag=><span className="tag" key={tag}>{tag}</span>)}</div></Link>)}</div>{filtered.length===0&&<div className="empty">No APIs matched your filters. Try a broader search.</div>}</div></section>
    <footer className="footer"><div className="container"><span>apiatlas</span><span>Open API discovery for developers.</span></div></footer>
  </main>;
}
