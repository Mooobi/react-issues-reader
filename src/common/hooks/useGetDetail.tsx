import { useEffect, useState } from 'react';
import { getData } from '../apis/api';
import { DetailType } from '../type/detail';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';

export default function useGetDetail(
  issueNumber: string,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [detail, setDetail] = useState<DetailType>();

  const fetchData = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await getData(
        `/repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues/${issueNumber}`,
      );
      setDetail(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { detail };
}
