export const parseUrl = (link: string) => {
  if (link) {
    const match = link
      .split(',')
      .find((url: string) => url.includes('next'))
      ?.match(/<([^>]+)>/);
    if (match) {
      const url = match[1];
      return url;
    }
  }
  return null;
};
