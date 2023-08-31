import { styled } from 'styled-components';
import useGetList from '../hooks/useGetList';
import Card from './Card';
import AdCard from './AdCard';
import { CONTENT_COUNT } from '../constants/constants';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import useObserver from '../hooks/useObserver';

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const { entry, setTarget } = useObserver();
  const { list, fetchData } = useGetList(isLoading, setIsLoading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  return (
    <Wrapper>
      {list?.map((card, index) => (
        <div key={card.id}>
          <Card card={card} ref={list.length - 1 === index ? setTarget : null} />
          {!((index + 1) % CONTENT_COUNT) && <AdCard />}
        </div>
      ))}
      {isLoading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.ul``;
