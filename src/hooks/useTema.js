import { useLayoutEffect } from "react";
import useLocalStorage from "./useLocalStorage.js";

const sistemGelap = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export default function useTema() {
  const [pilihan, setPilihan] = useLocalStorage("katalog-buku:tema", null);
  const gelap = pilihan ? pilihan === "gelap" : sistemGelap();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = gelap ? "dark" : "light";
  }, [gelap]);

  const toggle = () => setPilihan(gelap ? "terang" : "gelap");
  return { gelap, toggle };
}
