import HomeLayout from 'layouts/HomeLayout';
import AccountProfilePage from 'pages/Home/AccountProfilePage';
import AuthenticationPage from 'pages/Home/AuthenticationPage';
import CategoryPostsPage from 'pages/Home/CategoryPostsPage';
import HomePage from 'pages/Home/HomePage';
import PostPage from 'pages/Home/PostPage';
import UploadPostPage from 'pages/Home/UploadPostPage';
import UserPostsPage from 'pages/Home/UserPostsPage';
import React from 'react';
import { Switch } from 'react-router-dom';

export default function HomeRoutes() {
  return (
    <Switch>
      <HomeLayout exact path="/" component={HomePage} />
      <HomeLayout exact path="/login" component={AuthenticationPage} />
      <HomeLayout exact path="/profile" component={AccountProfilePage} />
      <HomeLayout exact path="/post/:id" component={PostPage} />
      <HomeLayout exact path="/userpost" component={UserPostsPage} />
      <HomeLayout exact path="/newpost" component={UploadPostPage} />
      <HomeLayout
        exact
        path="/post/category/:id"
        component={CategoryPostsPage}
      />
    </Switch>
  );
}
