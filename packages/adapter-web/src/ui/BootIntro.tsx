import { useEffect, useRef, useState } from 'preact/hooks';

const LINES = [
  '> ESTABLISHING UPLINK ........ OK',
  '> DECRYPTING CHANNEL ......... OK',
  '> CIPHER // GUARDIAN ONLINE',
];

interface Props { onDone: () => void; }

/** One-shot typing boot overlay. Calls onDone when finished (or immediately when skipped). */
export function BootIntro({ onDone }: Props) {
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let i = 0; let acc: string[] = [];
    const step = () => {
      if (i >= LINES.length) {
        const t = window.setTimeout(() => { setDone(true); window.setTimeout(onDone, 450); }, 350);
        timers.current.push(t);
        return;
      }
      acc = [...acc, LINES[i]]; setShown(acc); i++;
      const t = window.setTimeout(step, 420);
      timers.current.push(t);
    };
    step();
    return () => { timers.current.forEach(clearTimeout); };
  }, []);

  return (
    <div class={`nv-boot${done ? ' nv-boot-out' : ''}`} aria-hidden="true">
      <div class="nv-boot-lines">
        {shown.map((l, k) => <div key={k} class="nv-boot-line">{l}</div>)}
        <div class="nv-boot-cursor">_</div>
      </div>
    </div>
  );
}
