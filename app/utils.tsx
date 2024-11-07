export function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/[#*_~`>]/g, '') // Remove Markdown syntax characters
    .replace(/\[(.*?)\]\((.*?)\)/g, '$2') // Replace links [title](url) with url
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Replace images ![alt](url) with "alt"
    .replace(/>\s?/g, '') // Remove blockquotes
    .replace(/^\s*-\s+/gm, '\n- ') // Retain unordered list markers
    .replace(/\n+/g, '\n') // Collapse multiple newlines
    .trim(); // Remove leading/trailing whitespace
}
