import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import _ from "lodash";
import NotificationComponent from "../Notification/NotificationComponent";
import i18next from "i18next";
// import FooterComponent from "../Component/Footer/FooterComponent";
import { DataLanguages } from "../../../../containers/DefaultLayout/dataLanguages";
import SpinButtonComponent from "../Spin/SpinButton/SpinButtonComponent";
import HeaderComponent from "../Component/Header/HeaderComponent";
import { useForm } from "react-hook-form";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classNames from "classnames";
import { OIDC } from "../../../../config/constants";
import { listOIDCPublicSelector, loginAuthSelector } from "../../../../selectors/c4/authSelector";
import { resetDataError } from "../../../../actions/c4/auth";
import { getListOIDCPublic } from "../../../../actions/auth/oidc";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { loginAuth } from "../../../../actions/auth/auth";
import { whiteLabelSelector } from "../../../../selectors/c4/whiteLabelSelector";

const LoginComponent = () => {
  const listOidc = useSelector(listOIDCPublicSelector);
  const error = useSelector(loginAuthSelector);
  const whiteLabel = useSelector(whiteLabelSelector);
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const parsed = queryString.parse(location?.search);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [errorUri, setErrorUri] = useState("");
  const dataLanguages = DataLanguages();
  const btnRef = useRef();
  const [activeTab, setActiveTab] = useState('singpass');
  console.log(listOidc.data)
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const makeStateID = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    // $("body").removeClass();
    history.listen((location, action) => {
      if (action === "PUSH" && location.pathname === "/login") {
        dispatch(resetDataError());
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setErrorUri(parsed.error);
  }, [parsed.error]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (_.isObject(error)) {
      btnRef.current.toggleSpin();
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveTab(parsed?.t === "vkey" ? "vkey" : "singpass")
  }, [parsed?.t])

  const replaceRedirectUri = (data) => {
    return data?.redirectUri.replace(":oidc", data?.id);
  }

  const checkEmptyOIDC = (oidc) => {
    return !_.isEmpty(oidc.redirectUri) && !_.isEmpty(oidc.clientId);
  }

  useEffect(() => {
    if (listOidc.data.length > 0){
      // let singpass = _.find(listOidc.data, item => item.name.toLowerCase().indexOf(OIDC.singpass.toLowerCase()) >= 0);
      // let vkeyAuth = _.find(listOidc.data, item => item.name.toLowerCase().indexOf(OIDC.vkey.toLowerCase()) >= 0);

      try {
        // eslint-disable-next-line array-callback-return
        listOidc.data.map(item => {
          if (checkEmptyOIDC(item)) {
            if (item.name.toLowerCase().indexOf(OIDC.singpass.toLowerCase()) >= 0) {
              // $('#singpass script:first')?.remove();
              // eslint-disable-next-line no-undef
              TOFFSQR.init(`qr_${item.name?.replace(/ /g, "").toLowerCase()}`, {
                client_id: item.clientId,
                redirect_uri: replaceRedirectUri(item),
                scope: "openid",
                response_type: "code",
                state: makeStateID(5),
              });
            } else {
              const myNode = document.getElementById(`qr_${item.name?.replace(/ /g, "").toLowerCase()}`);
              if (myNode)
                myNode.textContent = '';
              // eslint-disable-next-line no-undef
              vkey.init({
                clientId: item.clientId,
                redirectUrl: replaceRedirectUri(item),
                serverUrl: process.env.REACT_APP_VKEY_SERVER_URL,
                responseType: "code",
                responseMode: "query"
              });

              // eslint-disable-next-line no-undef
              vkey.render(`#qr_${item.name?.replace(/ /g, "").toLowerCase()}`);
            }
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [listOidc.data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (listOidc.data.length > 0) {
      let active = _.find(listOidc.data, item => !_.isEmpty(item.clientId))
      let index = _.findIndex(listOidc.data, item => item.id === active.id);
      !_.isEmpty(active) && setActiveTab(active.name + index.toString())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listOidc.data]);

  useEffect(() => {
    dispatch(getListOIDCPublic());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = data => {
    btnRef.current.toggleSpin(true)
    let result = {
      username: data.username,
      password: data.password,
    };
    dispatch(loginAuth(result));
  };

  const showError = () => {
    if (!_.isEmpty(error)) {
      return (
        <div className="error">
          <span>{t("notification." + error.error)}</span>
        </div>
      );
    } else if (errorUri !== "") {
      return (
        <div className="error">
          <span>{errorUri}</span>
        </div>
      );
    }

    return null;
  };

  const changLanguage = (language) => {
    i18next.changeLanguage(language);
  };

  // eslint-disable-next-line no-unused-vars
  const loginWitlOIDC = (item) => {
    if (!_.isEmpty(item)) {
      const dataVkey = {
        client_id: item.clientId,
        redirect_uri: replaceRedirectUri(item),
        scope: "openid profile email phone address",
        response_type: "code",
        state: makeStateID(5)
      }
      window.location =  queryString.stringifyUrl({
        url: item.authUrl,
        query: {...dataVkey}
      });
    }
  }

  return (
    <div className="login-page bg-login ">
      <HeaderComponent />
      <div className="d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card-group mb-0">
                <div className="card p-3 login-content">
                  <div className="login-bg"></div>
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <img className="whitelabel-img"
                            // src={process.env.PUBLIC_URL + "/assets/img/icon.png"}
                            src={whiteLabel.data?.logo}
                            alt={whiteLabel.data?.domain}
                          />
                          <p className="text-muted mt-2">
                            {t("sign_in_to_your_account")}
                          </p>
                          {showError()}
                          <div className="input-group mb-4">
                            <span className="input-group-text">
                              <i className="fad fa-globe fa-lg" />
                            </span>
                            <select
                              type="text"
                              id="select-language"
                              className="form-control"
                              placeholder={t("placeholder.language")}
                              name="language"
                              value={i18n.language}
                              onChange={(e) => changLanguage(e.target.value)}
                            >
                              {dataLanguages.map((item, index) => (
                                <option key={index} value={item.key}>
                                  {item.value}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-4">
                            <div className="input-group">
                              <div className="input-group-text">
                                <i className="fad fa-user fa-lg" />
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("placeholder.username")}
                                name="username"
                                {...register("username", {
                                  required: t("validationForm.username")
                                })}
                              />
                            </div>
                            {errors.username && (
                              <span className="error-custom">
                                {errors.username.message}
                              </span>
                            )}
                          </div>
                          <div className="mb-4">
                            <div className="input-group">
                              <div className="input-group-text">
                                <i className="fad fa-lock fa-lg" />
                              </div>
                              <input
                                type="password"
                                className="form-control"
                                placeholder={t("placeholder.password")}
                                name="password"
                                autoComplete="new-password"
                                {...register("password", {
                                  required: t("validationForm.password")
                                })}
                              />
                            </div>
                            {errors.password && (
                              <span className="error-custom">
                                {errors.password.message}
                              </span>
                            )}
                          </div>

                          <div className="row mb-3">
                            <div className="col-12 col-sm-7">
                              <SpinButtonComponent
                                ref={btnRef}
                                id="login"
                                type="submit"
                                title={t("login")}
                                btnClassName="btn-square btn btn-primary fw-bold text-capitalize me-3"
                              />
                              <Link
                                className="btn-square btn btn-primary fw-bold"
                                to={"/choose-plan"}
                              >
                                {t("sign_up")}
                              </Link>
                            </div>
                            <div className="col-12 col-sm-5 mt-2 mt-sm-0 d-flex flex-row flex-sm-column justify-content-between align-items-end">
                              <Link to={"/forgot-password"}>
                                {t("forgot_password")}
                              </Link>
                              {process.env.REACT_APP_MODE_BUILD !==
                                "production" && (
                                <div className="text-uppercase">
                                  [{process.env.REACT_APP_MODE_BUILD}]
                                </div>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-lg-1 d-none d-lg-flex align-items-center justify-content-center login-separate-singpass">
                        OR
                      </div>
                      <div className="col-12 col-lg-5 d-flex align-items-center flex-column">
                        <Nav tabs className="tab-login border-0">
                          {listOidc.data.map((item, index) =>
                            checkEmptyOIDC(item) && <NavItem key={item.name + index} className="me-3">
                              <NavLink
                                className={classNames("pb-0", {
                                  active: activeTab === item.name + index,
                                })}
                                onClick={() => {
                                  toggle(item.name + index);
                                }}
                              >
                                {item.name}
                              </NavLink>
                            </NavItem>
                          )}
                        </Nav>
                        {listOidc.data.length > 0 && (
                          <TabContent className="w-100" activeTab={activeTab}>
                            {listOidc.data.map((item, index) =>
                              checkEmptyOIDC(item) && (
                                item.name.toLowerCase().indexOf(OIDC.singpass.toLowerCase()) >= 0 ? (
                                  <TabPane
                                    key={item.name + index}
                                    tabId={item.name + index}
                                    id="singpass"
                                    className="w-100"
                                  >
                                    <div id={`qr_${item.name.replace(/ /g, "").toLowerCase()}`}></div>
                                    <div className="text-center">
                                      {t("do_not_have_singpass_mobile")}{" "}
                                      <a href="/about/singpass">
                                        {t("find_out_more")}
                                      </a>
                                    </div>
                                  </TabPane>
                                ) : (
                                  <TabPane
                                    key={item.name + index}
                                    tabId={item.name + index}
                                    className="w-100"
                                  >
                                    <div id={`qr_${item.name.replace(/ /g, "").toLowerCase()}`} className="tab-vkey d-flex align-items-center justify-content-center">
                                      {/* <button
                                        className="btn btn-secondary px-5 py-2 text-capitalize"
                                        onClick={() => loginWitlOIDC(item)}
                                      >
                                        {item?.logo && _.isEmpty(item?.login) && (
                                          <img
                                            className="logo-vkey me-2"
                                            src={
                                              item.logo.indexOf("data:image") >= 0
                                                ? item.logo
                                                : "data:image/png;base64," +
                                                  item.logo
                                            }
                                            alt="logoVKey"
                                          />
                                        )}
                                        {item.buttonText}
                                      </button> */}
                                    </div>
                                  </TabPane>
                                )
                              )
                            )}
                          </TabContent>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationComponent />
      </div>
      {/* <FooterComponent /> */}
    </div>
  );
};

export default LoginComponent;
