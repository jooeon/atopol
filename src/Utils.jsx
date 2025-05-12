// Format string to lowercase and replace spaces with dashes, remove parentheses
export function formatString(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')    // spaces → hyphens
    .replace(/\//g, '-')     // slashes → hyphens
    .replace(/[(),]/g, '');  // remove parentheses and commas
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

// Convert normal video URL to embed version
export const convertToEmbedURL = (url) => {
  // YouTube URL pattern
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/[^\n\s]+\/|(?:v|e(?:mbed))\/?)([a-zA-Z0-9_-]{11})(?:[?&][^\n\s]*)?|youtu\.be\/([a-zA-Z0-9_-]{11}))/;

  // Vimeo URL pattern (fixing the regex)
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/(?:[^\n\s]+\/)?([0-9]+))/;

  // Check if it's a YouTube URL
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    const videoId = youtubeMatch[1] || youtubeMatch[2];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Check if it's a Vimeo URL
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  // Return the URL as-is if it's neither YouTube nor Vimeo
  return url;
};

const artworkModules = import.meta.glob('./data/**/*.json');

export async function loadArtwork(group, title) {
  const key = `./data/${group}/${title}.json`;
  // console.log(artworkModules)
  const loader = artworkModules[key];
  if (!loader) throw new Error(`No artwork at ${key}`);
  const mod = await loader();
  return mod.default;
}

export function scrollToTop(lenis, immediate = true) {
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
}