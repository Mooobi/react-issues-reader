import { styled } from 'styled-components';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';

export default function Header() {
  return (
    <Wrapper>
      <div>{`${ORGANIZATION_NAME} / ${REPOSITORY_NAME}`}</div>
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
