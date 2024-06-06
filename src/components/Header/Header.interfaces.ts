export interface ToggleMenuProps {
  toggleMenuOpen?: () => void;
}

export interface CustomNavLinkProps extends ToggleMenuProps {
  text: string;
  to: '/login' | '/register' | '/catalog' | '/about' | '/' | '/profile' | '/basket';
}

export interface NavigationProps extends ToggleMenuProps {
  menuOpen: boolean;
}

export interface BurgerButtonProps extends ToggleMenuProps {
  menuOpen: boolean;
}

export interface LogoProps {
  closeMenu: () => void;
}
