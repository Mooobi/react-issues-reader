import { useEffect, useState } from 'react';
import { getData } from '../apis/api';
import { ListType } from '../type/list';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';
import { parseUrl } from '../util/parseUrl';

export default function useGetList(
  inView: boolean,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [list, setList] = useState<ListType>([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('');

  const fetchData = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
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
      setIsLoading(false);
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
