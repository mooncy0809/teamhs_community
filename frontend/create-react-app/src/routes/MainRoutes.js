import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

//경로 설정
import BoardWrite from 'views/Community/boardwrite';
import BoardWatch from 'views/Community/boardwatch';
import BoardEdit from 'views/Community/boardEdit';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// problem page routing
const ProblemList = Loadable(lazy(() => import('views/problem-page/ProblemList')));
const ProblemWrite = Loadable(lazy(() => import('views/problem-page/ProblemWrite')));
const UtilsColor = Loadable(lazy(() => import('views/problem-page/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/problem-page/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/problem-page/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/problem-page/TablerIcons')));

// sample page routing
const BoardList = Loadable(lazy(() => import('views/Community')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'problem',
      children: [
        {
          path: 'list',
          element: <ProblemList />
        }
      ]
    },
    {
      path: 'problem',
      children: [
        {
          path: 'write',
          element: <ProblemWrite />
        }
      ]
    },
    {
      path: 'problem',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'problem',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <BoardList />
    }, 
    {
      path: 'sample-page/boardwrite',
      element: <BoardWrite />
    },
    {
      path: 'sample-page/boardwatch/:board_id', 
      element: <BoardWatch />
    },
    {
      path: 'sample-page/boardEdit/:board_id', 
      element: <BoardEdit />
    }
  ]
};

export default MainRoutes;
