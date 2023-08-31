import { useEffect, useState } from 'react';

export default function useObserver() {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [target]);

  return { entry, setTarget };
}
