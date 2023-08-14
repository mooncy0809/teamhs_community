import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = {  IconBrandChrome, IconHelp  };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //


const dashboard = {
  id: 'master',
  title: '관리자',
  type: 'group',
  children: [
    {
      id: 'Promblem',
      title: '문제관리',
      type: 'item',
      url:  '/dashboard/default',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
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

export default dashboard;
