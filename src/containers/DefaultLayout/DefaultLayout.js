import React, { useState, useEffect } from 'react';
import {CSidebar, CSidebarBrand, CSidebarNav} from '@coreui/react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector } from '../../selectors/c4/authSelector';
import { getSidebarShowSelector } from '../../selectors/c4/spinSelector';
import { whiteLabelSelector } from '../../selectors/c4/whiteLabelSelector';
import { ServiceData } from '../../config/constants';
import { changeStatusMenu } from '../../actions/ui/menu';

const DefaultLayout = () => {
  const {locale, service} = useParams()
  const dispatch = useDispatch()
  const auth = useSelector(getAuthSelector)
  const sidebarShow = useSelector(getSidebarShowSelector)
  const whiteLabel = useSelector(whiteLabelSelector)
  const [navigation, setNavigation] = useState([])

  // const dataNav = () => {
  //   let nav = []
  //   if (auth) {
  //     switch (service) {
  //       case ServiceData.c4
  //     }
  //   }
  // }


  return (
    <div className="app">
      <CSidebar
        position='fixed'
        visible={sidebarShow.sidebarShow}
        onVisibleChange={(visible) => dispatch(changeStatusMenu({ sidebarShow: visible }))}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <img className="sidebar-brand-full" src={whiteLabel.data?.logo} alt='ToffsTech' height={50} width='auto' />
        </CSidebarBrand>
      </CSidebar>
    </div>
  )
}

export default DefaultLayout