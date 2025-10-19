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
  color: ${({ $active }) => ($active ? '#000000' : '#9CA3AF')};
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
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
`;

const CenterButton = styled.div<{ $active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $active }) =>
    $active
      ? `radial-gradient(circle, #7CFC00 0%, #00E5CC 50%, #00BFFF 100%)`
      : 'linear-gradient(135deg, #00E5CC 0%, #00BFFF 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};

  ${({ $active }) =>
    $active &&
    `
    box-shadow:
      0 0 25px rgba(124, 252, 0, 0.6),
      0 0 40px rgba(0, 229, 204, 0.4),
      0 0 55px rgba(0, 191, 255, 0.3);
    animation: pulse 2s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%, 100% {
      box-shadow:
        0 0 25px rgba(124, 252, 0, 0.6),
        0 0 40px rgba(0, 229, 204, 0.4),
        0 0 55px rgba(0, 191, 255, 0.3);
    }
    50% {
      box-shadow:
        0 0 35px rgba(124, 252, 0, 0.8),
        0 0 50px rgba(0, 229, 204, 0.6),
        0 0 70px rgba(0, 191, 255, 0.4);
    }
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const CenterButtonInner = styled.div`
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0) 100%);
  border-radius: 50%;
  filter: blur(0.8px);
`;

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <NavContainer>
      {/* Home Icon */}
      <NavItem href="/" $active={isActive('/')}>
        <NavIcon $active={isActive('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
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
