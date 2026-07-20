#!/usr/bin/env python3
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment

OUT = "/Users/audubondougherty/Desktop/AI_experiments/dewey-sholes/mvp/docs/revenue_model.xlsx"

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Revenue model"

ARIAL = "Arial"
BLUE = Font(name=ARIAL, color="0000FF", size=10)          # inputs / levers
BLACK = Font(name=ARIAL, color="000000", size=10)          # formulas
BOLD = Font(name=ARIAL, bold=True, size=10)
LBL = Font(name=ARIAL, size=10)
TITLE = Font(name=ARIAL, bold=True, size=14)
SUB = Font(name=ARIAL, italic=True, size=9, color="555555")
HDR = Font(name=ARIAL, bold=True, size=10, color="FFFFFF")
YELLOW = PatternFill("solid", fgColor="FFF2A8")
HDRFILL = PatternFill("solid", fgColor="2F3B52")
SECTIONFILL = PatternFill("solid", fgColor="EEF1FB")
TOTALFILL = PatternFill("solid", fgColor="E8EFE5")
right = Alignment(horizontal="right")
center = Alignment(horizontal="center")

CUR = '$#,##0'
PCT = '0.0%'
INT = '#,##0'

# ============ Sheet 1: revenue model (two-tier per-payment fee) ============
ws["A1"] = "Dewey Sholes – revenue model"
ws["A1"].font = TITLE
ws.merge_cells("A1:F1")
ws["A2"] = ("Illustrative, to frame the decision – not a forecast. Change the blue and yellow cells; everything "
            "recalculates. Reporters pay a per-payment fee, lower on Pro. Prices are yours to set.")
ws["A2"].font = SUB
ws.merge_cells("A2:F2")
ws["A3"] = "Blue = inputs you can change.   Yellow ('Your custom' column) = model your own scenario.   Black = calculated."
ws["A3"].font = SUB
ws.merge_cells("A3:F3")

r = 5
ws.cell(r, 1, "").fill = HDRFILL
for col, name in zip("BCDE", ["Launch", "Growth", "Scaled", "Your custom"]):
    c = ws[f"{col}{r}"]; c.value = name; c.font = HDR; c.fill = HDRFILL; c.alignment = center
ws.cell(r, 6, "Notes").font = HDR
ws.cell(r, 6).fill = HDRFILL
ws.cell(r, 1).fill = HDRFILL

def section(row, text):
    ws.cell(row, 1, text).font = BOLD
    for col in range(1, 7):
        ws.cell(row, col).fill = SECTIONFILL

section(6, "INPUTS")

# (label, [Launch, Growth, Scaled, Custom], numfmt, note)
inputs = [
    ("Active CSRs (real, from the CRB scrape)", [5705, 5705, 5705, 5705], INT, "Total active California CSRs in our data."),
    ("% of CSRs who claim a free profile", [0.05, 0.10, 0.20, 0.10], PCT, "Of all active CSRs, how many claim (free)."),
    ("Pro reporters (% of claimers)", [0.20, 0.25, 0.30, 0.25], PCT, "Claimers who upgrade to Pro: flat monthly PLUS the reduced fee."),
    ("Pay-per-invoice reporters (% of claimers)", [0.30, 0.35, 0.40, 0.35], PCT, "Claimers who collect on-platform on the base fee (the rest just list, no volume)."),
    ("Reporter Pro price ($/mo)", [29, 29, 29, 29], CUR, "Flat monthly Pro plan."),
    ("Base fee – pay-per-invoice (%)", [0.05, 0.05, 0.05, 0.05], PCT, "Our cut per payment for non-Pro reporters."),
    ("Pro fee (%)", [0.02, 0.02, 0.02, 0.02], PCT, "Reduced cut per payment for Pro reporters (who ALSO pay the sub)."),
    ("Avg billed per Pro reporter ($/mo)", [4000, 5000, 6000, 5000], CUR, "Dollars a Pro reporter runs THROUGH the platform monthly."),
    ("Avg billed per pay-per-invoice reporter ($/mo)", [700, 800, 1000, 800], CUR, "Dollars an occasional reporter runs through monthly."),
    ("Paying firms (#)", [50, 200, 500, 200], INT, "Firms on the paid subscription. Grow this."),
    ("Firm subscription ($/mo)", [29, 29, 29, 29], CUR, "Set to Pro price per your 'for kicks' – firms can bear more; raise later."),
]
row = 7
input_rows = {}
for label, vals, fmt, note in inputs:
    ws.cell(row, 1, label).font = LBL
    for i, col in enumerate("BCDE"):
        c = ws[f"{col}{row}"]; c.value = vals[i]; c.font = BLUE; c.number_format = fmt; c.alignment = right
        if col == "E":
            c.fill = YELLOW
    ws.cell(row, 6, note).font = SUB
    input_rows[label] = row
    row += 1

R_CSR = input_rows["Active CSRs (real, from the CRB scrape)"]
R_CLAIM = input_rows["% of CSRs who claim a free profile"]
R_PROP = input_rows["Pro reporters (% of claimers)"]
R_PPIP = input_rows["Pay-per-invoice reporters (% of claimers)"]
R_PRICE = input_rows["Reporter Pro price ($/mo)"]
R_BASEF = input_rows["Base fee – pay-per-invoice (%)"]
R_PROF = input_rows["Pro fee (%)"]
R_PROBILL = input_rows["Avg billed per Pro reporter ($/mo)"]
R_PPIBILL = input_rows["Avg billed per pay-per-invoice reporter ($/mo)"]
R_FIRMS = input_rows["Paying firms (#)"]
R_FPRICE = input_rows["Firm subscription ($/mo)"]

res_start = row + 1
section(res_start, "RESULTS")
row = res_start + 1

def result(label, formula_fn, fmt, note="", total=False):
    global row
    ws.cell(row, 1, label).font = BOLD if total else LBL
    for col in "BCDE":
        c = ws[f"{col}{row}"]; c.value = formula_fn(col); c.font = BLACK if not total else BOLD
        c.number_format = fmt; c.alignment = right
        if total:
            c.fill = TOTALFILL
    if total:
        ws.cell(row, 1).fill = TOTALFILL
        ws.cell(row, 6).fill = TOTALFILL
    if note:
        ws.cell(row, 6, note).font = SUB
    rr = row
    row += 1
    return rr

R_claim = result("Reporters who claim (free)", lambda c: f"={c}{R_CSR}*{c}{R_CLAIM}", INT)
R_proN = result("Pro reporters", lambda c: f"={c}{R_claim}*{c}{R_PROP}", INT)
R_ppiN = result("Pay-per-invoice reporters", lambda c: f"={c}{R_claim}*{c}{R_PPIP}", INT)
R_proVol = result("Pro billing volume (/mo)", lambda c: f"={c}{R_proN}*{c}{R_PROBILL}", CUR)
R_ppiVol = result("Pay-per-invoice billing volume (/mo)", lambda c: f"={c}{R_ppiN}*{c}{R_PPIBILL}", CUR)
R_totVol = result("Total payment volume through us (/mo)", lambda c: f"={c}{R_proVol}+{c}{R_ppiVol}", CUR, "All dollars flowing through Stripe on the platform.")
R_proSub = result("Pro subscription revenue (/mo)", lambda c: f"={c}{R_proN}*{c}{R_PRICE}", CUR)
R_proFee = result("Pro fee revenue (/mo)", lambda c: f"={c}{R_proVol}*{c}{R_PROF}", CUR, "The Pro fee on Pro reporters' volume.")
R_ppiFee = result("Pay-per-invoice fee revenue (/mo)", lambda c: f"={c}{R_ppiVol}*{c}{R_BASEF}", CUR, "The base fee on everyone else's volume.")
R_repRev = result("Reporter revenue (/mo)", lambda c: f"={c}{R_proSub}+{c}{R_proFee}+{c}{R_ppiFee}", CUR, "Pro subs + both fee tiers.")
R_firmRev = result("Firm revenue (/mo)", lambda c: f"={c}{R_FIRMS}*{c}{R_FPRICE}", CUR)
R_totMo = result("TOTAL revenue (/mo)", lambda c: f"={c}{R_repRev}+{c}{R_firmRev}", CUR, total=True)
R_totYr = result("TOTAL revenue (/year)", lambda c: f"={c}{R_totMo}*12", CUR, total=True)
row += 1
R_feeShare = result("Fee revenue as % of total", lambda c: f"=IFERROR(({c}{R_proFee}+{c}{R_ppiFee})/{c}{R_totMo},0)", PCT, "How much of everything is the per-payment fee.")
R_repShare = result("Reporter share of revenue", lambda c: f"=IFERROR({c}{R_repRev}/{c}{R_totMo},0)", PCT)
R_firmShare = result("Firm share of revenue", lambda c: f"=IFERROR({c}{R_firmRev}/{c}{R_totMo},0)", PCT)

ws.column_dimensions["A"].width = 46
for col in "BCDE":
    ws.column_dimensions[col].width = 13
ws.column_dimensions["F"].width = 56
ws.freeze_panes = "B6"

# ============ Sheet 2: CSR email -> Pro conversion funnel ============
ws2 = wb.create_sheet("CSR conversion")

ws2["A1"] = "Dewey Sholes – CSR email to Pro conversion"
ws2["A1"].font = TITLE
ws2.merge_cells("A1:C1")
ws2["A2"] = ("Illustrative and adjustable. Change the blue cells. The last step (claim to paid Pro) is the "
             "softest – free-to-paid is often 5-15%, so keep it conservative. Prices/rates are yours to set.")
ws2["A2"].font = SUB
ws2.merge_cells("A2:C2")

def section2(row, text):
    ws2.cell(row, 1, text).font = BOLD
    for col in range(1, 4):
        ws2.cell(row, col).fill = SECTIONFILL

hr = 4
ws2.cell(hr, 1, "").fill = HDRFILL
c = ws2.cell(hr, 2, "Value"); c.font = HDR; c.fill = HDRFILL; c.alignment = center
c = ws2.cell(hr, 3, "Notes"); c.font = HDR; c.fill = HDRFILL

section2(5, "INPUTS  (blue = change these)")
cinputs = [
    ("CSRs emailed", 5145, INT, "Independent CSRs on the send list (the ~556 court-employed are held back)."),
    ("Open the email (%)", 0.30, PCT, "Share who open a one-time personal note. ~30% is reasonable for a warm, personal email."),
    ("Claim a free profile (% of openers)", 0.30, PCT, "Openers who claim their free profile."),
    ("Upgrade to Pro (% of claimers)", 0.30, PCT, "Claimers who take the paid Pro plan (with the discount code). Softest assumption."),
    ("Reporter Pro price ($/mo)", 29, CUR, "Your figure to set – illustrative, not a decided price."),
    ("Year-1 discount code (%)", 0.0, PCT, "Percent off in year one via the founding code. Set your own."),
]
r2 = 6
crow = {}
for label, val, fmt, note in cinputs:
    ws2.cell(r2, 1, label).font = LBL
    c = ws2.cell(r2, 2, val); c.font = BLUE; c.number_format = fmt; c.alignment = right
    ws2.cell(r2, 3, note).font = SUB
    crow[label] = r2
    r2 += 1

R_EMAIL = crow["CSRs emailed"]
R_OPEN = crow["Open the email (%)"]
R_CLAIMR = crow["Claim a free profile (% of openers)"]
R_PROR = crow["Upgrade to Pro (% of claimers)"]
R_PPRICE = crow["Reporter Pro price ($/mo)"]
R_DISC = crow["Year-1 discount code (%)"]

section2(r2 + 1, "RESULTS  (black = calculated)")
r2 += 2

def result2(label, formula, fmt, note="", total=False):
    global r2
    ws2.cell(r2, 1, label).font = BOLD if total else LBL
    c = ws2.cell(r2, 2); c.value = formula; c.font = BOLD if total else BLACK
    c.number_format = fmt; c.alignment = right
    if total:
        ws2.cell(r2, 1).fill = TOTALFILL
        ws2.cell(r2, 2).fill = TOTALFILL
        ws2.cell(r2, 3).fill = TOTALFILL
    if note:
        ws2.cell(r2, 3, note).font = SUB
    rr = r2
    r2 += 1
    return rr

R_OPENERS = result2("Openers", f"=B{R_EMAIL}*B{R_OPEN}", INT)
R_CLAIMERS = result2("Claimers (free profiles)", f"=B{R_OPENERS}*B{R_CLAIMR}", INT)
R_PRO = result2("Pro reporters (paid)", f"=B{R_CLAIMERS}*B{R_PROR}", INT, "The paying reporter count.")
result2("On pay-per-invoice (claimed, not Pro)", f"=B{R_CLAIMERS}-B{R_PRO}", INT,
        "Not $0 – they pay the base fee when they get paid (see the Revenue model sheet).")
result2("Overall email-to-Pro rate", f"=IFERROR(B{R_PRO}/B{R_EMAIL},0)", PCT)
result2("Monthly Pro revenue (full price)", f"=B{R_PRO}*B{R_PPRICE}", CUR)
R_MO1 = result2("Monthly Pro revenue (year 1, after discount)", f"=B{R_PRO}*B{R_PPRICE}*(1-B{R_DISC})", CUR, total=True)
result2("Annual Pro revenue (year 1)", f"=B{R_MO1}*12", CUR, total=True)

foot = r2 + 1
ws2.cell(foot, 1, "This is the Pro-subscription slice only. Per-payment fees and firm subscriptions are on the 'Revenue model' sheet.").font = SUB
ws2.merge_cells(start_row=foot, start_column=1, end_row=foot, end_column=3)

ws2.column_dimensions["A"].width = 42
ws2.column_dimensions["B"].width = 14
ws2.column_dimensions["C"].width = 62
ws2.freeze_panes = "A5"

# ============ Sheet 3: what it takes to net a target ============
ws3 = wb.create_sheet("Net target")

ws3["A1"] = "Dewey Sholes – what it takes to net a target"
ws3["A1"].font = TITLE
ws3.merge_cells("A1:C1")
ws3["A2"] = ("Two paths to the same take-home, side by side. Change the blue cells. "
             "Not tax advice – confirm the rate with an accountant.")
ws3["A2"].font = SUB
ws3.merge_cells("A2:C2")

def section3(row, text):
    ws3.cell(row, 1, text).font = BOLD
    for col in range(1, 4):
        ws3.cell(row, col).fill = SECTIONFILL

hr = 4
ws3.cell(hr, 1, "").fill = HDRFILL
c = ws3.cell(hr, 2, "Value"); c.font = HDR; c.fill = HDRFILL; c.alignment = center
c = ws3.cell(hr, 3, "Notes"); c.font = HDR; c.fill = HDRFILL

r3 = 5
def inp3(label, val, fmt, note):
    global r3
    ws3.cell(r3, 1, label).font = LBL
    c = ws3.cell(r3, 2, val); c.font = BLUE; c.number_format = fmt; c.alignment = right
    ws3.cell(r3, 3, note).font = SUB
    rr = r3; r3 += 1
    return rr

def res3(label, formula, fmt, note="", total=False):
    global r3
    ws3.cell(r3, 1, label).font = BOLD if total else LBL
    c = ws3.cell(r3, 2); c.value = formula; c.font = BOLD if total else BLACK
    c.number_format = fmt; c.alignment = right
    if total:
        ws3.cell(r3, 1).fill = TOTALFILL
        ws3.cell(r3, 2).fill = TOTALFILL
        ws3.cell(r3, 3).fill = TOTALFILL
    if note:
        ws3.cell(r3, 3, note).font = SUB
    rr = r3; r3 += 1
    return rr

section3(r3, "SHARED INPUTS  (blue = change these)"); r3 += 1
R_NET = inp3("Net take-home target ($/yr)", 150000, CUR, "What you want to keep after taxes and expenses.")
R_TAX = inp3("Tax rate (%)", 0.33, PCT, "All-in: federal + self-employment + NJ. Rough – confirm with an accountant.")
R_TECH = inp3("Tech + tools ($/yr)", 12000, CUR, "Hosting, email, Stripe account fees, SaaS. Small at this scale.")
R_ENG = inp3("Engineer / dev help ($/yr, optional)", 0, CUR, "On-call engineering, if you pay for it. 0 if not.")

r3 += 1
section3(r3, "WHAT YOU NEED TO GROSS"); r3 += 1
R_GYR = res3("Gross revenue needed ($/yr)", f"=B{R_NET}/(1-B{R_TAX})+B{R_TECH}+B{R_ENG}", CUR)
R_GMO = res3("Gross needed ($/mo)", f"=B{R_GYR}/12", CUR)

r3 += 1
section3(r3, "PATH A – subscriptions (firms + CSR Pro)"); r3 += 1
R_SPRICE = inp3("Price per paying user ($/mo)", 29, CUR, "Same for firms and CSRs, per your 'for kicks'.")
res3("Paying users needed", f"=B{R_GYR}/(B{R_SPRICE}*12)", INT,
     "Mostly firms – CSR Pro realistically tops out ~50-140.", total=True)

r3 += 1
section3(r3, "PATH B – per-payment fee (reporters collecting on-platform)"); r3 += 1
R_FEE = inp3("Effective (blended) fee per payment (%)", 0.03, PCT,
             "Pro reporters pay ~2%, others ~5%; ~3% is a middle blend. The Revenue model tab has the full split.")
R_BILL = inp3("Avg billed per active reporter ($/mo)", 4000, CUR, "Dollars a paying reporter runs THROUGH the platform per month.")
R_VOL = res3("Monthly payment volume needed ($/mo)", f"=B{R_GMO}/B{R_FEE}", CUR, "Total $ that must flow through Stripe on the platform.")
res3("Reporters actively collecting needed", f"=B{R_VOL}/B{R_BILL}", INT,
     "Only money actually collected on-platform counts – off-platform checks earn $0.", total=True)

r3 += 1
ws3.cell(r3, 1, ("Same take-home, two different asks: a pile of paying FIRMS (Path A) vs. reporters routing real "
                 "PAYMENT through you (Path B). Path B usually needs fewer people, but more behavior change – "
                 "the whole fee line only exists on money collected through the platform.")).font = SUB
ws3.merge_cells(start_row=r3, start_column=1, end_row=r3, end_column=3)

ws3.column_dimensions["A"].width = 44
ws3.column_dimensions["B"].width = 14
ws3.column_dimensions["C"].width = 66
ws3.freeze_panes = "A5"

wb.save(OUT)
print("saved", OUT)
