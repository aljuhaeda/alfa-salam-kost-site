"use client";

import { useCallback, useSyncExternalStore } from "react";

/* Deliberately not an i18n library: two languages, one flat dictionary,
   ~50 strings. To extend translation to a new string, add a key to both
   maps below and render it with <T k="your.key" /> — that works inside
   Server Components too, since <T> is a client leaf. */

const id = {
  "nav.home": "Beranda",
  "nav.about": "Tentang",
  "nav.rooms": "Kamar",
  "nav.rukost": "Sewa Rumah",
  "nav.contact": "Kontak",
  "a11y.skip": "Lompat ke konten utama",
  "a11y.theme": "Ganti mode terang/gelap",
  "a11y.lang": "Ganti bahasa ke English",

  "home.title": "Alfa Salam Kost & Rukost",
  "home.sub":
    "Kamar kost nyaman dan satu unit rukost, tersedia sekarang di Cibinong, Bogor.",
  "home.cta": "Lihat ketersediaan kamar",

  "rooms.title": "Ketersediaan Kamar",
  "rooms.empty": "Belum ada kamar yang terdaftar — cek lagi nanti.",
  "rooms.room": "Kamar",
  "rooms.noPhoto": "Tanpa foto",
  "rooms.perMonth": "/bulan",
  "status.available": "Tersedia",
  "status.maintenance": "Sedang diperbaiki",
  "status.occupied": "Terisi",
  "gender.women_only": "Khusus perempuan",
  "gender.men_only": "Khusus laki-laki",
  "gender.mixed": "Campur / keluarga",

  "rukost.title": "Sewa Rumah — Alfa Salam Rukost",
  "rukost.intro":
    "Rumah 2 kamar tidur, disewakan sebagai satu unit utuh — pilihan untuk keluarga atau siapa pun yang ingin rumah pribadi, bukan sekadar satu kamar. Menyewa seluruh rumah terbuka untuk umum (hunian campur tidak masalah); ini berbeda dengan kamar Kost kami yang khusus perempuan.",
  "rukost.empty": "Belum ada unit tersedia saat ini — cek lagi nanti.",
  "rukost.cta": "Hubungi kami soal sewa rumah",

  "about.title": "Tentang",
  "about.location": "Lokasi",
  "about.location.body":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat — jalan perumahan yang tenang, hanya beberapa menit dari GOR Pakansari dan pusat belanja serta kuliner Cibinong.",
  "about.maps": "Lihat di Google Maps",
  "about.facilities": "Fasilitas",
  "about.fac.1": "Kasur, lemari, AC, water heater, dan (di sebagian besar kamar) meja",
  "about.fac.2": "Kamar mandi dalam di setiap kamar",
  "about.fac.3": "CCTV di seluruh area kost",
  "about.fac.4": "Satu pintu gerbang — setiap penghuni punya kunci sendiri",
  "about.fac.5": "Wifi gratis",
  "about.fac.6": "Lahan parkir depan",
  "about.fac.7": "Dua dapur bersama",
  "about.fac.8": "Area jemuran khusus",
  "about.rules": "Aturan rumah",
  "about.rules.body":
    "Alfa Salam Kost khusus perempuan, jadi tamu laki-laki tidak diperbolehkan melewati pintu masuk atau masuk ke kamar. Selebihnya: jadilah tetangga yang baik, jaga kebersihan ruang bersama, dan jangan macam-macam.",
  "about.blurbTitle": "Tentang Alfa Salam Kost & Rukost",
  "about.blurb":
    "Kost khusus perempuan di dalam kompleks perumahan bergerbang di Cibinong, dibuat untuk penghuni yang ingin kamar terkunci sendiri, kamar mandi sendiri, dan pemilik yang benar-benar mengangkat telepon. Setiap kamar sudah lengkap — kasur, AC, water heater, kamar mandi dalam — jadi Anda bisa pindah cukup dengan koper, bukan truk. CCTV dan akses satu pintu menjaga keamanan, dan lokasinya yang beberapa menit dari GOR Pakansari serta pusat kota Cibinong membuat urusan sehari-hari, olahraga, dan makan selalu dekat. Ingin satu rumah utuh? Alfa Salam Rukost di sebelah disewakan sebagai satu unit, hunian campur, untuk keluarga atau rombongan.",

  "contact.title": "Kontak",
  "contact.whatsapp": "WhatsApp",
  "contact.address": "Alamat",
  "contact.address.body":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16914",
} as const;

const en: Record<keyof typeof id, string> = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.rooms": "Rooms",
  "nav.rukost": "Rent a House",
  "nav.contact": "Contact",
  "a11y.skip": "Skip to main content",
  "a11y.theme": "Toggle light/dark mode",
  "a11y.lang": "Ganti bahasa ke Bahasa Indonesia",

  "home.title": "Alfa Salam Kost & Rukost",
  "home.sub":
    "Comfortable boarding rooms and a rukost unit, available now in Cibinong, Bogor.",
  "home.cta": "See room availability",

  "rooms.title": "Room Availability",
  "rooms.empty": "No rooms listed right now — check back soon.",
  "rooms.room": "Room",
  "rooms.noPhoto": "No photo",
  "rooms.perMonth": "/month",
  "status.available": "Available",
  "status.maintenance": "Under maintenance",
  "status.occupied": "Occupied",
  "gender.women_only": "Women only",
  "gender.men_only": "Men only",
  "gender.mixed": "Mixed / family",

  "rukost.title": "Rent a House — Alfa Salam Rukost",
  "rukost.intro":
    "A 2-bedroom house, rented as a whole unit — an option for families or anyone wanting a private house instead of a single room. Renting the whole house is open to anyone (mixed occupancy is fine); this is different from our women-only Kost rooms.",
  "rukost.empty": "No listing available right now — check back soon.",
  "rukost.cta": "Contact us about renting the house",

  "about.title": "About",
  "about.location": "Location",
  "about.location.body":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat — a quiet residential street just minutes from GOR Pakansari and Cibinong's main shopping/dining strip.",
  "about.maps": "View on Google Maps",
  "about.facilities": "Facilities",
  "about.fac.1": "Bed, drawer, AC, water heater, and (in most rooms) a table",
  "about.fac.2": "Private indoor bathroom in every room",
  "about.fac.3": "CCTV coverage around the whole kost",
  "about.fac.4": "Single gated entry — each tenant has their own key",
  "about.fac.5": "Free wifi",
  "about.fac.6": "Front parking lot",
  "about.fac.7": "Two shared kitchens",
  "about.fac.8": "Dedicated drying area (jemuran) for laundry",
  "about.rules": "House rules",
  "about.rules.body":
    "Alfa Salam Kost is women-only, so male guests aren't allowed past the entrance or in the rooms. Beyond that: be a good neighbor, keep shared spaces clean, and no funny business.",
  "about.blurbTitle": "About Alfa Salam Kost & Rukost",
  "about.blurb":
    "A women-only kost in a gated Cibinong residential complex, built for tenants who want their own locked room, their own bathroom, and a landlady who actually answers the phone. Every room comes fully equipped — bed, AC, water heater, private bath — so you can move in with a suitcase, not a truck. CCTV and single-entry access keep the place secure, and being minutes from GOR Pakansari and Cibinong's main strip means errands, gym, and food are never far. Want the whole house instead? Alfa Salam Rukost next door rents as a single unit, mixed-occupancy, for families or groups.",

  "contact.title": "Contact",
  "contact.whatsapp": "WhatsApp",
  "contact.address": "Address",
  "contact.address.body":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16914",
};

const DICT = { id, en };
export type Lang = keyof typeof DICT;
export type Key = keyof typeof id;

export const DEFAULT_LANG: Lang = "id";
export const LANG_KEY = "lang";

/* A module-level store read through useSyncExternalStore, rather than a
   context + state: it is the one hook that hydrates correctly from
   localStorage without a mismatch (React uses the server snapshot during
   hydration, then re-renders), and it needs no provider in the layout.
   ponytail: chosen over Context because there is nothing to provide —
   the language is global, not scoped. */
let listeners: (() => void)[] = [];
let current: Lang | null = null;

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function getSnapshot(): Lang {
  if (current === null) {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LANG_KEY);
    } catch {}
    current = stored === "id" || stored === "en" ? stored : DEFAULT_LANG;
  }
  return current;
}

const getServerSnapshot = (): Lang => DEFAULT_LANG;

function setLang(l: Lang) {
  current = l;
  document.documentElement.lang = l;
  try {
    localStorage.setItem(LANG_KEY, l);
  } catch {}
  for (const cb of listeners) cb();
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { lang, setLang };
}

/** Returns a translate function — use when you need a plain string
 *  (aria-label, alt text, title). */
export function useT() {
  const { lang } = useLang();
  return useCallback((k: Key) => DICT[lang][k], [lang]);
}

/** Renders one translated string. Safe to use inside Server Components. */
export default function T({ k }: { k: Key }) {
  const { lang } = useLang();
  return DICT[lang][k];
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      aria-label={t("a11y.lang")}
      className="flex h-9 min-w-11 items-center justify-center rounded-md border border-rattan px-2 font-mono text-xs font-medium tracking-wide uppercase hover:border-teratai hover:text-teratai"
    >
      {lang === "id" ? "EN" : "ID"}
    </button>
  );
}
