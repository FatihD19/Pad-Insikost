import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { getProfile } from "utils";

// ======= DASHBOARD ROUTES =========
const Dashboard = lazy(() => import("pages/dashboard"));

// -- PENGGUNA
const Profile = lazy(() => import("pages/users/profile"));
const ListUsers = lazy(() => import("pages/users/list"));
const AddUsers = lazy(() => import("pages/users/add"));
const EditUsers = lazy(() => import("pages/users/edit"));
// -- BERITA
const ListNews = lazy(() => import("pages/news/list"));
const ListNewsPenghuni = lazy(() => import("pages/news/list-penghuni"));
const AddNews = lazy(() => import("pages/news/add"));
const EditNews = lazy(() => import("pages/news/edit"));
// -- PEMBAYARAN
const ListPayments = lazy(() => import("pages/payments/list"));
const AddPayments = lazy(() => import("pages/payments/add"));
const EditPayments = lazy(() => import("pages/payments/edit"));
// -- FASILITAS
const ListFacilities = lazy(() => import("pages/facilities/list"));
const AddFacilities = lazy(() => import("pages/facilities/add"));
const EditFacilities = lazy(() => import("pages/facilities/edit"));
// -- KAMAR
const ListRooms = lazy(() => import("pages/rooms/list"));
const AddRooms = lazy(() => import("pages/rooms/add"));
const EditRooms = lazy(() => import("pages/rooms/edit"));
// -- PELAPORAN
const ListComplaints = lazy(() => import("pages/complaints/list"));
const AddComplaints = lazy(() => import("pages/complaints/add"));
const EditComplaints = lazy(() => import("pages/complaints/edit"));

export const routes = [
  {
    path: "/",
    component: Dashboard,
    role: "PEMILIK",
  },
  {
    path: "/",
    component: Profile,
    role: "PENGHUNI",
  },
  {
    path: "/profile",
    component: Profile,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/users",
    component: ListUsers,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/users/add",
    component: AddUsers,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/users/edit/:id",
    component: EditUsers,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/profile/edit/:id",
    component: EditUsers,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/news",
    component: ListNews,
    role: "PEMILIK",
  },
  {
    path: "/news",
    component: ListNewsPenghuni,
    role: "PENGHUNI",
  },
  {
    path: "/news/add",
    component: AddNews,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/news/edit/:id",
    component: EditNews,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/payments",
    component: ListPayments,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/payments/add",
    component: AddPayments,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/payments/edit/:id",
    component: EditPayments,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/facilities",
    component: ListFacilities,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/facilities/add",
    component: AddFacilities,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/facilities/edit/:id",
    component: EditFacilities,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/rooms",
    component: ListRooms,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/rooms/add",
    component: AddRooms,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/rooms/edit/:id",
    component: EditRooms,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/complaints",
    component: ListComplaints,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/complaints/add",
    component: AddComplaints,
    role: "PEMILIK, PENGHUNI",
  },
  {
    path: "/complaints/edit/:id",
    component: EditComplaints,
    role: "PEMILIK, PENGHUNI",
  },
];

export default function Routes() {
  const user = getProfile();
  return (
    <Switch>
      {routes
        .filter((route) => route.role.includes(user?.role))
        .map((route, key) => (
          <Route exact path={route.path} component={route.component} />
        ))}
    </Switch>
  );
}
