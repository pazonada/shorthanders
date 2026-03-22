# Agent: Content freshness

**Purpose:** Keep platform content (rates, legal references, marketing copy) accurate and current.

---

## Statutory rate check

- **Trigger:** January 1 and July 1 (CA statutory update schedule per Gov. Code 69950)
- **Actions:**
  1. Check CA Gov. Code 69950 for rate changes
  2. If rates changed, update PRICING constants across the platform
  3. Update all pricing displays, calculators, and landing page copy
  4. Notify all active reporters and attorneys: "California statutory transcript rates have been updated effective [date]."
  5. Update the pricing comparison section on the landing page
- **Escalation:** Rate changes require Aud to review and deploy code changes

## Landing page social proof

- **Trigger:** Monthly, 1st of month
- **Actions:**
  1. Update traction metrics (reporter count, attorney count, jobs completed)
  2. Rotate testimonial quotes if new reviews are available
  3. Update "early traction" numbers with real data once live
- **Escalation:** None — automated metric pull from database

## Legal compliance content

- **Trigger:** Quarterly
- **Actions:**
  1. Check for changes to CA Rules of Court affecting transcript format/certification
  2. Check for CRB regulatory changes affecting licensing requirements
  3. Check for AB 5 / labor law developments affecting IC classification
  4. If changes found, flag for Rosie's legal review before updating platform
- **Escalation:** Any legal/regulatory change gets flagged to Rosie before any platform updates

## Blog / resource content (post-launch)

- **Trigger:** Bi-weekly
- **Actions:**
  1. Draft educational content for attorneys (how transcript pricing works, what to expect, etc.)
  2. Draft content for reporters (tax tips for ICs, platform best practices, etc.)
  3. Queue for Rosie's review before publishing
- **Escalation:** All content requires human review before publishing
