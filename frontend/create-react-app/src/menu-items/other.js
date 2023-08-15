// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title : '커뮤니티',
  type: 'group',
  children: [
    {
      id: 'Board',
      title: '자유게시판',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'news',
      title: '뉴스',
      type: 'item',
      url: 'https://news.naver.com/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
