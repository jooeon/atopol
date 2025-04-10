// For creating artwork detail page links
// To lowercase and replace spaces with dashes, remove parentheses
export function formatString(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
}