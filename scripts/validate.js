const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const apiRoot = path.join(root, 'apis');
const schema = JSON.parse(fs.readFileSync(path.join(root, 'schema/api.schema.json'), 'utf8'));
const files = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.json')) files.push(full);
  }
}

walk(apiRoot);
if (!files.length) throw new Error('No API records found.');

const ids = new Set();
for (const file of files) {
  const relative = path.relative(root, file);
  let record;
  try {
    record = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`${relative}: invalid JSON — ${error.message}`);
  }

  for (const field of schema.required) {
    if (!(field in record)) throw new Error(`${relative}: missing required field '${field}'`);
  }

  if (!schema.properties.id.pattern || !new RegExp(schema.properties.id.pattern).test(record.id)) {
    throw new Error(`${relative}: invalid id '${record.id}'`);
  }
  if (!schema.properties.auth.enum.includes(record.auth)) throw new Error(`${relative}: invalid auth '${record.auth}'`);
  if (!schema.properties.status.enum.includes(record.status)) throw new Error(`${relative}: invalid status '${record.status}'`);
  if (!/^https?:\/\//.test(record.website)) throw new Error(`${relative}: website must be an http(s) URL`);
  if (!/^https?:\/\//.test(record.docs)) throw new Error(`${relative}: docs must be an http(s) URL`);
  if (ids.has(record.id)) throw new Error(`Duplicate API id: ${record.id}`);
  ids.add(record.id);
}

console.log(`Validated ${files.length} API records.`);
