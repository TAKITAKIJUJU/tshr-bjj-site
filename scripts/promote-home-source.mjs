// One-time, repeatable snapshot of the approved test home. Contact remains independent.
import fs from 'node:fs';
import path from 'node:path';

function write(file, content) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, content);
}
function copyTree(source, target, transform = value => value) {
  for (const entry of fs.readdirSync(source, {withFileTypes:true})) {
    const from = path.join(source, entry.name), to = path.join(target, entry.name);
    if (entry.isDirectory()) copyTree(from, to, transform);
    else write(to, transform(fs.readFileSync(from, 'utf8')));
  }
}
const component = source => source
  .replaceAll('/test/contact/', '/contact/')
  .replaceAll('/test/#', '/#')
  .replaceAll("href=\"/test/\"", 'href="/"')
  .replaceAll('`/test/', '`/')
  .replaceAll("'/test/english/", "'/english/")
  .replaceAll("'/test/portugues/", "'/portugues/")
  .replaceAll("'/test/gunma/", "'/gunma/")
  .replaceAll('^\\/test\\/(?:english|portugues)', '^\\/(?:english|portugues)')
  .replaceAll('/test/', '/site/')
  .replaceAll('data/test/', 'data/site/');
for (const name of ['TatoruHeader.astro', 'Hero.astro', 'Footer.astro']) {
  write('src/components/site/' + name, component(fs.readFileSync('src/components/test/' + name, 'utf8')));
}
copyTree('src/components/test/v2', 'src/components/site/v2', component);
copyTree('src/data/test', 'src/data/site');
copyTree('src/scripts/test', 'src/scripts/site');
write('src/styles/site.css', fs.readFileSync('src/styles/test.css', 'utf8'));
let layout = fs.readFileSync('src/layouts/TestLayout.astro', 'utf8')
  .replaceAll('components/test/', 'components/site/')
  .replaceAll('data/test/', 'data/site/')
  .replaceAll('styles/test.css', 'styles/site.css')
  .replaceAll('【テスト版】', '')
  .replaceAll('Over Limit 本庄 テスト版', 'Over Limit 本庄')
  .replace("=== '/test'", "=== ''")
  .replaceAll("'/test/contact/'", "'/contact/'")
  .replaceAll("'/test/'", "'/'")
  .replace('href="/test/hero-poster.webp"', 'href="/site/hero-poster.webp"')
  .replace(/  <meta http-equiv="Content-Security-Policy"[^\n]+\n/, '')
  .replace('  <meta name="robots" content="noindex, nofollow" />', '  <meta name="robots" content="index, follow" />')
  .replaceAll('テスト版ホーム', 'ホーム');
write('src/layouts/SiteLayout.astro', layout);
let home = fs.readFileSync('src/pages/test/index.astro', 'utf8')
  .replaceAll("../../layouts/TestLayout.astro", "../layouts/SiteLayout.astro")
  .replaceAll('../../components/test/', '../components/site/')
  .replaceAll('../../scripts/test/', '../scripts/site/');
write('src/pages/index.astro', home);
fs.cpSync('public/test', 'public/site', {recursive:true});
console.log('Promoted home source and media; contact and /test were not modified.');
