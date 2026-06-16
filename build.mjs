import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';

const dist = new URL('./dist/', import.meta.url);
await mkdir(dist, { recursive: true });

const data = JSON.parse(await readFile(new URL('./quizData.json', import.meta.url), 'utf8'));
if (!Array.isArray(data.sets) || data.sets.length !== data.setCount) {
  throw new Error('quizData.json setCount does not match sets length');
}
const total = data.sets.reduce((sum, set) => sum + (Array.isArray(set.words) ? set.words.length : 0), 0);
if (total !== data.totalWords) {
  throw new Error(`quizData.json totalWords mismatch: expected ${data.totalWords}, got ${total}`);
}
for (const set of data.sets) {
  if (!set.setId || !set.title || !Array.isArray(set.words)) throw new Error(`Invalid set: ${set.setId}`);
  if (set.words.length !== set.wordCount) throw new Error(`wordCount mismatch: ${set.setId}`);
  for (const word of set.words) {
    for (const key of ['word', 'meaningKo', 'partOfSpeechKo', 'speakText']) {
      if (!word[key]) throw new Error(`Missing ${key} in ${set.setId}`);
    }
  }
}

let html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
html = html.replaceAll('__PUBLIC_URL__', process.env.PUBLIC_URL ?? '');
await writeFile(new URL('./index.html', dist), html);
await copyFile(new URL('./quizData.json', import.meta.url), new URL('./quizData.json', dist));
console.log(`Built ${data.bookTitle}: ${data.sets.length} sets, ${total} words -> dist/`);
