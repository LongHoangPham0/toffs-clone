import { Suspense } from "react";
import { lazyWithRetry } from "./Utils/LazyLoad";
import { whiteLabelSelector } from "./selectors/c4/whiteLabelSelector";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import _ from "lodash";

// Containers
// const ServiceApp = lazyWithRetry

const loading = () => <div className="loader"></div>

const Language = () => {
  const dispatch = useDispatch();
  const whiteLabel = useSelector(whiteLabelSelector)

  return (
    <Suspense fallback={loading()}>
      {
        !_.isEmpty(whiteLabel.data) && <Switch>
          
        </Switch>
      }
    </Suspense>
  )
}