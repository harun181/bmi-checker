import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import BmiGauge from "@/components/BmiGauge";
import { SlidersHorizontal } from "lucide-react";

const Index = () => {
  const [feet, setFeet] = useState<number | "">(00);
  const [inches, setInches] = useState<number | "">(00);
  const [weight, setWeight] = useState<number | "">(00);
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    document.title = "BMI Calculator – Fast & Accurate";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Calculate your Body Mass Index (BMI) instantly using feet, inches, and kilograms with a visual result meter.");
  }, []);

  const isValid = useMemo(() => {
    return feet !== "" && inches !== "" && weight !== "" && feet >= 0 && inches >= 0 && inches < 12 && weight > 0;
  }, [feet, inches, weight]);

  const handleCalculate = () => {
    if (!isValid) return setBmi(null);
    const totalInches = Number(feet) * 12 + Number(inches);
    const heightMeters = totalInches * 2.54 / 100; // inches to meters
    const bmiCalc = Number(weight) / (heightMeters * heightMeters);
    setBmi(bmiCalc);
  };

  return (
    <main className="min-h-screen w-full">
      <section className="container py-10 md:py-16">
        <Card className="rounded-3xl shadow-elegant border-0 md:p-6 bg-card/95">
          <CardContent className="p-6">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">BMI Calculator</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Left: Form */}
              <article aria-labelledby="bmi-form-title">
                <h2 id="bmi-form-title" className="sr-only">Enter your height and weight</h2>
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Your Height</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value === "" ? "" : Math.max(0, Math.floor(Number(e.target.value))))}
                          aria-label="Feet"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-muted-foreground select-none">ft</span>
                      </div>
                      <div className="relative">
                        <Input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={inches}
                          onChange={(e) => {
                            const val = e.target.value === "" ? "" : Math.max(0, Math.floor(Number(e.target.value)));
                            setInches(val === "" ? "" : Math.min(11, Number(val)));
                          }}
                          aria-label="Inches"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-muted-foreground select-none">in</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Your Weight</Label>
                    <div className="relative">
                      <Input
                        inputMode="decimal"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                        aria-label="Weight in kilograms"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-muted-foreground select-none">kg</span>
                    </div>
                  </div>

                  <div>
                    <Button variant="brand" size="lg" className="w-full" onClick={handleCalculate} aria-label="Calculate BMI">
                      <SlidersHorizontal />
                      Calculator
                    </Button>
                    {!isValid && (
                      <p className="mt-2 text-sm text-destructive">Please enter valid numbers. Inches must be 0–11.</p>
                    )}
                  </div>
                </div>
              </article>

              {/* Right: Gauge */}
              <aside>
                <BmiGauge bmi={bmi} />
              </aside>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Index;
