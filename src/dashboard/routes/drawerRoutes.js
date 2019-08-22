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
    path: '/admin/field',
    sidebarName: '外勤',
    icon: DirectionsRun,
    component: Peoples
  },
  {
    path: '/admin/feedback',
    sidebarName: '反馈问卷',
    icon: Feedback,
    component: Peoples
  },
  {
    path: '/admin/resource',
    sidebarName: '物资管理',
    icon: ShoppingCart,
    component: Peoples
  }
];
