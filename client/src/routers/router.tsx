import { Navigate, createBrowserRouter } from 'react-router-dom';
import RoutePath from './path';
import Login from '@/pages/login';
import AsyncComponent from '@/components/async-component';
import { lazy } from 'react';
import Main from '@/pages/main';

const Test = AsyncComponent(lazy(() => import('@/pages/test')));
const ErrorPage = AsyncComponent(lazy(() => import('@/pages/error')));

const Chat = AsyncComponent(lazy(() => import('@/pages/main/chat')));
const Knowledge = AsyncComponent(lazy(() => import('@/pages/main/knowledge')));
const Connection = AsyncComponent(lazy(() => import('@/pages/main/connections')));

const router = createBrowserRouter([
  {
    path: RoutePath.LOGIN,
    element: <Login />
  },
  {
    path: RoutePath.MAIN,
    element: <Main />,
    children: [
      {
        index: true,
        element: <Chat />
      },
      {
        path: RoutePath.CHAT,
        element: <Chat />
      },
      {
        path: RoutePath.KNOWLEDGE,
        element: <Knowledge />
      },
      {
        path: RoutePath.CONNECTION,
        element: <Connection />
      }
    ]
  },
  {
    path: RoutePath.TEST,
    element: <Test />
  },
  {
    path: RoutePath.APP,
    element: <Navigate to={RoutePath.LOGIN} />
  },
  {
    path: RoutePath.WITHOUT_MATCH,
    element: <ErrorPage />
  }
]);

export default router;
