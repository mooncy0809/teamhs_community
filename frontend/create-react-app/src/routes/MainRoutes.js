import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//board page routing
const BoardWrite = Loadable(lazy(() => import('views/board-page/BoardWrite')));
const BoardDetail = Loadable(lazy(() => import('views/board-page/BoardDetail')));
const BoardEdit = Loadable(lazy(() => import('views/board-page/BoardEdit')));
const BoardList = Loadable(lazy(() => import('views/board-page')));


// problem page routing
const ProblemList = Loadable(lazy(() => import('views/problem-page/ProblemList')));
const ProblemDetail = Loadable(lazy(() => import('views/problem-page/ProblemDetail')));
const ProblemEdit = Loadable(lazy(() => import('views/problem-page/ProblemEdit')));

// master page routing
const ProblemWrite = Loadable(lazy(() => import('views/master-page/ProblemWrite')));
const MasterProblemList = Loadable(lazy(() => import('views/master-page/MasterProblemList')));

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
      path: 'board',
      children: [

        {
          path: 'list',
          element: <BoardList />
        }, 
        {
          path: 'write',
          element: <BoardWrite />
        },
        {
          path: 'detail/:boardId', 
          element: <BoardDetail />
        },
        {
          path: 'edit/:boardId', 
          element: <BoardEdit />
        }
      ]
    },
  ]
};

export default MainRoutes;
