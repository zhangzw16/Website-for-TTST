import { People, AccessTime, DirectionsRun, Feedback, ShoppingCart } from '@material-ui/icons';
import Peoples from 'dashboard/Peoples';
import WorkingHours from 'dashboard/WorkingHours';

export const mainListRoutes = [
  {
    path: '/admin/peoples',
    sidebarName: '人员管理',
    icon: People,
    component: Peoples
  },
  {
    path: '/admin/workingHours',
    sidebarName: '工时',
    icon: AccessTime,
    component: WorkingHours
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
