import { useEffect, useState } from "react";

export default function useLocalStorage(key, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const mentah = window.localStorage.getItem(key);
      return mentah !== null ? JSON.parse(mentah) : nilaiAwal;
    } catch {
      return nilaiAwal;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(nilai));
    } catch {
    }
  }, [key, nilai]);

  return [nilai, setNilai];
}
