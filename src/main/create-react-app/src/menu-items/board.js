// assets
import { IconUsers, IconNews } from '@tabler/icons';

// constant
const icons = {
  IconUsers,
  IconNews,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'community',
  title: '커뮤니티',
  type: 'group',
  children: [
    {
      id: 'commu-freeboard',
      title: '자유게시판',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'commu-news',
      title: '뉴스',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconNews,
      breadcrumbs: false
    }
  ]
};

export default utilities;
