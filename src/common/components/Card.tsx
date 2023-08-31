import { styled } from 'styled-components';
import { DetailType } from '../type/detail';
import getDate from '../util/getDate';
import { AUTHOR, COMMENT, CREATED_AT } from '../constants/constants';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function Card({ card }: { card: DetailType }) {
  return card ? (
    <Link to={`detail/${card.number}`}>
      <Wrapper>
        <Container>
          <TitleSection>{`#${card.number} ${card.title}`}</TitleSection>
          <AuthorSection>{`${AUTHOR}: ${card.user.login} ${CREATED_AT}: ${getDate(
            card.created_at,
            card.updated_at,
          )}`}</AuthorSection>
        </Container>
        <CommentSection>{`${COMMENT} ${card.comments}`}</CommentSection>
      </Wrapper>
    </Link>
  ) : (
    <Loading />
  );
}

const Wrapper = styled.li`
  border-bottom: 1px solid #cdcdcd;
  height: 3rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  max-width: 90%;
  min-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

const TitleSection = styled.h2`
  font-size: 1.25rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`;

const CommentSection = styled.div`
  font-size: 0.875rem;
  width: 10%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthorSection = styled.div`
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
