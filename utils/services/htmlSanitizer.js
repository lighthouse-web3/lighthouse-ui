import DOMPurify from 'dompurify';

export const sanitizeHTML = (dirtyHTML) => {
  const config = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    KEEP_CONTENT: true,
  };
  
  if (typeof window === 'undefined') {
    return dirtyHTML; // SSR fallback
  }
  
  return DOMPurify.sanitize(dirtyHTML, config);
};