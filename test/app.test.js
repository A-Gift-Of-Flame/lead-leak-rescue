import test from "node:test";
import assert from "node:assert/strict";
import { estimateOpportunity, formatEuro } from "../app.js";

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
