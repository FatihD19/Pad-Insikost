// ========= SIDEBAR NAVIGATION ============
import { isPemilik } from "utils";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import NotificationsActiveTwoToneIcon from "@material-ui/icons/NotificationsActiveTwoTone";
import WifiIcon from "@material-ui/icons/Wifi";
import HotelTwoToneIcon from "@material-ui/icons/HotelTwoTone";
import AnnouncementTwoToneIcon from "@material-ui/icons/AnnouncementTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

// ==============
// ROLE :
// 1. PEMILIK
// 2. PENGHUNI
// ==============

export const sidebar_navigation = [
  {
    label: "Dashboard",
    icon: HomeTwoToneIcon,
    path: "/",
    role: "PEMILIK",
  },
  {
    label: "Profile",
    icon: AccountCircleTwoToneIcon,
    path: "/",
    role: "PENGHUNI",
  },

  {
    label: "Pembayaran",
    icon: MonetizationOnTwoToneIcon,
    path: "/payments",
    role: "PEMILIK, PENGHUNI",
  },
  {
    label: "Berita",
    icon: NotificationsActiveTwoToneIcon,
    path: "/news",
    role: "PEMILIK, PENGHUNI",
  },
  {
    label: "Pelaporan",
    icon: AnnouncementTwoToneIcon,
    path: "/complaints",
    role: "PEMILIK, PENGHUNI",
  },
  {
    label: "Kamar",
    icon: HotelTwoToneIcon,
    path: "/rooms",
    role: "PEMILIK",
  },
  {
    label: "Fasilitas",
    icon: WifiIcon,
    path: "/facilities",
    role: "PEMILIK",
  },
  {
    label: "Pengguna",
    icon: PeopleAltTwoToneIcon,
    path: "/users",
    role: "PEMILIK",
  },
  {
    label: "Profile",
    icon: AccountCircleTwoToneIcon,
    path: "/profile",
    role: "PEMILIK",
  },
  {
    label: "Keluar",
    icon: ArrowBackIcon,
    path: "/login",
    beforeRedirect: () => {
      localStorage.clear();
    },
    role: "PEMILIK, PENGHUNI",
  },
];
