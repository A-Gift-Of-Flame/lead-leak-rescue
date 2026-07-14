export function estimateOpportunity({ leads, dealValue, closeRate, leakRate }) {
  const values = [leads, dealValue, closeRate, leakRate].map(Number);
  if (values.some((value) => !Number.isFinite(value) || value < 0)) return 0;

  const [leadCount, saleValue, closePercent, leakPercent] = values;
  const boundedCloseRate = Math.min(closePercent, 100) / 100;
  const boundedLeakRate = Math.min(leakPercent, 100) / 100;
  return leadCount * saleValue * boundedCloseRate * boundedLeakRate;
}

export function formatEuro(value, locale = "en-BE") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function initializeCalculator() {
  const form = document.querySelector("#leak-calculator");
  const output = document.querySelector("#result-value");
  if (!form || !output) return;

  const update = () => {
    const data = new FormData(form);
    output.textContent = formatEuro(
      estimateOpportunity({
        leads: data.get("leads"),
        dealValue: data.get("dealValue"),
        closeRate: data.get("closeRate"),
        leakRate: data.get("leakRate"),
      }),
    );
  };

  form.addEventListener("input", update);
  update();
}

if (typeof document !== "undefined") initializeCalculator();
