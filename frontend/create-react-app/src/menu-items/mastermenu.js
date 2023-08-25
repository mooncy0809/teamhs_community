import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = {  IconBrandChrome, IconHelp  };

// ==============================|| MASTER MENU ITEMS ||============================== //


const matermenu = {
  id: 'master',
  title: <strong style={{ fontSize: '16px', color :"#673ab7" }}>관리자</strong>,
  type: 'group',
  children: [
    {
      id: 'Promblem',
      title: '문제관리',
      type: 'collapse',
      icon: icons.IconBrandChrome,
      children: [
        {
          id: 'ProblemList',
          title: '문제목록',
          type: 'item',
          url: '/problem/masterlist',
          breadcrumbs: false
        },
        {
          id: 'ProblemWrite',
          title: '문제작성',
          type: 'item',
          url: '/problem/write',
          breadcrumbs: false
        }
        
      ]
    },

    {
      id: 'Auth',
      title: '회원관리',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default matermenu;
