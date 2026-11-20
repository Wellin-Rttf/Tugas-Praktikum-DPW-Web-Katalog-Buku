import { useEffect, useLayoutEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage.js";

const QUERY = "(prefers-color-scheme: dark)";
const sistemGelap = () =>
  typeof window !== "undefined" && !!window.matchMedia?.(QUERY).matches;

export default function useTema() {
  const [simpan, setSimpan] = useLocalStorage("katalog-buku:tema", null);
  const preferensi = simpan === "gelap" || simpan === "terang" ? simpan : "sistem";
  const [sistem, setSistem] = useState(sistemGelap);

  useEffect(() => {
    if (preferensi !== "sistem") return undefined;
    const mq = window.matchMedia?.(QUERY);
    if (!mq) return undefined;
    const ubah = (e) => setSistem(e.matches);
    setSistem(mq.matches);
    mq.addEventListener("change", ubah);
    return () => mq.removeEventListener("change", ubah);
  }, [preferensi]);

  const gelap = preferensi === "sistem" ? sistem : preferensi === "gelap";

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = gelap ? "dark" : "light";
  }, [gelap]);

  const setPreferensi = (p) => setSimpan(p);
  const toggle = () => setSimpan(gelap ? "terang" : "gelap");
  return { preferensi, gelap, setPreferensi, toggle };
}
