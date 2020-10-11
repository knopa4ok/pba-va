
import HomePage from "views/UserViews/HomePage";
import Rules from "views/UserViews/Rules";
import Staff from "views/UserViews/Staff";
import Pilots from "views/UserViews/Pilots";
import Routes from "views/UserViews/Routes";
import History from "views/UserViews/History";
import Register from "views/UserViews/Register";
import Profile from "views/UserViews/Profile";
import Vacancies from "views/UserViews/Vacancies";

import AdminNews from "./views/AdminViews/AdminNews";
import AdminRules from "./views/AdminViews/AdminRules";
import AdminWhoWeAre from "./views/AdminViews/AdminWhoWeAre";
import AdminFlightView from "./views/AdminViews/AdminFlightView";

var routes = [
  {
    path: "/home",
    name:  {en: "Home", ru: "Главная"},
    icon: "fa fa-home text-info",
    component: HomePage,
    layout: "",
    needAuth: 0,
    statBar: 1,
  },
  {
    path: "/admin/news",
    name: {en: "News", ru: "Новости"},
    icon: "fa fa fa-wrench",
    component: AdminNews,
    layout: "",
    needAuth: 1,
    needAdmin: 1,
    children: 1,
  },
  {
    path: "/admin/WhoWeAre",
    name: {en: "Who WE ARE?", ru: "Кто МЫ?"},
    icon: "fa fa fa-wrench",
    component: AdminWhoWeAre,
    layout: "",
    needAuth: 1,
    needAdmin: 1,
    children: 1,
  },
  {
    path: "/rules",
    name: {en: "Rules", ru: "Правила"},
    icon: "fa fa-book text-info",
    component: Rules,
    layout: "",
    needAuth: 0
  },
  {
    path: "/admin/rules",
    name: {en: "Edit", ru: "Изменить"},
    icon: "fa fa fa-wrench",
    component: AdminRules,
    layout: "",
    needAuth: 1,
    needAdmin: 1,
    children: 1,
  },
  {
    path: "/staff",
    name: {en: "Staff", ru: "Руководство"},
    icon: "fa fa-university text-info",
    component: Staff,
    layout: "",
    needAuth: 0
  },
  {
    path: "/pilots",
    name: {en: "Pilots", ru: "Пилоты"},
    icon: "fa fa-users text-info",
    component: Pilots,
    layout: "",
    needAuth: 0,
  },
  {
    path: "/routes",
    name: {en: "Routes", ru: "Маршруты"},
    icon: "fa fa-globe text-info",
    component: Routes,
    layout: "",
    needAuth: 1
  },
  {
    path: "/admin/routes",
    name: {en: "Edit", ru: "Изменить"},
    icon: "fa fa fa-wrench",
    layout: "",
    needAuth: 1,
    needAdmin: 1,
    children: 1,
  },
  {
    path: "/history",
    name: {en: "Flight History", ru: "История полётов"},
    icon: "fa fa-history text-info",
    component: History,
    layout: "",
    needAuth: 0
  },
  {
    path: "/admin/flight",
    name: {en: "Edit", ru: "Изменить"},
    icon: "fa fa fa-wrench",
    component: AdminFlightView,
    layout: "",
    needAuth: 1,
    needAdmin: 1,
    children: 1,
    hidden: 1
  },
  {
    path: "/cv",
    name: {en: "Vacancies", ru: "Вакансии"},
    icon: "fa fa-id-card-o text-info",
    component: Vacancies,
    layout: "",
    needAuth: 1,
    delimiter: 1,
  },
  {
    path: "/admin/cv",
    name: {en: "Edit", ru: "Изменить"},
    icon: "fa fa fa-wrench",
    layout: "",
    needAuth: 1,
    needAdmin: 1,
    children: 1,
  },
  {
    path: "/profile",
    name: {en: "Profile", ru: "Профиль"},
    icon: "fa fa-id-card-0 text-info",
    component: Profile,
    layout: "",
    needAuth: 1,
    hidden: 1
  },
];
export default routes;
