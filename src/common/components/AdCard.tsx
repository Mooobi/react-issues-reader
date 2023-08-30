import { styled } from 'styled-components';
import wantedLogo from '../assets/image/wantedLogo.webp';
import { Link } from 'react-router-dom';

export default function AdCard() {
  return (
    <Link to='https://www.wanted.co.kr/' target='_blank'>
      <Wrapper>
        <img src={wantedLogo} alt='adImage' />
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.li`
  border-bottom: 1px solid #cdcdcd;
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
