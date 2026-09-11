const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.split('\n').find(l => l.startsWith('GEMINI_API_KEY=')).split('=')[1].replace(/"/g, '').trim();

fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
  .then(r => r.json())
  .then(data => {
    if (data.models) console.log(data.models.map(m => m.name));
    else console.log(data);
  });
