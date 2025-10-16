'use client';

import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${({ theme}) => theme.colors.background.secondary};
  border-top: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.nav.active : theme.colors.nav.inactive};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.nav.active};
  }
`;

const NavIcon = styled.div<{ $active: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ $active }) => ($active ? 'currentColor' : 'currentColor')};
  }
`;

const CenterButton = styled.div<{ $active: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $active, theme }) =>
    $active
      ? theme.colors.nav.glow
      : theme.colors.voice.inactive};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};

  ${({ $active }) =>
    $active &&
    `
    box-shadow: 0 0 20px rgba(127, 231, 168, 0.5);
    animation: pulse 2s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(127, 231, 168, 0.5);
    }
    50% {
      box-shadow: 0 0 30px rgba(79, 164, 254, 0.7);
    }
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const CenterButtonInner = styled.div`
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.text.white};
  }
`;

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <NavContainer>
      {/* Home/Chat Icon */}
      <NavItem href="/chat" $active={isActive('/chat')}>
        <NavIcon $active={isActive('/chat')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"/>
          </svg>
        </NavIcon>
      </NavItem>

      {/* Center AI Button */}
      <CenterButton $active={isActive('/chat')} as={Link} href="/chat">
        <CenterButtonInner>
          {/* AI Icon / Voice Blob */}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </CenterButtonInner>
      </CenterButton>

      {/* Jobs/Briefcase Icon */}
      <NavItem href="/jobs" $active={isActive('/jobs')}>
        <NavIcon $active={isActive('/jobs')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm5 10h-4v-2h4v2z"/>
          </svg>
        </NavIcon>
      </NavItem>

      {/* Profile Icon */}
      <NavItem href="/profile" $active={isActive('/profile')}>
        <NavIcon $active={isActive('/profile')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"/>
          </svg>
        </NavIcon>
      </NavItem>
    </NavContainer>
  );
}
