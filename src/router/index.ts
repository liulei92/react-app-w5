/*
 * @Description: router
 * @Date: 2021-07-27 16:45:40
 * @Author: LeiLiu
 */
import { lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ '../pages/About'));

export const routerConfig = [
  {
    path: '/home',
    title: 'Home',
    hidden: false,
    exact: true,
    component: Home
  },
  {
    path: '/about',
    title: 'About',
    hidden: false,
    exact: true,
    component: About
  }
];

export type routerConfigType = typeof routerConfig;