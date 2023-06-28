import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import _ from "lodash";

export const RouterContext = React.createContext()

const RouterProvider = ({ children }) => {
  const location = useLocation()
  const [route, setRoute ] = useState({
    to: location,
    from: [location]
  })

  useEffect(() => {
    if (!_.isEqual(location.pathname, route.to?.pathname)) {
      if(location?.state?.isBack) {
        setRoute((prev) => ({ to: location, from: prev.from.slice(1, prev.from.length) }))
      } else {
        setRoute((prev) => ({ to: location, from: _.uniqBy([ ...[prev.to],...prev.from], 'pathname') }))
      }
    } else {
      setRoute((prev) => ({to: {...prev.to, search: location.search}, from: prev.from}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return <RouterContext.Provider value={route}>
    {children}
  </RouterContext.Provider>
}

export default RouterProvider
