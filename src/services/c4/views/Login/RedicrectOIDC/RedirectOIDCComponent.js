import React, { useEffect } from 'react';
import queryString from 'query-string';
import { getAccessTokenOIDC } from '../../../../../actions/auth/auth';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { whiteLabelSelector } from '../../../../../selectors/c4/whiteLabelSelector';

const RedirectOIDCComponent = () => {
  const whiteLabel = useSelector(whiteLabelSelector)
  const location = useLocation()
  const parsed = queryString.parse(location?.search)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAccessTokenOIDC({
      AuthorizeCode: parsed?.code || "",
      Id: params?.oidc
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-login callback-page">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="content-callback">
          <img className="whitelabel-img"
              // src={process.env.PUBLIC_URL + "/assets/img/icon.png"}
              // alt="toffstech-logo"
              src={whiteLabel.data?.logo}
              alt={whiteLabel.data?.domain}
          />
          <div className="alert alert-success" role="alert">
            <p className="title mb-0 fw-bold">
              <i className="fad fa-check-circle me-2"/>
              Signing In with your account
            </p>
            <span className="content ms-4">This windown will redirect automatically</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedirectOIDCComponent;
