export function cutSentence(text?: string) {
  if (!text) return;

  const punctuationIndex = text.search(/[.?!]/);
  if (punctuationIndex === -1) return text;

  return text.substring(0, punctuationIndex + 1);
}
