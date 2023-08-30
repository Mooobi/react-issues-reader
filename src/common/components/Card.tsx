import { styled } from 'styled-components';
import { CardType } from '../type/card';
import getDate from '../util/getDate';
import { AUTHOR, CREATED_AT } from '../constants/constants';

export default function Card({ card }: { card: CardType }) {
  return (
    <Wrapper>
      <Container>
        <TitleSection>{`#${card.number} ${card.title}`}</TitleSection>
        <AuthorSection>{`${AUTHOR}: ${card.user.login} ${CREATED_AT}: ${getDate(
          card.created_at,
          card.updated_at,
        )}`}</AuthorSection>
      </Container>
      <CommentSection>{`코멘트 ${card.comments}`}</CommentSection>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  border-bottom: 1px solid #cdcdcd;
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  max-width: 80%;
  min-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.2rem;
`;

const TitleSection = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommentSection = styled.div`
  font-size: 0.875rem;
  width: 20%;
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
