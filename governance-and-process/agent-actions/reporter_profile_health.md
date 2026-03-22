# Agent: Reporter profile health

**Purpose:** Ensure reporter profiles are complete, accurate, and presenting well to attorneys browsing the marketplace.

---

## Weekly profile completeness check

- **Trigger:** Every Monday at 8:00 AM PT
- **Actions:**
  1. Scan all active reporter profiles for completeness
  2. Flag profiles missing: photo/avatar, bio, court coverage, availability schedule, certifications
  3. Send nudge email to reporters with <80% profile completeness: "Complete your profile to get matched with more jobs"
  4. Track completion rates over time
- **Escalation:** None — nudges only, no enforcement

## Availability staleness check

- **Trigger:** Every Monday at 8:00 AM PT
- **Actions:**
  1. Identify reporters who haven't updated their availability in >2 weeks
  2. Send reminder: "Your availability hasn't been updated recently. Attorneys see stale availability as a red flag."
  3. After 30 days of no update, add "Availability may be outdated" badge to profile
- **Escalation:** After 60 days, auto-set availability to "unavailable" and notify reporter

## Response rate monitoring

- **Trigger:** Daily at 9:00 AM PT
- **Actions:**
  1. Calculate each reporter's job response rate (accepted + declined / total offered) over rolling 30 days
  2. If response rate <50%, send warning: "You're not responding to job offers. Unresponsive reporters get lower priority in matching."
  3. If response rate <25% for 30+ days, reduce matching priority
- **Escalation:** If a reporter hasn't responded to any offers in 60 days, pause their profile and send reactivation email
