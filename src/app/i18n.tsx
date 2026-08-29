"use client";

import { useCallback, useSyncExternalStore } from "react";

/* Deliberately not an i18n library: two languages, one flat dictionary,
   ~50 strings. To extend translation to a new string, add a key to both
   maps below and render it with <T k="your.key" /> — that works inside
   Server Components too, since <T> is a client leaf. */

const id = {
  "nav.home": "Beranda",
  "nav.rooms": "Kamar",
  "nav.contact": "Kontak",
  "a11y.skip": "Lompat ke konten utama",
  "a11y.theme": "Ganti mode terang/gelap",
  "a11y.lang": "Ganti bahasa ke English",

  "maps": "Lihat di Google Maps",
  "perMonth": "/bulan",

  "home.eyebrow": "Cibinong, Bogor",
  "home.title": "Kamar tenang, dijaga baik.",
  "home.sub":
    "Khusus perempuan, di kompleks bergerbang Cibinong. Kamar mandi dalam di tiap kamar, dan pemilik yang mengangkat telepon.",
  "home.cta": "Lihat kamar & ketersediaan",
  "home.cta2": "Hubungi kami",

  "home.availTitle": "Kamar kosong saat ini",
  "home.availableLabel": "kamar kost kosong bulan ini",
  "home.availableNone":
    "Semua kamar kost terisi bulan ini — hubungi kami untuk masuk daftar tunggu.",
  "home.fromPrice": "mulai dari",
  "home.availCta": "Lihat semua kamar →",

  "home.band1Title": "Semuanya sudah ada di kamar",
  "home.band1Body":
    "Kasur, AC, water heater, dan kamar mandi dalam di setiap kamar. Anda cukup datang membawa koper, bukan truk pindahan.",

  "home.facTitle": "Fasilitas",

  "home.band2Title": "Khusus perempuan, dengan aturan yang jelas",
  "home.band2Body":
    "Alfa Salam Kost khusus perempuan, jadi tamu laki-laki tidak diperbolehkan melewati pintu masuk atau masuk ke kamar. Selebihnya: jadilah tetangga yang baik, jaga kebersihan ruang bersama, dan jangan macam-macam.",

  "home.hoodTitle": "Lingkungan",
  "home.hoodBody":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat — jalan perumahan yang tenang, hanya beberapa menit dari GOR Pakansari dan pusat belanja serta kuliner Cibinong.",

  "home.rukostTitle": "Mau satu rumah utuh?",
  "home.rukostBody":
    "Alfa Salam Rukost di sebelah disewakan sebagai satu unit — hunian campur, cocok untuk keluarga. Berbeda dari kamar Kost yang khusus perempuan.",
  "home.rukostLink": "Lihat Rukost →",

  "home.closeTitle": "Datang dan lihat langsung.",
  "home.closeBody":
    "Kirim pesan ke Bu Atin di WhatsApp untuk mengatur waktu berkunjung atau menanyakan kamar.",
  "home.closeCta": "Hubungi kami di WhatsApp",

  "about.fac.1": "Kasur, lemari, AC, water heater, dan (di sebagian besar kamar) meja",
  "about.fac.2": "Kamar mandi dalam di setiap kamar",
  "about.fac.3": "CCTV di seluruh area kost",
  "about.fac.4": "Satu pintu gerbang — setiap penghuni punya kunci sendiri",
  "about.fac.5": "Wifi gratis",
  "about.fac.6": "Lahan parkir depan",
  "about.fac.7": "Dua dapur bersama",
  "about.fac.8": "Area jemuran khusus",

  "rooms.title": "Ketersediaan Kamar",
  "rooms.intro":
    "Status diperbarui langsung dari sistem pengelolaan kami. Lihat kamar yang kosong, lalu hubungi kami untuk memesan.",
  "rooms.empty": "Belum ada kamar yang terdaftar — cek lagi nanti.",
  "rooms.room": "Kamar",
  "status.available": "Tersedia",
  "status.maintenance": "Sedang diperbaiki",
  "status.occupied": "Terisi",
  "gender.women_only": "Khusus perempuan",
  "gender.men_only": "Khusus laki-laki",
  "gender.mixed": "Campur / keluarga",

  "rukost.title": "Sewa Satu Rumah — Alfa Salam Rukost",
  "rukost.intro":
    "Rumah 2 kamar tidur, disewakan sebagai satu unit utuh — pilihan untuk keluarga atau siapa pun yang ingin rumah pribadi, bukan sekadar satu kamar. Menyewa seluruh rumah terbuka untuk umum (hunian campur tidak masalah); ini berbeda dengan kamar Kost kami yang khusus perempuan.",
  "rukost.empty": "Belum ada unit tersedia saat ini — cek lagi nanti.",
  "rukost.cta": "Hubungi kami soal sewa rumah",

  "contact.title": "Kontak",
  "contact.intro":
    "Cara tercepat adalah WhatsApp — biasanya dibalas di hari yang sama.",
  "contact.whatsapp": "WhatsApp",
  "contact.address": "Alamat",
  "contact.address.body":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16914",
} as const;

const en: Record<keyof typeof id, string> = {
  "nav.home": "Home",
  "nav.rooms": "Rooms",
  "nav.contact": "Contact",
  "a11y.skip": "Skip to main content",
  "a11y.theme": "Toggle light/dark mode",
  "a11y.lang": "Ganti bahasa ke Bahasa Indonesia",

  "maps": "View on Google Maps",
  "perMonth": "/month",

  "home.eyebrow": "Cibinong, Bogor",
  "home.title": "A quiet room, kept well.",
  "home.sub":
    "Women-only, in a gated Cibinong complex. A private bathroom in every room, and a landlady who picks up.",
  "home.cta": "See rooms & availability",
  "home.cta2": "Message us",

  "home.availTitle": "Free right now",
  "home.availableLabel": "kost rooms free this month",
  "home.availableNone":
    "Every kost room is taken this month — message us to join the waiting list.",
  "home.fromPrice": "from",
  "home.availCta": "See all rooms →",

  "home.band1Title": "Everything's already in the room",
  "home.band1Body":
    "Bed, AC, water heater, and a private indoor bathroom in every room. Move in with a suitcase, not a truck.",

  "home.facTitle": "Facilities",

  "home.band2Title": "Women-only, with house rules that are actually clear",
  "home.band2Body":
    "Alfa Salam Kost is women-only, so male guests aren't allowed past the entrance or in the rooms. Beyond that: be a good neighbour, keep shared spaces clean, and no funny business.",

  "home.hoodTitle": "The neighbourhood",
  "home.hoodBody":
    "Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat — a quiet residential street just minutes from GOR Pakansari and Cibinong's main shopping and dining strip.",

  "home.rukostTitle": "Want the whole house instead?",
  "home.rukostBody":
    "Alfa Salam Rukost next door rents as a single unit — mixed-occupancy, good for families. Different from the women-only Kost rooms.",
  "home.rukostLink": "See the Rukost →",

  "home.closeTitle": "Come and see it.",
  "home.closeBody":
    "Message Bu Atin on WhatsApp to arrange a visit or ask about a room.",
  "home.closeCta": "Contact us on WhatsApp",

  "about.fac.1": "Bed, drawer, AC, water heater, and (in most rooms) a table",
  "about.fac.2": "Private indoor bathroom in every room",
  "about.fac.3": "CCTV coverage around the whole kost",
  "about.fac.4": "Single gated entry — each tenant has their own key",
  "about.fac.5": "Free wifi",
  "about.fac.6": "Front parking lot",
  "about.fac.7": "Two shared kitchens",
  "about.fac.8": "Dedicated drying area (jemuran) for laundry",

  "rooms.title": "Room Availability",
  "rooms.intro":
    "Status is live from our management system. See what's open, then message us to book.",
  "rooms.empty": "No rooms listed right now — check back soon.",
  "rooms.room": "Room",
  "status.available": "Available",
  "status.maintenance": "Under maintenance",
  "status.occupied": "Occupied",
  "gender.women_only": "Women only",
  "gender.men_only": "Men only",
  "gender.mixed": "Mixed / family",

  "rukost.title": "Rent the Whole House — Alfa Salam Rukost",
  "rukost.intro":
    "A 2-bedroom house, rented as a whole unit — an option for families or anyone wanting a private house instead of a single room. Renting the whole house is open to anyone (mixed occupancy is fine); this is different from our women-only Kost rooms.",
  "rukost.empty": "No listing available right now — check back soon.",
  "rukost.cta": "Contact us about renting the house",

  "contact.title": "Contact",
  "contact.intro": "WhatsApp is fastest — usually answered the same day.",
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
      className="flex h-9 min-w-11 items-center justify-center rounded-md border border-line px-2 font-mono text-xs font-medium tracking-wide uppercase hover:border-accent hover:text-accent"
    >
      {lang === "id" ? "EN" : "ID"}
    </button>
  );
}
