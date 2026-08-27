import Link from 'next/link';
import { notFound } from 'next/navigation';
import catalog from '../../../../data/apis.json';

export function generateStaticParams() {
  return catalog.apis.map((api) => ({ id: api.id }));
}

export default async function ApiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const api = catalog.apis.find((item) => item.id === id);
  if (!api) notFound();

  return (
    <main className="shell">
      <header className="header"><div className="container"><Link className="brand" href="/">apiatlas <span>/ directory</span></Link></div></header>
      <div className="container"><article className="detail">
        <Link className="back" href="/">← Back to directory</Link>
        <div className="eyebrow" style={{ marginTop: 42 }}>{api.category}</div>
        <h1>{api.name}</h1>
        <p className="detail-desc">{api.description}</p>
        <div className="meta" style={{ marginTop: 24 }}>{(api.tags ?? []).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>

        <div className="detail-grid">
          <div className="detail-item"><small>Authentication</small>{api.auth}</div>
          <div className="detail-item"><small>Status</small>{api.status}</div>
          <div className="detail-item"><small>Pricing</small>{api.pricing}</div>
          {'https' in api && <div className="detail-item"><small>HTTPS</small>{String(api.https)}</div>}
          {'cors' in api && <div className="detail-item"><small>CORS</small>{String(api.cors)}</div>}
          {'apiType' in api && <div className="detail-item"><small>API Type</small>{String(api.apiType)}</div>}
          {'formats' in api && <div className="detail-item"><small>Formats</small>{String(api.formats)}</div>}
        </div>

        <div className="actions">
          <a className="action primary" href={api.docs} target="_blank" rel="noreferrer">View documentation ↗</a>
          <a className="action" href={api.website} target="_blank" rel="noreferrer">Website ↗</a>
        </div>
      </article></div>
    </main>
  );
}
