import { People, AccessTime, DirectionsRun, Feedback, ShoppingCart } from '@material-ui/icons';

export const mainListRoutes = [
  {
    path: '/admin',
    sidebarName: '人员管理',
    icon: People
  },
  {
    path: '/admin',
    sidebarName: '工时',
    icon: AccessTime
  },
  {
    path: '/admin',
    sidebarName: '外勤',
    icon: DirectionsRun
  },
  {
    path: '/admin',
    sidebarName: '反馈问卷',
    icon: Feedback
  },
  {
    path: '/admin',
    sidebarName: '物资管理',
    icon: ShoppingCart
  }
];
