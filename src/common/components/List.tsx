import { styled } from 'styled-components';
import useGetList from '../hooks/useGetList';
import Card from './Card';
import { useInView } from 'react-intersection-observer';
import AdCard from './AdCard';
import { CONTENT_COUNT } from '../constants/constants';
import { useState } from 'react';
import Loading from './Loading';

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const { list } = useGetList(inView, isLoading, setIsLoading);

  if (!list) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      {list?.map((card, index) => (
        <div key={card.id}>
          <Card card={card} />
          {!((index + 1) % CONTENT_COUNT) && <AdCard />}
        </div>
      ))}
      <div ref={ref} />
      {isLoading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.ul``;
