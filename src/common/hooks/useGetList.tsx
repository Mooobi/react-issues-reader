import { useCallback, useState } from 'react';
import { getData } from '../apis/api';
import { ListType } from '../type/list';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';
import { parseUrl } from '../util/parseUrl';

export default function useGetList(
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [list, setList] = useState<ListType>([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [url, setUrl] = useState('');

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const fetchUrl = isFirstPage
        ? `/repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments`
        : `${url}&sort=comments`;

      const result = await getData(fetchUrl);
      const nextUrl = parseUrl(result.headers.link as string);
      setUrl(nextUrl as string);
      setList((prevList) => [...prevList, ...result.data]);
      setIsFirstPage(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, isFirstPage, url]);

  return { list, fetchData, isLoading };
}
