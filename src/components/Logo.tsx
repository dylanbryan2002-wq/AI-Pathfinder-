'use client';

import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7CFC00 0%, #00E5CC 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: 'Comfortaa', cursive;
  letter-spacing: -1px;
  position: relative;
`;

const LogoCircleText = styled.span`
  background: linear-gradient(135deg, #7CFC00 0%, #00E5CC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-text-stroke: 3px white;
  paint-order: stroke fill;
`;

const LogoText = styled.h1`
  font-family: 'Comfortaa', cursive;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #38b6ff 0%, #5ecee6 50%, #40b6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export function Logo() {
  return (
    <LogoContainer>
      <LogoCircle>
        <LogoCircleText>pf</LogoCircleText>
      </LogoCircle>
      <LogoText>ai-pathfinder</LogoText>
    </LogoContainer>
  );
}
