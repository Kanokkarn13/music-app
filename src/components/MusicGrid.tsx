import type { Track } from "../types/music";
import MusicCard from "./MusicCard";

export default function MusicGrid({ items }: { items: Track[] }) {
  if (!items?.length) {
    return <div className="text-center opacity-70 p-10">No music found.</div>;
  }

  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map(t => <MusicCard key={t.id} track={t} />)}
    </div>
  );
}
