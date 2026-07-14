# Upwork proposal pack

Do not include the public landing-page URL in an Upwork proposal because it contains off-platform contact information. Keep all pre-contract communication and payment on Upwork.

## UW-002 — Duplicate contacts

Your duplicate-contact cleanup is a good fit for a controlled, reversible sprint. I would start with an export, agree on the match rules (email, domain, name/company, and conflict handling), and produce a dry-run merge report before changing records. After approval, I would merge in batches, preserve the surviving record IDs, and verify associations and ownership with a post-cleanup sample.

I suggest a small paid first milestone: audit the database and return the duplicate groups, proposed survivor for each group, and exceptions needing human judgment. That keeps the risk visible before any destructive action. If you share the approximate contact count and your HubSpot tier, I can size that milestone precisely.

## UW-001 — Form and lead routing

I would treat this as one testable path: quiz result → HubSpot contact fields → assignment rule → owner notification. Before building, I would map every quiz output to a property, identify the fallback for incomplete submissions, and confirm whether your HubSpot tier supports the routing behavior you want. Delivery would include a test matrix covering each result path and a short handoff note so the setup is maintainable.

The first milestone can be the field/routing map plus one end-to-end working result path. Once that passes, the remaining branches become mechanical. Please share the quiz URL or its output schema and the number of routing destinations.

## UW-003 — CRM data cleanup pilot

For a larger cleanup, I recommend proving the rules on a bounded sample before committing the full budget. I can audit a representative export, quantify duplicate and incomplete-field patterns, define survivor and normalization rules, and return a dry-run change report. Nothing is merged or overwritten until you approve that report.

A sensible first milestone is 1,000 representative records with measurable acceptance criteria: duplicate groups identified, required fields normalized, exceptions isolated, and a rollback export retained. If the pilot is accurate, the same rules can scale across the remaining database. What are the approximate record count, main data sources, and highest-risk associations?

## UW-006 — Follow-up workflow

I can keep this intentionally simple: one enrollment trigger, explicit suppression rules, a named owner/fallback, the follow-up sequence, and an internal alert when the path fails. I would first diagram the current form-to-contact behavior, then build and test with non-customer records so live leads are not accidentally enrolled.

Delivery would include the working path, a test record for each branch, and a one-page handoff covering how to pause or edit it. Please share your HubSpot tier, the trigger source, sequence length, and any contacts that must never be enrolled.

## UW-012 — Contact/company import cleanup

For a short import task, I would work from an untouched source export and make the transformation reproducible: normalize headers and values, separate contacts from companies, define association keys, flag ambiguous rows, and validate a small import before the full file. You receive the cleaned files, exception list, field map, and import log.

This avoids the common failure mode where a quick import creates duplicates or loses company associations. Please share row counts, source format, existing HubSpot objects, and whether email/domain can serve as stable keys.

## Submission order

1. UW-002 — narrowest and newest cleanup request.
2. UW-001 — newest direct match to lead routing.
3. UW-006 — simple workflow, still recent.
4. UW-012 — exact short-task fit; confirm it remains open.
5. UW-003 — use only as a paid pilot proposal, not a promise to deliver the entire project immediately.

Stop after five submissions and measure views/replies before spending additional Connects.
