import React, { Suspense, useEffect } from "react";
import _ from 'lodash';
import DefaultLayout from "./DefaultLayout";
import { getMe } from "../../actions/c4/auth";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthSelector } from "../../selectors/c4/authSelector";
import { useDispatch } from "react-redux";

const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

const DefaultApp = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const auth = useSelector(getAuthSelector)

  useEffect(() => {
    dispatch(getMe())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.service])

  return (
    <Suspense fallback={loading()}>
      {
        !_.isEmpty(auth) && <DefaultLayout />
      }
    </Suspense>
  )
}

export default DefaultApp