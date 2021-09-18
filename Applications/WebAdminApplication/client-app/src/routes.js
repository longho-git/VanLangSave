import Categories from 'pages/Admin/Category/Categories';
import PostsWaiting from 'pages/Admin/PostsWaiting/PostsWaiting';

const routes = [
  {
    collapse: true,
    name: 'Hệ thống',
    icon: 'ni ni-folder-17 text-primary',
    state: 'dashboardsCollapse',
    views: [
      {
        path: '/categories',
        name: 'Danh mục',
        miniName: 'C',
        component: Categories,
        layout: '/admin',
      },
      {
        path: '/users',
        name: 'Người dùng',
        miniName: 'U',
        component: Categories,
        layout: '/admin',
      },
      {
        path: '/postwaiting',
        name: 'Danh sách bài viết chờ duyệt',
        miniName: 'R',
        component: PostsWaiting,
        layout: '/admin',
      },
    ],
  },
];

export default routes;
