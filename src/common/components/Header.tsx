import { styled } from 'styled-components';

export default function Header() {
  return (
    <Wrapper>
      <div>Organization Name</div>
      <div>/</div>
      <div>Repository Name</div>
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
