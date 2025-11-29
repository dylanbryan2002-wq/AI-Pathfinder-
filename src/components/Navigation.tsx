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
  color: ${({ $active }) => ($active ? '#000000' : '#000000')};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  position: relative;

  &:hover {
    color: #000000;
  }
`;

const NavIcon = styled.div<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ $active }) => ($active ? '#000000' : 'none')};
    stroke: ${({ $active }) => ($active ? 'none' : '#000000')};
    stroke-width: 2.5;
  }
`;

const CenterButton = styled.div<{ $active: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(circle at center,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 5%,
    rgba(200, 255, 100, 0.8) 15%,
    rgba(124, 252, 0, 0.9) 30%,
    rgba(0, 229, 204, 1) 55%,
    rgba(0, 191, 255, 1) 80%,
    rgba(0, 150, 255, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};

  ${({ $active }) =>
    $active &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: radial-gradient(circle,
        rgba(180, 255, 100, 0.3) 0%,
        rgba(170, 255, 100, 0.25) 20%,
        rgba(160, 255, 100, 0.18) 35%,
        rgba(150, 255, 100, 0.12) 50%,
        rgba(140, 255, 100, 0.08) 65%,
        rgba(130, 255, 100, 0.04) 80%,
        rgba(124, 252, 0, 0.01) 90%,
        rgba(124, 252, 0, 0) 100%);
      z-index: -1;
      filter: blur(8px);
    }
  `}

  &:hover {
    transform: scale(1.05);
  }
`;

const CenterButtonInner = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
`;

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isHomeActive = pathname === '/' || pathname === '/action-plan';

  return (
    <NavContainer>
      {/* Home Icon */}
      <NavItem href="/" $active={isHomeActive}>
        <NavIcon $active={isHomeActive}>
          <svg viewBox="0 0 24 24" fill="none">
            {/* House body - split into sections to avoid door area */}
            <path
              d={isHomeActive
                ? "M4 10L12 3L20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H15.5V13C15.5 12.4477 15.0523 12 14.5 12H9.5C8.94772 12 8.5 12.4477 8.5 13V22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10Z"
                : "M4 10L12 3L20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H14.5V13C14.5 12.4477 14.0523 12 13.5 12H10.5C9.94772 12 9.5 12.4477 9.5 13V22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10Z"
              }
              fill={isHomeActive ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Door sides - only show when not active */}
            {!isHomeActive && (
              <>
                <line x1="9.5" y1="13" x2="9.5" y2="22" stroke="currentColor" strokeWidth="2.5" />
                <line x1="14.5" y1="13" x2="14.5" y2="22" stroke="currentColor" strokeWidth="2.5" />
              </>
            )}
          </svg>
        </NavIcon>
      </NavItem>

      {/* Center AI Chat Button */}
      <CenterButton $active={isActive('/chat')} as={Link} href="/chat">
        <CenterButtonInner />
      </CenterButton>

      {/* Jobs/Briefcase Icon */}
      <NavItem href="/jobs" $active={isActive('/jobs')}>
        <NavIcon $active={isActive('/jobs')}>
          <svg viewBox="0 0 24 24" fill="none">
            {/* Main body */}
            <rect
              x="3"
              y="9"
              width="18"
              height="11"
              rx="2"
              fill={isActive('/jobs') ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Handle - always stroked, never filled */}
            <path
              d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </NavIcon>
      </NavItem>

      {/* Profile Icon */}
      <NavItem href="/profile" $active={isActive('/profile')}>
        <NavIcon $active={isActive('/profile')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </NavIcon>
      </NavItem>
    </NavContainer>
  );
}
