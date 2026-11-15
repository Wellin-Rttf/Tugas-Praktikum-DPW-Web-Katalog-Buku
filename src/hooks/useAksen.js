import { useLayoutEffect } from "react";
import useLocalStorage from "./useLocalStorage.js";
import { AKSEN } from "../data/aksen.js";

export default function useAksen() {
  const [simpan, setAksen] = useLocalStorage("katalog-buku:aksen", "biru");
  const aksen = AKSEN.some((a) => a.id === simpan) ? simpan : "biru";

  useLayoutEffect(() => {
    document.documentElement.dataset.aksen = aksen;
  }, [aksen]);

  return { aksen, setAksen };
}
