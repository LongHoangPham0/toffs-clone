import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import queryString from "query-string"
import _ from "lodash"
import i18next from "i18next"
import HeaderComponent from "../Component/Header/HeaderComponent"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { loginAuth } from "../../../../actions/auth/auth"
import { whiteLabelSelector } from "../../../../selectors/c4/whiteLabelSelector"
import { useTranslation } from "react-i18next"
import { loginAuthReducer } from "../../../../reducers/auth/authReducer"
import { DataLanguages } from "../../../../containers/DefaultLayout/dataLanguages"

const LoginComponent = () => {
  const whiteLabel = useSelector(whiteLabelSelector)
  const error = useSelector(loginAuthReducer)
  const {t, i18n} = useTranslation();
  const { register, handleSubmit, formState: { errors }} = useForm()
  const [errorUri, setErrorUri] = useState("")
  const dataLanguages = DataLanguages()
  const btnRef = useRef()
  const dispatch = useDispatch()

  const onSubmit = data => {
    btnRef.current.toggleSpin(true)
    let result = {
      username: data.username,
      password: data.password,
    }
    dispatch(loginAuth(result))
  }

  const showError = () => {
    if (!_.isEmpty(error)) {
      return (
        <div className="error">
          <span>{t("notification." + error.error)}</span>
        </div>
      )
    } else if (errorUri !== "") {
      return (
        <div className="error">
          <span>{errorUri}</span>
        </div>
      )
    }

    return null
  }

  const changeLanguage = (language) => {
    i18next.changeLanguage(language)
  }

  return (
    <div className="login-page bg-login">
      <HeaderComponent />
      <div className="d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card-group mb-0">
                <div className="card p-3 login-content">
                  <div className="login-bg"></div></div>
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <img className="whitelabel-img"
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
                              onChange={(e) => changeLanguage(e.target.value)}
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

                          <div className="row mb-3">
                            <div className="col-12 col-sm-7">

                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent