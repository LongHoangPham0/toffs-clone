import { GET_LIST_OIDC_PUBLIC_API } from './common/path';
import * as ApiExternalAuth from './common/serverExternalAuth';

export const getListOIDCPublic = () => {
  return ApiExternalAuth.get(GET_LIST_OIDC_PUBLIC_API);
}