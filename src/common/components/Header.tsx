import { styled } from 'styled-components';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/URL';

export default function Header() {
  return (
    <Wrapper>
      <div>{`${ORGANIZATION_NAME} / ${REPOSITORY_NAME}`}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  height: 10%;
  border-bottom: 1px solid #cdcdcd;
  padding: 1rem;
`;
