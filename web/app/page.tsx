import Link from 'next/link';
import catalog from '../../data/apis.json';

type Api = (typeof catalog.apis)[number];
type FreeMode = 'no-auth' | 'free-forever' | 'free-tier' | 'free-credits' | 'trial';

const freeModes: { id: FreeMode; label: string; description: string }[] = [
  { id: 'no-auth', label: 'No API key', description: 'Start using it without credentials' },
  { id: 'free-forever', label: 'Free', description: 'Public access with no paid plan' },
  { id: 'free-tier', label: 'Free tier', description: 'Free allowance with a limit' },
  { id: 'free-credits', label: 'Free credits', description: 'Credits included when you start' },
  { id: 'trial', label: 'Free trial', description: 'Try it before paying' },
];

function freeModesFor(api: Api): FreeMode[] {
  const pricing = api.pricing.toLowerCase();
  const modes: FreeMode[] = [];
  if (api.auth === 'none') modes.push('no-auth');
  if (pricing.includes('free public api') || pricing.includes('free public access') || pricing.includes('free and open')) modes.push('free-forever');
  if (pricing.includes('free tier')) modes.push('free-tier');
  if (pricing.includes('free credit')) modes.push('free-credits');
  if (pricing.includes('free trial') || pricing.includes('trial')) modes.push('trial');
  return modes;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; auth?: string; free?: FreeMode }> }) {
  const params = await searchParams;
  const q = (params.q ?? '').trim().toLowerCase();
  const category = params.category ?? '';
  const auth = params.auth ?? '';
  const free = params.free ?? '';
  const all = catalog.apis as Api[];
  const categories = [...new Set(all.map(api => api.category))].sort();
  const auths = [...new Set(all.map(api => api.auth))].sort();
  const filtered = all.filter(api => {
    const text = [api.name, api.description, api.category, ...(api.tags ?? [])].join(' ').toLowerCase();
    return (!q || text.includes(q)) && (!category || api.category === category) && (!auth || api.auth === auth) && (!free || freeModesFor(api).includes(free));
  });
  const freeCount = all.filter(api => freeModesFor(api).length > 0).length;
  const noAuthCount = all.filter(api => api.auth === 'none').length;

  return <main className="shell">
    <header className="header"><div className="container nav">
      <Link className="brand" href="/">api<span>atlas</span></Link>
      <nav className="nav-links"><Link className="nav-free" href="/?free=no-auth">Free APIs</Link><Link href="#categories">Categories</Link><a href="https://github.com/Rrachet/apiatlas" target="_blank" rel="noreferrer">GitHub</a></nav>
    </div></header>

    <section className="hero"><div className="container hero-inner">
      <div className="eyebrow">Public API directory</div>
      <h1>Find a free API for your project.</h1>
      <p className="lede">Search APIs by what they do, how they authenticate, and whether you can use them for free.</p>
      <form className="search" action="/"><input name="q" defaultValue={params.q ?? ''} placeholder="Search for weather, maps, payments, AI…" aria-label="Search APIs"/><button type="submit">Search</button></form>
      <div className="quick"><span>Popular:</span><Link href="/?q=weather">Weather</Link><Link href="/?q=AI">AI</Link><Link href="/?q=maps">Maps</Link><Link href="/?q=currency">Currency</Link><Link href="/?q=games">Games</Link></div>
    </div></section>

    <section className="container stats"><div><strong>{all.length}</strong><span>APIs</span></div><div><strong>{categories.length}</strong><span>Categories</span></div><div><strong>{freeCount}</strong><span>Free options</span></div><div><strong>{noAuthCount}</strong><span>No API key</span></div></section>

    <section className="container free-panel" id="free"><div className="free-heading"><div className="section-kicker">Start here</div><h2>Looking for a free API?</h2><p>Pick the kind of free access you need.</p></div><div className="free-modes">{freeModes.map(mode => <Link key={mode.id} className={free === mode.id ? 'free-mode active' : 'free-mode'} href={`/?free=${mode.id}`}><strong>{mode.label}</strong><span>{mode.description}</span></Link>)}</div></section>

    <section className="container content" id="categories"><aside className="sidebar">
      <div className="filter-heading">Browse</div>
      <div className="filter-group"><p className="filter-title">Categories</p>{categories.map(c => <Link className={category === c ? 'filter active' : 'filter'} key={c} href={`/?category=${encodeURIComponent(c)}`}>{c}</Link>)}</div>
      <div className="filter-group"><p className="filter-title">Authentication</p>{auths.map(a => <Link className={auth === a ? 'filter active' : 'filter'} key={a} href={`/?auth=${encodeURIComponent(a)}`}>{a === 'none' ? 'No API key' : a}</Link>)}</div>
    </aside><div className="results">
      <div className="results-head"><div><div className="section-kicker">{q || category || auth || free ? 'Your search' : 'All APIs'}</div><h2>{free ? freeModes.find(mode => mode.id === free)?.label : q || category || auth ? 'Search results' : 'Browse APIs'}</h2></div><span className="count">{filtered.length} APIs</span></div>
      <div className="grid">{filtered.map(api => <Link className="card" key={api.id} href={`/api/${api.id}`}><div className="card-top"><span className="card-category">{api.category}</span><span className="status"><i/> {api.status}</span></div><h3>{api.name}</h3><p className="description">{api.description}</p><div className="meta"><span className="tag">{api.auth === 'none' ? 'No API key' : api.auth}</span>{freeModesFor(api).slice(0, 2).map(mode => <span className="tag" key={mode}>{freeModes.find(item => item.id === mode)?.label}</span>)}</div></Link>)}</div>
      {filtered.length === 0 && <div className="empty">No APIs found. Try a different search.</div>}
    </div></section>

    <footer className="footer"><div className="container"><span>apiatlas</span><span>Find an API. Check the access. Start building.</span></div></footer>
  </main>;
}
