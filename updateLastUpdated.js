const fs = require('fs');
const { execSync } = require('child_process');

const changedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
  .split('\n')
  .filter(f => f.endsWith('flags.json'));

const now = new Date().toISOString();

changedFiles.forEach(path => {
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.lastUpdated = now;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    execSync(`git add ${path}`); // Vuelve a añadir el archivo actualizado al commit
    console.log(`Actualizado: ${path}`);
  }
});