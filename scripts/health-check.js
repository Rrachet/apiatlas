const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const apiRoot = path.join(root, 'apis');
const results = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.json')) {
      const api = JSON.parse(fs.readFileSync(full, 'utf8'));
      results.push({ id: api.id, name: api.name, website: api.website, docs: api.docs });
    }
  }
}

async function check(url) {
  const started = Date.now();
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { ok: response.ok, status: response.status, ms: Date.now() - started };
  } catch (error) {
    return { ok: false, status: 0, ms: Date.now() - started, error: error.message };
  }
}

(async () => {
  walk(apiRoot);
  const checked = [];
  for (const api of results) {
    const website = await check(api.website);
    const docs = await check(api.docs);
    checked.push({ ...api, website, docs });
  }
  const failed = checked.filter((x) => !x.website.ok || !x.docs.ok);
  const report = { checked_at: new Date().toISOString(), total: checked.length, healthy: checked.length - failed.length, failed: failed.length, apis: checked };
  fs.writeFileSync(path.join(root, 'data/health.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Health check: ${report.healthy}/${report.total} passed.`);
  if (failed.length) {
    for (const item of failed) console.log(`FAIL ${item.id}: website=${item.website.status} docs=${item.docs.status}`);
  }
})();
