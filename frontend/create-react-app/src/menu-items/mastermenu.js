import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = {  IconBrandChrome, IconHelp  };

// ==============================|| MASTER MENU ITEMS ||============================== //


const matermenu = {
  id: 'master',
  title: '관리자',
  type: 'group',
  children: [
    {
      id: 'Promblem',
      title: '문제관리',
      type: 'collapse',
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

export default matermenu;
