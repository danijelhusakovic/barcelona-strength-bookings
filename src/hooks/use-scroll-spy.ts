import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently visible in the viewport.
 * rootMargin accounts for the 64px fixed header + a generous bottom offset
 * so the active link updates reliably while scrolling through sections.
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = "-72px 0px -50% 0px",
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
