import test from "node:test";
import assert from "node:assert/strict";
import { buildFitCheckMailto, buildReadinessReport, estimateOpportunity, formatEuro, scoreReadiness } from "../app.js";

test("estimates modeled opportunity from the four inputs", () => {
  assert.equal(
    estimateOpportunity({ leads: 40, dealValue: 1500, closeRate: 15, leakRate: 20 }),
    1800,
  );
});

test("bounds percentages and rejects invalid values", () => {
  assert.equal(estimateOpportunity({ leads: 10, dealValue: 100, closeRate: 150, leakRate: 150 }), 1000);
  assert.equal(estimateOpportunity({ leads: -1, dealValue: 100, closeRate: 10, leakRate: 10 }), 0);
  assert.equal(estimateOpportunity({ leads: "nope", dealValue: 100, closeRate: 10, leakRate: 10 }), 0);
});

test("formats whole euro values", () => {
  assert.match(formatEuro(1800), /1[,.]800|1\s800/);
  assert.match(formatEuro(1800), /€/);
});

test("readiness scoring is bounded and gaps retain operational priority", () => {
  assert.deepEqual(scoreReadiness({ channels: true, stages: true }), {
    score: 40,
    gaps: [
      "Each channel has one named owner",
      "The team has a clear acknowledgement and follow-up expectation",
      "A test enquiry is submitted on a recurring schedule",
    ],
  });
  assert.equal(scoreReadiness({ channels: true, owners: true, expectation: true, stages: true, testing: true, invented: true }).score, 100);
});

test("readiness report and mailto contain only allowlisted operational results", () => {
  const result = scoreReadiness({ channels: true, owners: true });
  const report = buildReadinessReport({ ...result, gaps: [...result.gaps, "invented claim"] });
  assert.match(report, /Score: 40\/100/);
  assert.doesNotMatch(report, /invented claim/);
  assert.match(report, /not a performance or revenue guarantee/);
  const mailto = buildFitCheckMailto(result);
  assert.match(mailto, /^mailto:DigitalCommunitySolutions@proton\.me\?/);
  assert.match(decodeURIComponent(mailto), /Score: 40\/100/);
});
