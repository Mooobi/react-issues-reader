import { useParams } from 'react-router';
import { styled } from 'styled-components';
import useGetDetail from '../../common/hooks/useGetDetail';
import { useState } from 'react';
import MarkdownRenderer from '../../common/components/MarkDownRenderer';
import { AUTHOR, COMMENT, CREATED_AT } from '../../common/constants/constants';
import getDate from '../../common/util/getDate';
import Loading from '../../common/components/Loading';

export default function Detail() {
  const [isLoading, setIsLoading] = useState(false);
  const { number: issueNumber } = useParams();

  const { detail } = useGetDetail(issueNumber as string, isLoading, setIsLoading);

  return detail ? (
    <Wrapper>
      <Header>
        <Avatar src={detail.user.avatar_url} />
        <Container>
          <TitleSection>{`#${detail.number} ${detail.title}`}</TitleSection>
          <AuthorSection>{`${AUTHOR}: ${detail.user.login} ${CREATED_AT}: ${getDate(
            detail.created_at,
            detail.updated_at,
          )}`}</AuthorSection>
        </Container>
        <CommentSection>{`${COMMENT} ${detail.comments}`}</CommentSection>
      </Header>
      <Article>
        <MarkdownRenderer content={detail?.body as string} />
      </Article>
    </Wrapper>
  ) : (
    <Loading />
  );
}

const Wrapper = styled.main``;

const Header = styled.header`
  border-bottom: 1px solid #cdcdcd;
  height: 3rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.img`
  height: 2.5rem;
  margin-right: 1rem;
  border-radius: 50%;
`;

const Container = styled.div`
  max-width: 85%;
  min-width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

const TitleSection = styled.h2`
  font-size: 0.875rem;
  white-space: wrap;
`;

const CommentSection = styled.div`
  font-size: 0.875rem;
  width: 15%;
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

const Article = styled.article`
  line-height: 1.5rem;
  padding: 1rem;
`;
