// For creating artwork detail page links
// To lowercase and replace spaces with dashes, remove parentheses
import { Fragment } from 'react';

export function formatString(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
}

export function isEven(number) {
  return number % 2 === 0;
}

export function formatNewline(text = '') {
  return text
    // any <br>, <br/> or <br /> → newline
    .replace(/<br\s*\/?>/gi, '\n')
    // literal backslash+n (two‐char sequence) → newline
    .replace(/\\n/g, '\n');
}