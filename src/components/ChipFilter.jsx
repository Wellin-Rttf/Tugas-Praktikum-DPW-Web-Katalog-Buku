export default function ChipFilter({ label, aktif, onKlik }) {
  return (
    <button
      type="button"
      role="tab"
      className="chip"
      aria-selected={aktif}
      onClick={onKlik}
    >
      {label}
    </button>
  );
}
