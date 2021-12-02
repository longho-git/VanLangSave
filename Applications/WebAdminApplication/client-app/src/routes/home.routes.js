import HomeLayout from 'layouts/HomeLayout';
import AuthenticationPage from 'pages/Home/AuthenticationPage';
import CategoryPostsPage from 'pages/Home/CategoryPostsPage';
import HistoryRegisterPage from 'pages/Home/HistoryRegisterPage';
import HomePage from 'pages/Home/HomePage';
import InfomationPage from 'pages/Home/InfomationPage/InfomationPage';
import PostPage from 'pages/Home/PostPage';
import RegisterPostExchangeOfUserPage from 'pages/Home/RegisterPostExchangeOfUserPage';
import RegisterPostGiveOfUserPage from 'pages/Home/RegisterPostGiveOfUserPage';
import SearchPage from 'pages/Home/SearchPage';
import UploadPostPage from 'pages/Home/UploadPostPage';
import UserPostsPage from 'pages/Home/UserPostsPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import RegisterExChangeOfPostPage from './../pages/Home/RegisterExChangeOfPostPage';

export default function HomeRoutes() {
  return (
    <Switch>
      <HomeLayout exact path="/" component={HomePage} />
      <HomeLayout exact path="/login" component={AuthenticationPage} />
      <HomeLayout exact path="/profile" component={InfomationPage} />
      <HomeLayout exact path="/post/:id" component={PostPage} />
      <HomeLayout
        exact
        path="/registerExchange/post/:id"
        component={RegisterExChangeOfPostPage}
      />
      <HomeLayout exact path="/userpost" component={UserPostsPage} />
      <HomeLayout exact path="/newpost" component={UploadPostPage} />
      <HomeLayout
        exact
        path="/post/category/:id"
        component={CategoryPostsPage}
      />
      <HomeLayout
        exact
        path="/registerList"
        component={RegisterPostGiveOfUserPage}
      />
      <HomeLayout
        exact
        path="/registerExchangeList"
        component={RegisterPostExchangeOfUserPage}
      />
      <HomeLayout exact path="/search" component={SearchPage} />
      <HomeLayout exact path="/history" component={HistoryRegisterPage} />
    </Switch>
  );
}
