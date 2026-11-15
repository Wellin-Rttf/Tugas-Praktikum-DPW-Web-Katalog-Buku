export const STATUS = [
  { id: "ingin", label: "Ingin dibaca", ikon: "bookmark" },
  { id: "sedang", label: "Sedang dibaca", ikon: "auto_stories" },
  { id: "selesai", label: "Selesai", ikon: "check_circle" },
];

export const labelStatus = (id) => STATUS.find((s) => s.id === id)?.label;
