import PostList from './views/pages/admin/PostList/PostList';

const routes = [
  {
    collapse: true,
    name: 'Bài viết',
    icon: 'ni ni-shop text-primary',
    state: 'dashboardsCollapse',
    views: [
      {
        path: '/post/waiting',
        name: 'Bài viết chờ duyệt',
        miniName: 'D',
        component: PostList,
        layout: '/admin',
      },
    ],
  },
];

export default routes;
