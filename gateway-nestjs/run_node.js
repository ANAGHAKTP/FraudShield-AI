const { execSync } = require('child_process');
try {
    execSync('node dist/main.js', { stdio: 'pipe' });
} catch (e) {
    require('fs').writeFileSync('out.txt', e.stderr ? e.stderr.toString() : e.stdout ? e.stdout.toString() : e.message);
}
