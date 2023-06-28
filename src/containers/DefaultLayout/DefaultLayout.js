import React, { useState, useEffect } from 'react';
import {CSidebar, CSidebarBrand, CSidebarNav} from '@coreui/react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';

const DefaultLayout = () => {
  const {locale, service} = useParams()
  const dispatch = useDispatch()

}

export default DefaultLayout