// assets
import { IconUsers, IconNews, IconAccessPoint } from '@tabler/icons';

// constant
const icons = { IconUsers, IconNews, IconAccessPoint};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'community-group',
  title: <strong style={{ fontSize: '16px', color :"#673ab7" }}>커뮤니티</strong>, 
  type: 'group',
  children: [
    {
      id: 'board',
      title: '커뮤니티',
      type: 'item',
      url: '/board/list',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    /*
      {
      id: 'board',
      title: '자유게시판',
      type: 'item',
      url: '/board/list',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'news',
      title: '뉴스',
      type: 'item',
      url: 'https://news.naver.com/',
      icon: icons.IconAccessPoint,
      external: true,
      target: true
    }
    */
  ]
};

export default other;
