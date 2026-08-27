import Link from 'next/link';
import catalog from '../../data/apis.json';

type Api = (typeof catalog.apis)[number];
type FreeMode = 'no-auth' | 'free-forever' | 'free-tier' | 'free-credits' | 'trial';

const popular = ['ai', 'finance', 'weather', 'games', 'maps', 'social'];
const freeModes: { id: FreeMode; label: string; description: string }[] = [
  { id: 'no-auth', label: 'No authentication', description: 'Use it without an API key' },
  { id: 'free-forever', label: 'Free forever', description: 'Free public access' },
  { id: 'free-tier', label: 'Free tier', description: 'Recurring free allowance' },
  { id: 'free-credits', label: 'Free credits', description: 'Credits included to start' },
  { id: 'trial', label: 'Free trial', description: 'Time-limited free access' },
];

function Icon({ name }: { name: 'search' | 'arrow' | 'grid' | 'key' | 'spark' | 'check' }) {
  const paths = {
    search: 'M11 19a8 8 0 1 1 5.657-2.343L21 21',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    key: 'M15 7a5 5 0 1 0-3.9 4.9L15 16h3v-3h3v-3h-6.1A5 5 0 0 0 15 7Z',
    spark: 'm12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z',
    check: 'm5 12 4 4L19 6',
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

function Chip({ children }: { children: React.ReactNode }) { return <span className="tag">{children}</span>; }

function freeModesFor(api: Api): FreeMode[] {
  const pricing = api.pricing.toLowerCase();
  const modes: FreeMode[] = [];
  if (api.auth === 'none') modes.push('no-auth');
  if (pricing.includes('free public api') || pricing.includes('free public access') || pricing.includes('free and open')) modes.push('free-forever');
  if (pricing.includes('free tier')) modes.push('free-tier');
  if (pricing.includes('free credits') || pricing.includes('free credit')) modes.push('free-credits');
  if (pricing.includes('free trial') || pricing.includes('trial')) modes.push('trial');
  return modes;
}

export default function Home({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; auth?: string; free?: FreeMode }> }) { return <HomeContent searchParams={searchParams} />; }

async function HomeContent({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; auth?: string; free?: FreeMode }> }) {
  const params = await searchParams;
  const q = (params.q ?? '').trim().toLowerCase();
  const category = params.category ?? '';
  const auth = params.auth ?? '';
  const free = params.free ?? '';
  const all = catalog.apis as Api[];
  const filtered = all.filter(api => {
    const haystack = [api.name, api.description, api.category, ...(api.tags ?? [])].join(' ').toLowerCase();
    return (!q || haystack.includes(q)) && (!category || api.category === category) && (!auth || api.auth === auth) && (!free || freeModesFor(api).includes(free));
  });
  const categories = [...new Set(all.map(a => a.category))].sort();
  const auths = [...new Set(all.map(a => a.auth))].sort();
  const featured = all.slice(0, 6);
  const isFreeView = Boolean(free);

  return <main className="shell">
    <header className="header"><div className="container nav"><Link className="brand" href="/">api<span>atlas</span></Link><nav className="nav-links"><a href="#explore">Explore</a><a href="#free">Free APIs</a><a href="#categories">Categories</a><a href="https://github.com/Rrachet/apiatlas" target="_blank" rel="noreferrer">GitHub ↗</a></nav><div className="nav-status"><i/> Live catalog</div></div></header>
    <section className="hero"><div className="hero-grid"/><div className="container hero-inner"><div className="eyebrow"><span className="eyebrow-dot"/> Developer API directory</div><h1>{isFreeView ? <>Free APIs.<br/><em>Build without limits.</em></> : <>Stop searching.<br/><em>Start building.</em></>}</h1><p className="lede">{isFreeView ? 'Find APIs you can actually start using for free. Separate no-auth, free-forever, free-tier, credits, and trial options.' : 'Discover public APIs by capability, authentication, and category. One clean index for the APIs you actually need.'}</p><form className="search" action="/"><span className="search-icon"><Icon name="search"/></span><input name="q" defaultValue={params.q ?? ''} placeholder="Search APIs, categories, tags…" aria-label="Search APIs"/><kbd>⌘ K</kbd><button type="submit">Search <Icon name="arrow"/></button></form><div className="hero-hints"><span>Try</span> weather <b>·</b> payments <b>·</b> AI <b>·</b> maps</div></div></section>

    <section className="stats container"><div><strong>{all.length}</strong><span>APIs indexed</span></div><div><strong>{categories.length}</strong><span>Categories</span></div><div><strong>{all.filter(a => freeModesFor(a).length > 0).length}</strong><span>Free options</span></div><div><strong>{all.filter(a => a.auth === 'none').length}</strong><span>No auth</span></div></section>

    <section className="container free-panel" id="free"><div className="free-panel-copy"><div className="section-kicker"><Icon name="spark"/> Free API finder</div><h2>Start free. Pick your model.</h2><p>Not all “free” APIs are the same. Choose exactly what free means to you.</p></div><div className="free-modes">{freeModes.map(mode => <Link key={mode.id} className={free === mode.id ? 'free-mode active' : 'free-mode'} href={`/?free=${mode.id}`}><span className="free-check"><Icon name="check"/></span><span><strong>{mode.label}</strong><small>{mode.description}</small></span><Icon name="arrow"/></Link>)}</div></section>

    <section className="container content" id="explore"><aside className="sidebar"><div className="filter-heading"><Icon name="grid"/><span>Explore</span></div><div className="filter-group"><p className="filter-title">Popular</p>{popular.map(c => <Link className={category === c ? 'filter active' : 'filter'} key={c} href={`/?category=${c}`}><span>{c}</span><span>→</span></Link>)}</div><div className="filter-group"><p className="filter-title">Authentication</p>{auths.map(a => <Link className={auth === a ? 'filter active' : 'filter'} key={a} href={`/?auth=${encodeURIComponent(a)}`}><span>{a}</span><span>→</span></Link>)}</div><div className="filter-group" id="categories"><p className="filter-title">All categories</p>{categories.map(c => <Link className={category === c ? 'filter active' : 'filter'} key={c} href={`/?category=${encodeURIComponent(c)}`}><span>{c}</span><span>→</span></Link>)}</div></aside>
      <div className="results"><div className="results-head"><div><div className="section-kicker"><Icon name="spark"/> {q || category || auth || free ? 'Filtered catalog' : 'Fresh from the index'}</div><h2>{free ? freeModes.find(m => m.id === free)?.label : q || category || auth ? 'Search results' : 'Explore APIs'}</h2></div><span className="count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span></div>
        {!q && !category && !auth && !free && <div className="featured-row">{featured.map(api => <Link className="featured" key={api.id} href={`/api/${api.id}`}><span className="featured-icon"><Icon name="key"/></span><span><strong>{api.name}</strong><small>{api.category}</small></span><Icon name="arrow"/></Link>)}</div>}
        <div className="grid">{filtered.map(api => <Link className="card" key={api.id} href={`/api/${api.id}`}><div className="card-top"><div className="card-icon"><Icon name={api.category === 'ai' ? 'spark' : 'grid'}/></div><span className="status"><i/> {api.status}</span></div><h3>{api.name}</h3><p className="description">{api.description}</p><div className="meta"><Chip>{api.category}</Chip><Chip>{api.auth}</Chip>{freeModesFor(api).map(mode => <Chip key={mode}>{freeModes.find(m => m.id === mode)?.label}</Chip>)}{(api.tags ?? []).slice(0, 1).map(tag => <Chip key={tag}>{tag}</Chip>)}</div><div className="card-footer"><span>View API</span><Icon name="arrow"/></div></Link>)}</div>{filtered.length === 0 && <div className="empty">No APIs matched your filters. Try another free option or remove a filter.</div>}</div></section>
    <footer className="footer"><div className="container"><span>apiatlas — an open API discovery index</span><span>Built for developers, by developers.</span></div></footer>
  </main>;
}
