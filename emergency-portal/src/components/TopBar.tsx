import { type ReactNode, useLayoutEffect, useRef } from "react";

type TopBarProps = {
  // Replaces the "ADAM Notfallzugang" text, e.g. with the code type on the data page
  title?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
};

// Sticky bar with the ADAM mark, optional right side and optional second row.
// Its height is published as --topbar-height, so jump links stop below the bar instead of under it.
export function TopBar({ title, right, children }: TopBarProps) {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const publish = () => document.documentElement.style.setProperty("--topbar-height", `${header.offsetHeight}px`);
    publish();

    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="topbar" ref={headerRef}>
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          {title ?? <span>ADAM Notfallzugang</span>}
        </div>
        {right}
      </div>
      {children}
    </header>
  );
}
