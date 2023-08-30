import { httpService } from './httpService';

export const getData = async (url: string) => {
  const res = await httpService.get(url);

  return res;
};
