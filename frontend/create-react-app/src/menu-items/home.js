// assets
import { IconHome } from '@tabler/icons';

// constant
const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'mainpage',
  type: 'group',
  children: [
    {
      id: 'default',
      title: '홈',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
