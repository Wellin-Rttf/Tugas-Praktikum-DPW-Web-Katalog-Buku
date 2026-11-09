import { useEffect, useState } from "react";

// State yang otomatis tersimpan di localStorage (bertahan walau tab/browser ditutup).
export default function useLocalStorage(key, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const mentah = window.localStorage.getItem(key);
      return mentah !== null ? JSON.parse(mentah) : nilaiAwal;
    } catch {
      return nilaiAwal; // data rusak atau storage diblokir
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(nilai));
    } catch {
      /* kuota penuh / mode privat: abaikan */
    }
  }, [key, nilai]);

  return [nilai, setNilai];
}
