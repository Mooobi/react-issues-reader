import { styled } from 'styled-components';

export default function Loading() {
  return <Wrapper>Loading...</Wrapper>;
}

const Wrapper = styled.div`
  border-bottom: 1px solid #cdcdcd;
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff7b7b;
  background: #cecece;
  font-size: 1.5rem;
  font-weight: bold;
`;
