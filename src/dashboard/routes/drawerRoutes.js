import { People, AccessTime, DirectionsRun, Feedback, ShoppingCart } from '@material-ui/icons';
import Peoples from '../Peoples';

export const mainListRoutes = [
  {
    path: '/admin/peoples',
    sidebarName: '人员管理',
    icon: People,
    component: Peoples
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
