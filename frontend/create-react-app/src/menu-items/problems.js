// assets
import { IconNotes, IconStairs, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconNotes,
  IconStairs,
  IconShadow,
  IconWindmill
};

// ==============================|| PROBLEM MENU ITEMS ||============================== //

const problems = {
  id: 'Problem',
  title: <strong style={{ fontSize: '16px', color :"#673ab7" }}>문제</strong>,
  type: 'group',
  children: [
    {
      id: 'problem-all',
      title: '전체문제',
      type: 'item',
      url: '/problem/list',
      icon: icons.IconNotes,
      breadcrumbs: false
    },
    {
      id: 'problem-step',
      title: '단계별 문제',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconStairs,
      breadcrumbs: false
    }
    // ,
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default problems;
