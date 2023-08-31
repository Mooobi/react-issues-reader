import { styled } from 'styled-components';
import { ORGANIZATION_NAME, PATH_MAIN, REPOSITORY_NAME } from '../constants/constants';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Wrapper>
      <Link to={PATH_MAIN}>
        <div>{`${ORGANIZATION_NAME} / ${REPOSITORY_NAME}`}</div>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  top: 0;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border-bottom: 1px solid #cdcdcd;
  background: white;
  font-size: 1.5rem;
  font-weight: bold;
`;
