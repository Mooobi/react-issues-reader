import { styled } from 'styled-components';
import useGetList from '../hooks/useGetList';
import Card from './Card';
import { useInView } from 'react-intersection-observer';

export default function List() {
  const [ref, inView] = useInView();
  const { list } = useGetList(inView);

  return (
    <Wrapper>
      {list?.map((card) => <Card key={card.id} card={card} />)}
      <div ref={ref} />
    </Wrapper>
  );
}

const Wrapper = styled.ul``;
