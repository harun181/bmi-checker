import React from "react";

interface GaugeProps {
  bmi: number | null;
}

// Utility to create an SVG arc path
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number
) {
  const p1 = polarToCartesian(cx, cy, rOuter, endAngle);
  const p2 = polarToCartesian(cx, cy, rOuter, startAngle);
  const p3 = polarToCartesian(cx, cy, rInner, startAngle);
  const p4 = polarToCartesian(cx, cy, rInner, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  // Outer arc -> line -> inner arc -> close
  return [
    "M", p1.x, p1.y,
    "A", rOuter, rOuter, 0, largeArcFlag, 0, p2.x, p2.y,
    "L", p3.x, p3.y,
    "A", rInner, rInner, 0, largeArcFlag, 1, p4.x, p4.y,
    "Z",
  ].join(" ");
}

const MIN = 15;
const MAX = 40;

const segments = [
  { label: "Underweight", from: 15, to: 18.5, colorVar: "--bmi-underweight" },
  { label: "Normal", from: 18.5, to: 25, colorVar: "--bmi-normal" },
  { label: "Overweight", from: 25, to: 30, colorVar: "--bmi-overweight" },
  { label: "Obese class I", from: 30, to: 35, colorVar: "--bmi-obese1" },
  { label: "Obese class II", from: 35, to: 40, colorVar: "--bmi-obese2" },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function angleForValue(value: number) {
  const t = (clamp(value, MIN, MAX) - MIN) / (MAX - MIN); // 0..1
  return -180 + 180 * t; // -180..0 deg
}

function categoryForBMI(bmi: number | null) {
  if (bmi == null) return null;
  for (const s of segments) {
    if (bmi >= s.from && bmi < s.to) return s;
  }
  return segments[segments.length - 1];
}

const BmiGauge: React.FC<GaugeProps> = ({ bmi }) => {
  const width = 420;
  const height = 260;
  const cx = width / 2;
  const cy = height * 0.95; // lower center to create a semi-circle
  const rOuter = 180;
  const rInner = 120;

  const ticks = [15, 18.5, 25, 30, 35, 40];

  const angle = bmi == null ? -180 : angleForValue(bmi);
  const cat = categoryForBMI(bmi);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-primary">Result</h2>
      </div>
      <div className="relative">
        <svg width={width} height={height} role="img" aria-label="BMI gauge">
          {/* Colored segments */}
          {segments.map((s) => {
            const sa = angleForValue(s.from);
            const ea = angleForValue(s.to);
            return (
              <path
                key={s.label}
                d={describeArc(cx, cy, rOuter, rInner, sa, ea)}
                style={{ fill: `hsl(var(${s.colorVar}))` }}
                opacity={0.95}
              />
            );
          })}

          {/* Tick labels */}
          {ticks.map((t) => {
            const a = angleForValue(t);
            const p = polarToCartesian(cx, cy, rInner - 16, a);
            return (
              <text
                key={t}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={11}
                fill="hsl(var(--muted-foreground))"
              >
                {t}
              </text>
            );
          })}

          {/* Pointer */}
          <g
            style={{
              transform: `rotate(${angle + 90}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: "transform 600ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <polygon
              points={`${cx - 8},${cy - 6} ${cx + 8},${cy - 6} ${cx},${cy - (rInner - 8)}`}
              fill="hsl(var(--foreground))"
            />
          </g>
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="text-4xl md:text-5xl font-bold" style={{ color: cat ? `hsl(var(${cat.colorVar}))` : undefined }}>
            {bmi ? bmi.toFixed(1) : "--"}
          </div>
          <div className="mt-1 text-sm font-medium" style={{ color: cat ? `hsl(var(${cat.colorVar}))` : undefined }}>
            {cat ? (cat.label === "Normal" ? "Normal" : cat.label) : ""}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: `hsl(var(${s.colorVar}))` }}
              aria-hidden
            />
            <span className="text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BmiGauge;
