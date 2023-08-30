import { styled } from 'styled-components';
import useGetList from '../hooks/useGetList';
import Card from './Card';
import { useInView } from 'react-intersection-observer';
import AdCard from './AdCard';
import { CONTENT_COUNT } from '../constants/constants';
import { useState } from 'react';

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const { list } = useGetList(inView, isLoading, setIsLoading);

  if (!list) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      {list?.map((card, index) => (
        <>
          <Card key={card.id} card={card} />
          {!((index + 1) % CONTENT_COUNT) && <AdCard key={`ad-${index}`} />}
        </>
      ))}
      <div ref={ref} />
      {isLoading && <LoadingCard>Loading...</LoadingCard>}
    </Wrapper>
  );
}

const Wrapper = styled.ul``;

const LoadingCard = styled.li`
  border-bottom: 1px solid #cdcdcd;
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
