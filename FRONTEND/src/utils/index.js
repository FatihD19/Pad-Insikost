import { months } from "constants/_variables";

/* Fungsi formatRupiah */
export function formatRupiah(nominal) {
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(nominal);
}

export function formatBulan(n) {
  return months[n - 1];
}

export function isPemilik() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "PEMILIK";
}

//tambahan fungsi isPenghuni
export function isPenghuni() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "PENGHUNI";
}

export function getProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}
