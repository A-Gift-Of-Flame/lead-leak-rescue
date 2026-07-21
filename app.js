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

export const readinessChecks = Object.freeze([
  { id: "channels", label: "Every enquiry channel is inventoried" },
  { id: "owners", label: "Each channel has one named owner" },
  { id: "expectation", label: "The team has a clear acknowledgement and follow-up expectation" },
  { id: "stages", label: "Pipeline stages have practical entry and exit rules" },
  { id: "testing", label: "A test enquiry is submitted on a recurring schedule" },
]);

export function scoreReadiness(answers = {}) {
  const passed = readinessChecks.filter((check) => answers[check.id] === true);
  return {
    score: passed.length * 20,
    gaps: readinessChecks.filter((check) => answers[check.id] !== true).map((check) => check.label),
  };
}

export function buildReadinessReport(result) {
  const score = Number.isInteger(result?.score) ? Math.min(100, Math.max(0, result.score)) : 0;
  const allowed = new Set(readinessChecks.map((check) => check.label));
  const gaps = Array.isArray(result?.gaps) ? result.gaps.filter((gap) => allowed.has(gap)) : [];
  const lines = [
    "Lead Routing Readiness Check",
    `Score: ${score}/100`,
    "",
    gaps.length ? "Priority gaps:" : "No gaps selected in this self-check.",
    ...gaps.map((gap, index) => `${index + 1}. ${gap}`),
    "",
    "This is an operational self-check, not a performance or revenue guarantee.",
  ];
  return lines.join("\n");
}

export function buildFitCheckMailto(result) {
  const subject = "Lead Leak Rescue - readiness check";
  const body = `${buildReadinessReport(result)}\n\nI'd like to check whether the 72-hour fix fits.`;
  return `mailto:DigitalCommunitySolutions@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

function initializeReadinessCheck() {
  const form = document.querySelector("#readiness-check");
  const score = document.querySelector("#readiness-score");
  const summary = document.querySelector("#readiness-summary");
  const download = document.querySelector("#download-readiness");
  const fit = document.querySelector("#readiness-fit");
  if (!form || !score || !summary || !download || !fit) return;

  const current = () => scoreReadiness(Object.fromEntries(
    readinessChecks.map((check) => [check.id, form.elements.namedItem(check.id)?.checked === true]),
  ));
  const update = () => {
    const result = current();
    score.textContent = `${result.score}/100`;
    summary.textContent = result.gaps.length
      ? `${result.gaps.length} operational ${result.gaps.length === 1 ? "gap" : "gaps"} to review.`
      : "All five controls are marked in place.";
    fit.href = buildFitCheckMailto(result);
  };
  form.addEventListener("change", update);
  download.addEventListener("click", () => {
    const blob = new Blob([buildReadinessReport(current())], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lead-routing-readiness.txt";
    link.click();
    URL.revokeObjectURL(url);
  });
  update();
}

if (typeof document !== "undefined") {
  initializeCalculator();
  initializeReadinessCheck();
}
