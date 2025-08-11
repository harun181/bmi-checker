import React, { useState, useEffect } from "react";

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

// Custom hook for responsive design
function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
}

const BmiGauge: React.FC<GaugeProps> = ({ bmi }) => {
  const isMobile = useResponsive();
  
  // Responsive dimensions
  const width = isMobile ? 320 : 420;
  const height = isMobile ? 200 : 260;
  const cx = width / 2;
  const cy = height * 0.95; // lower center to create a semi-circle
  const rOuter = isMobile ? 140 : 180;
  const rInner = isMobile ? 90 : 120;

  const ticks = [15, 18.5, 25, 30, 35, 40];

  const angle = bmi == null ? -180 : angleForValue(bmi);
  const cat = categoryForBMI(bmi);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base md:text-lg font-semibold text-primary">Result</h2>
      </div>
      
      {/* BMI Result Value */}
      {bmi && (
        <div className="mb-3 md:mb-4 text-center">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: cat ? `hsl(var(${cat.colorVar}))` : undefined }}>
            {bmi.toFixed(1)}
          </div>
          <div className="mt-1 text-xs md:text-sm font-medium text-muted-foreground">
            {cat ? (cat.label === "Normal" ? "Normal" : cat.label) : ""}
          </div>
        </div>
      )}
      
      <div className="relative w-full flex justify-center">
        <svg 
          width={width} 
          height={height} 
          viewBox={`0 0 ${width} ${height}`}
          className="max-w-full h-auto"
          role="img" 
          aria-label="BMI gauge"
        >
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
            const p = polarToCartesian(cx, cy, rInner - (isMobile ? 12 : 16), a);
            return (
              <text
                key={t}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isMobile ? 9 : 11}
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
              points={`${cx - (isMobile ? 6 : 8)},${cy - (isMobile ? 4 : 6)} ${cx + (isMobile ? 6 : 8)},${cy - (isMobile ? 4 : 6)} ${cx},${cy - (rInner - (isMobile ? 6 : 8))}`}
              fill="hsl(var(--foreground))"
            />
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 md:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-1 md:gap-y-2 text-xs md:text-sm">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="inline-block h-2 md:h-3 w-2 md:w-3 rounded-full"
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