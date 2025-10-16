'use client';

import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  max-width: 600px;
`;

export default function Home() {
  return (
    <Container>
      <Title>ai-pathfinder</Title>
      <Subtitle>
        Your Personal Career Advisor - Discover, explore, and commit to your ideal career path
      </Subtitle>
    </Container>
  );
}
