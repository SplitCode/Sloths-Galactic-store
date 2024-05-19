import { useState, useEffect } from 'react';

export function useMenuToggle() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { menuOpen, toggleMenuOpen, closeMenu };
}
