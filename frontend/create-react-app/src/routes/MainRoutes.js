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
const ProblemDetail = Loadable(lazy(() => import('views/problem-page/ProblemDetail')));
const ProblemEdit = Loadable(lazy(() => import('views/problem-page/ProblemEdit')));


// master page routing
const ProblemWrite = Loadable(lazy(() => import('views/master-page/ProblemWrite')));
const MasterProblemList = Loadable(lazy(() => import('views/master-page/MasterProblemList')));


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
        },
        {
          path: 'masterlist',
          element: <MasterProblemList />
        },
        {
          path: 'write',
          element: <ProblemWrite />
        },
        {
          path: 'detail/:problemId',
          element: <ProblemDetail />
        },
        {
          path: 'edit/:problemId',
          element: <ProblemEdit />
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
