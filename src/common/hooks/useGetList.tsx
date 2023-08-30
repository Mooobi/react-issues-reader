import { useEffect, useState } from 'react';
import { getData } from '../apis/api';
import { ListType } from '../type/list';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';

export default function useGetList(inView: boolean) {
  const [list, setList] = useState<ListType>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const parseUrl = (link: string) => {
    if (link) {
      const match = link
        .split(',')
        .find((url: string) => url.includes('next'))
        ?.match(/<([^>]+)>/);
      if (match) {
        const url = match[1];
        return url;
      }
    }
    return null;
  };

  const fetchData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await getData(
        page === 1
          ? `/repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments`
          : `${url}&sort=comments`,
      );
      const nextUrl = parseUrl(result.headers.link as string);
      setUrl(nextUrl as string);
      setList((prevList) => [...prevList, ...result.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { list };
}
