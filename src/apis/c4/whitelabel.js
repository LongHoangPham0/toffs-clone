import { GET_WHITE_LABEL_API } from './common/path';
import * as Api from './common/server';

export const getWhiteLabel = (domainName) => {
  return Api.getNoAuth(GET_WHITE_LABEL_API + "?domain=" + domainName)
}