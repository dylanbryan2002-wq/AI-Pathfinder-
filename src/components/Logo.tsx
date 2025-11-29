'use client';

import styled from 'styled-components';
import Image from 'next/image';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const LogoCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const LogoText = styled.h1`
  font-family: 'Comfortaa', cursive;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #7CFC00 0%, #7CFC00 20%, #00CED1 40%, #4A90E2 70%, #5DD9FC 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;

export function Logo() {
  return (
    <LogoContainer>
      <LogoCircle>
        <Image
          src="/logo-icon.jpeg"
          alt="AI Pathfinder Logo"
          width={70}
          height={70}
          style={{ objectFit: 'cover', background: 'transparent' }}
        />
      </LogoCircle>
      <LogoText>pathfinder</LogoText>
    </LogoContainer>
  );
}
