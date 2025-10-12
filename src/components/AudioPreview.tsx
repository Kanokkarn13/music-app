import { useEffect, useRef, useState, useCallback } from "react";

type Props = {
  src: string;
  title?: string;
  subtitle?: string;
};

export default function AudioPreview({ src, title, subtitle }: Props) {
  const aRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const fmt = (t: number) => {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggle = useCallback(() => {
    const a = aRef.current!;
    if (playing) a.pause();
    else a.play();
    setPlaying(!playing);
  }, [playing]);

  const seekTo = (v: number) => {
    const a = aRef.current!;
    a.currentTime = Math.max(0, Math.min(v, duration || 30));
    setCurrent(a.currentTime);
  };

  const step = (sec: number) => seekTo(current + sec);

  useEffect(() => {
    const a = aRef.current!;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(isFinite(a.duration) ? a.duration : 30);
    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      }
      if (e.code === "ArrowLeft") step(-5);
      if (e.code === "ArrowRight") step(5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, current]);

  const playedPct = duration ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="rounded-xl bg-base-200/70 backdrop-blur border border-base-300/50 shadow-lg p-4 w-full max-w-lg">
        {(title || subtitle) && (
          <div className="mb-2 text-center">
            {title && <div className="font-semibold leading-tight">{title}</div>}
            {subtitle && <div className="text-xs opacity-60">{subtitle}</div>}
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => step(-10)}
              title="Back 10s"
            >
              <PrevIcon className="w-5 h-5" />
            </button>

            <button
              onClick={toggle}
              className="btn btn-circle btn-sm bg-base-100 border border-base-300 shadow hover:brightness-110"
              aria-label={playing ? "Pause" : "Play"}
              title={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5 translate-x-[1px]" />
              )}
            </button>

            <button
              className="btn btn-ghost btn-xs"
              onClick={() => step(5)}
              title="Forward 10s"
            >
              <NextIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-[11px] w-10 text-right tabular-nums opacity-70">
              {fmt(current)}
            </span>

            <div className="relative flex-1">
              <div className="h-1.5 rounded-full bg-base-300 overflow-hidden">
                <div
                  className="h-full bg-neutral/70 dark:bg-neutral/60"
                  style={{ width: "100%" }}
                />
                <div
                  className="h-full -mt-1.5 rounded-full bg-primary transition-[width] duration-150"
                  style={{ width: `${playedPct}%`, height: "6px" }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(1, Math.round(duration))}
                value={Math.round(current)}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="range absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <span className="text-[11px] w-10 tabular-nums opacity-70">
              {fmt(duration)}
            </span>
          </div>
        </div>

        <audio ref={aRef} src={src} preload="metadata" className="hidden" />
      </div>
    </div>
  );
}

/* ========== SVG icons ========== */
function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function PrevIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 6h2v12H6zM9 12l10 6V6z" />
    </svg>
  );
}
function NextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16 6h2v12h-2zM5 18l10-6L5 6z" />
    </svg>
  );
}
