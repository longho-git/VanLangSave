import Categories from 'pages/Admin/Category/Categories';
import PostsActive from 'pages/Admin/PostsActive/PostsActive';
import PostsWaiting from 'pages/Admin/PostsWaiting/PostsWaiting';
import UserManager from 'pages/Admin/UserManager/UserManager';
import HistoryRegisterPage from './pages/Admin/HistoryRegister/HistoryRegisterPage';
import DashBoard from 'pages/Admin/DashBoard/DashBoardPage';

const routes = [
  {
    collapse: true,
    name: 'Hệ thống',
    icon: 'fas fa-network-wired text-primary',
    state: 'dashboardsCollapse',
    isView: 'SysAdmin',
    views: [
      {
        path: '/categories',
        name: 'Danh mục',
        miniName: 'C',
        component: Categories,
        layout: '/admin',
        isView: 'SysAdmin',
      },
      {
        path: '/users',
        name: 'Người dùng',
        miniName: 'U',
        component: UserManager,
        isView: 'SysAdmin',
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Bài đăng',
    icon: 'far fa-newspaper text-primary',
    state: 'postsCollapse',
    isView: 'Manager',
    views: [
      {
        path: '/postwaiting',
        name: 'Chờ duyệt',
        miniName: 'W',
        component: PostsWaiting,
        layout: '/admin',
        isView: 'Manager',
      },
      {
        path: '/postactive',
        name: 'Đã duyệt',
        miniName: 'R',
        component: PostsActive,
        layout: '/admin',
        isView: 'Manager',
      },
      {
        path: '/dashBoard',
        name: 'Thống kê',
        miniName: 'T',
        component: DashBoard,
        layout: '/admin',
        isView: 'Manager',
      },
      {
        path: '/history/exchange',
        name: 'Lịch sử trao đổi',
        miniName: 'H',
        component: HistoryRegisterPage,
        layout: '/admin',
        isView: 'Manager',
      },
    ],
  },
];

export default routes;
