import { useId } from 'react';

/**
 * An eight-point-star (khatam) girih lattice, drawn as a seamlessly tiling
 * SVG pattern. Every element is symmetric about the tile's edge midpoints and
 * corners, so adjacent tiles interlock into a continuous Levantine star-and-cross
 * mesh — the visual signature of the whole site.
 */

// One 100×100 tile: a centred octagram plus connectors to edge-midpoints and
// corners so stars link across tiles.
const STAR =
  'M50 12 L56.12 35.22 L76.87 23.13 L64.78 43.88 L88 50 L64.78 56.12 ' +
  'L76.87 76.87 L56.12 64.78 L50 88 L43.88 64.78 L23.13 76.87 L35.22 56.12 ' +
  'L12 50 L35.22 43.88 L23.13 23.13 L43.88 35.22 Z';

const CONNECTORS = [
  'M50 12 V0', 'M88 50 H100', 'M50 88 V100', 'M12 50 H0',
  'M76.87 23.13 L100 0', 'M76.87 76.87 L100 100',
  'M23.13 76.87 L0 100', 'M23.13 23.13 L0 0',
];

type FieldProps = {
  color?: string;
  opacity?: number;
  tile?: number;
  strokeWidth?: number;
  className?: string;
  /** draw the interlocking connector lines (fuller mesh) */
  mesh?: boolean;
};

export function StarField({
  color = 'currentColor',
  opacity = 1,
  tile = 108,
  strokeWidth = 1,
  className,
  mesh = true,
}: FieldProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={className}
      aria-hidden
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, opacity, color, pointerEvents: 'none' }}
    >
      <defs>
        <pattern
          id={`star-${id}`}
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
          viewBox="0 0 100 100"
        >
          <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
            <path d={STAR} />
            {mesh && CONNECTORS.map((d, i) => <path key={i} d={d} />)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#star-${id})`} />
    </svg>
  );
}

/** A single filled 8-point star — used as a bullet, seal and marker. */
export function Seal({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path
        d="M50 4 L59 34 L86 21 L72 46 L96 50 L72 54 L86 79 L59 66 L50 96 L41 66
           L14 79 L28 54 L4 50 L28 46 L14 21 L41 34 Z"
      />
    </svg>
  );
}

/** A thin horizontal band of the lattice, used to divide sections. */
export function StarBand({ tone = 'ink' }: { tone?: 'ink' | 'paper' | 'saffron' }) {
  const color =
    tone === 'paper' ? 'var(--paper)' : tone === 'saffron' ? 'var(--saffron)' : 'var(--ink)';
  return (
    <div className="starband" aria-hidden>
      <StarField color={color} opacity={0.16} tile={64} strokeWidth={1.1} />
    </div>
  );
}
