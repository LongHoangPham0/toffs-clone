import { GET_ME_URL } from './common/path';
import * as Api from './common/server';

export const getMe = () => {
  return Api.get(GET_ME_URL)
}