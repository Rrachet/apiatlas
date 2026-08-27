const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const apiRoot = path.join(root, 'apis');
const output = path.join(root, 'data/apis.json');
const records = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.json')) records.push(JSON.parse(fs.readFileSync(full, 'utf8')));
  }
}

walk(apiRoot);
records.sort((a, b) => a.name.localeCompare(b.name));
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify({ version: 1, apis: records }, null, 2) + '\n');
console.log(`Generated ${path.relative(root, output)} with ${records.length} APIs.`);
