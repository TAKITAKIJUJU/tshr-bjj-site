import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as parse5 from 'parse5';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import translations
const translationsModule = await import('../src/data/test/translations.js');
const { translations, localePaths, localeNames, htmlLang } = translationsModule;

console.log('Loaded translations dictionary with', Object.keys(translations).length, 'keys');

// Languages to generate
const targetLanguages = ['en', 'pt', 'gunma'];

// Map locale codes to URL path segments
const langPaths = {
  en: 'english',
  pt: 'portugues',
  gunma: 'gunma'
};

const pages = [
  { src: 'dist/client/test/index.html', relPath: '' },
  { src: 'dist/client/test/contact/index.html', relPath: 'contact' }
];

function traverseAndReplace(node, lang, isInsideHero = false) {
  // Check if entering #hero
  let insideHero = isInsideHero;
  if (node.nodeName === 'section') {
    const idAttr = node.attrs?.find(a => a.name === 'id');
    if (idAttr && idAttr.value === 'hero') {
      insideHero = true;
    }
  }

  // Handle #hero specially
  if (insideHero) {
    if (lang === 'gunma') {
      // Gunma Hero: Keep completely original! Do not replace anything in Hero.
      return;
    }
    // For English & Portuguese, we replace H1 text and classes
    if (node.nodeName === 'h1') {
      const classAttr = node.attrs?.find(a => a.name === 'class');
      if (classAttr) {
        // Change text-vertical to hero__translated
        classAttr.value = classAttr.value.replace('text-vertical', 'hero__translated');
        if (!classAttr.value.includes('hero__translated')) {
          classAttr.value += ' hero__translated';
        }
      }
      const heroTitle = lang === 'en' 
        ? 'Enrich your life through Jiu-Jitsu in Honjo.'
        : 'Transforme sua vida com o Jiu-Jitsu em Honjo.';
      node.childNodes = [{ nodeName: '#text', value: heroTitle }];
      return;
    }
  }

  // Replace attribute values
  if (node.attrs && node.attrs.length > 0) {
    for (const attr of node.attrs) {
      if (['alt', 'aria-label', 'title', 'placeholder'].includes(attr.name)) {
        const trimmed = attr.value.trim();
        if (translations[trimmed] && translations[trimmed][lang]) {
          attr.value = translations[trimmed][lang];
        }
      }

      // Update links
      if (attr.name === 'href') {
        const val = attr.value;
        const prefix = `/test/${langPaths[lang]}`;
        if (val === '/test/' || val === '/test') {
          attr.value = `${prefix}/`;
        } else if (val === '/test/contact/' || val === '/test/contact') {
          attr.value = `${prefix}/contact/`;
        } else if (val.startsWith('/test/#')) {
          attr.value = `${prefix}/${val.substring(6)}`;
        }
      }
    }
  }

  // Replace text nodes
  if (node.nodeName === '#text') {
    const raw = node.value;
    const trimmed = raw.trim();
    if (trimmed && translations[trimmed] && translations[trimmed][lang]) {
      const translated = translations[trimmed][lang];
      // Preserve leading and trailing whitespace/newlines
      const leading = raw.match(/^\s*/)[0];
      const trailing = raw.match(/\s*$/)[0];
      node.value = leading + translated + trailing;
    }
  }

  // Recurse children
  if (node.childNodes && node.childNodes.length > 0) {
    for (const child of node.childNodes) {
      traverseAndReplace(child, lang, insideHero);
    }
  }
}

function updateMetadataAndLanguagePicker(doc, lang, relPath) {
  const currentLangPath = langPaths[lang];
  const pageSuffix = relPath ? `${relPath}/` : '';

  // 1. html lang attribute
  function findHtml(node) {
    if (node.nodeName === 'html') return node;
    if (node.childNodes) {
      for (const c of node.childNodes) {
        const found = findHtml(c);
        if (found) return found;
      }
    }
    return null;
  }
  const htmlNode = findHtml(doc);
  if (htmlNode && htmlNode.attrs) {
    const langAttr = htmlNode.attrs.find(a => a.name === 'lang');
    if (langAttr) langAttr.value = htmlLang[lang] || 'ja';
    else htmlNode.attrs.push({ name: 'lang', value: htmlLang[lang] || 'ja' });
  }

  // 2. Canonical & OGP
  const canonicalUrl = `https://tshr-bjj.com/test/${currentLangPath}/${pageSuffix}`;
  function updateHead(node) {
    if (node.nodeName === 'link') {
      const rel = node.attrs?.find(a => a.name === 'rel')?.value;
      if (rel === 'canonical') {
        const href = node.attrs?.find(a => a.name === 'href');
        if (href) href.value = canonicalUrl;
      }
    }
    if (node.nodeName === 'meta') {
      const prop = node.attrs?.find(a => a.name === 'property')?.value;
      if (prop === 'og:url') {
        const content = node.attrs?.find(a => a.name === 'content');
        if (content) content.value = canonicalUrl;
      }
      if (prop === 'og:locale') {
        const content = node.attrs?.find(a => a.name === 'content');
        if (content) content.value = lang === 'en' ? 'en_US' : lang === 'pt' ? 'pt_BR' : 'ja_JP';
      }
    }
    if (node.childNodes) {
      for (const c of node.childNodes) updateHead(c);
    }
  }
  updateHead(doc);

  // 3. Language picker updates: update language-current and aria-current
  function updatePickers(node) {
    if (node.nodeName === 'details' && node.attrs?.some(a => a.name === 'class' && a.value.includes('language-picker'))) {
      // Find .language-current
      function findCurrentSpan(n) {
        if (n.nodeName === 'span' && n.attrs?.some(a => a.name === 'class' && a.value.includes('language-current'))) {
          return n;
        }
        if (n.childNodes) {
          for (const c of n.childNodes) {
            const res = findCurrentSpan(c);
            if (res) return res;
          }
        }
        return null;
      }
      const curSpan = findCurrentSpan(node);
      if (curSpan) {
        curSpan.childNodes = [{ nodeName: '#text', value: localeNames[lang] }];
      }

      // Update aria-current on links inside language-options
      function updateOptionLinks(n) {
        if (n.nodeName === 'a' && n.attrs) {
          const dataLang = n.attrs.find(a => a.name === 'data-language')?.value;
          const currentAttr = n.attrs.find(a => a.name === 'aria-current');
          if (dataLang === lang) {
            if (!currentAttr) n.attrs.push({ name: 'aria-current', value: 'page' });
            else currentAttr.value = 'page';
          } else if (currentAttr) {
            n.attrs = n.attrs.filter(a => a.name !== 'aria-current');
          }
        }
        if (n.childNodes) {
          for (const c of n.childNodes) updateOptionLinks(c);
        }
      }
      updateOptionLinks(node);
    }
    if (node.childNodes) {
      for (const c of node.childNodes) updatePickers(c);
    }
  }
  updatePickers(doc);
}

export async function generateTranslations() {
  console.log('Generating translated pages for /test...');

  for (const page of pages) {
    const srcPath = path.resolve(rootDir, page.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file not found: ${srcPath}. Skipping...`);
      continue;
    }
    const htmlContent = fs.readFileSync(srcPath, 'utf-8');

    for (const lang of targetLanguages) {
      const doc = parse5.parse(htmlContent);
      traverseAndReplace(doc, lang, false);
      updateMetadataAndLanguagePicker(doc, lang, page.relPath);

      const serialized = parse5.serialize(doc);

      const targetDir = path.resolve(rootDir, 'dist/client/test', langPaths[lang], page.relPath);
      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.resolve(targetDir, 'index.html');
      fs.writeFileSync(targetFile, serialized, 'utf-8');
      console.log(`Generated: ${targetFile}`);
    }
  }

  console.log('All translations successfully generated!');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateTranslations().catch(console.error);
}
