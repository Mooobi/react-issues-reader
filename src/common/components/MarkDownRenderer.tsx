import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { styled } from 'styled-components';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Wrapper>
      <ReactMarkdown rehypePlugins={[remarkGfm]}>{content}</ReactMarkdown>;
    </Wrapper>
  );
}

const Wrapper = styled.div`
  a {
    color: rgb(120, 156, 255);
  }
`;
