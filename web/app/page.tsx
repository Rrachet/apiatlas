import Link from 'next/link';
import catalog from '../../data/apis.json';

type Api = (typeof catalog.apis)[number];

const popular = ['ai', 'finance', 'weather', 'games', 'maps', 'social'];

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

export default function Home({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; auth?: string }> }) {
  return <HomeContent searchParams={searchParams} />;
}

async function HomeContent({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; auth?: string }> }) {
  const params = await searchParams;
  const q = (params.q ?? '').trim().toLowerCase();
  const category = params.category ?? '';
  const auth = params.auth ?? '';

  const filtered = (catalog.apis as Api[]).filter((api) => {
    const haystack = [api.name, api.description, api.category, ...(api.tags ?? [])].join(' ').toLowerCase();
    return (!q || haystack.includes(q)) && (!category || api.category === category) && (!auth || api.auth === auth);
  });

  const categories = [...new Set(catalog.apis.map((a) => a.category))].sort();
  const auths = [...new Set(catalog.apis.map((a) => a.auth))].sort();

  return (
    <main className="shell">
      <header className="header"><div className="container"><Link className="brand" href="/">apiatlas <span>/ directory</span></Link></div></header>
      <section className="hero"><div className="container">
        <div className="eyebrow">{catalog.apis.length} APIs · {categories.length} categories</div>
        <h1>Find the right API.</h1>
        <p className="lede">A structured, searchable directory of public APIs. Search by what you need, filter by how it works, and get straight to the docs.</p>
        <form className="search" action="/">
          <input name="q" defaultValue={params.q ?? ''} placeholder="Search APIs, categories, tags…" aria-label="Search APIs" />
          <button type="submit">Search</button>
        </form>
      </div></section>

      <section className="container content">
        <aside className="sidebar">
          <div className="filter-group"><p className="filter-title">Popular</p>{popular.map((c) => <Link key={c} href={`/?category=${c}`}><label>→ {c}</label></Link>)}</div>
          <div className="filter-group"><p className="filter-title">Authentication</p>{auths.map((a) => <Link key={a} href={`/?auth=${encodeURIComponent(a)}`}><label>→ {a}</label></Link>)}</div>
          <div className="filter-group"><p className="filter-title">Categories</p>{categories.map((c) => <Link key={c} href={`/?category=${encodeURIComponent(c)}`}><label>→ {c}</label></Link>)}</div>
        </aside>

        <div>
          <div className="results-head"><h2>{q || category || auth ? 'Search results' : 'Explore APIs'}</h2><span className="count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span></div>
          <div className="grid">
            {filtered.map((api) => <Link className="card" key={api.id} href={`/api/${api.id}`}>
              <div className="card-top"><h3>{api.name}</h3><span className="status">{api.status}</span></div>
              <p className="description">{api.description}</p>
              <div className="meta"><Chip>{api.category}</Chip><Chip>{api.auth}</Chip>{(api.tags ?? []).slice(0, 2).map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
            </Link>)}
          </div>
          {filtered.length === 0 && <div className="empty">No APIs matched your search. Try another term or remove a filter.</div>}
        </div>
      </section>
    </main>
  );
}
