// Tiny markdown → HTML (no external dep). Sanitization is light;
// admin-only writes mean we can keep this small.
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function mdToHtml(md) {
  if (!md) return '';
  let s = md.replace(/\r\n/g, '\n');
  // fenced code
  s = s.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, body) =>
    `<pre><code class="lang-${lang || 'text'}">${escape(body)}</code></pre>`);
  // headings
  s = s.replace(/^### (.+)$/gm, '<h3>$1</h3>')
       .replace(/^## (.+)$/gm, '<h2>$1</h2>')
       .replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // images
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" loading="lazy" />');
  // links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  // bold/italic/inline-code
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
       .replace(/\*([^*]+)\*/g, '<em>$1</em>')
       .replace(/`([^`]+)`/g, '<code>$1</code>');
  // lists
  s = s.replace(/(^|\n)((?:- .+(?:\n|$))+)/g, (_, p, b) =>
    p + '<ul>' + b.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('') + '</ul>');
  // paragraphs
  s = s.split(/\n{2,}/).map(block => {
    if (/^\s*<(h\d|ul|ol|pre|blockquote|img)/.test(block)) return block;
    return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');
  return s;
}

export function readingMinutes(md) {
  const words = (md || '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
