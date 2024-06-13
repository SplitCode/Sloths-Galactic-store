import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
interface ThemeProviderProps {
  children: ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { accentColor } = useAppSelector((state) => state.planet_slice);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (accentColor && rootRef.current) {
      rootRef.current.style.setProperty('--accent-color-dark', accentColor.Dark);
      rootRef.current.style.setProperty('--accent-color-light', accentColor.Light);
    }
  }, [accentColor]);
  return (
    <div ref={rootRef} className="theme_provider">
      {children}
    </div>
  );
}
