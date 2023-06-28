import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { ServiceData } from "../config/constants"
import { baseLocale, baseService } from '../config/router';
import { lazyWithRetry } from '../Utils/LazyLoad';

// Containers
const DefaultApp = lazyWithRetry()
