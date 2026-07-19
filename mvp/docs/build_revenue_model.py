#!/usr/bin/env python3
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.comments import Comment

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

# ---- title ----
ws["A1"] = "Dewey Sholes — revenue model"
ws["A1"].font = TITLE
ws.merge_cells("A1:F1")
ws["A2"] = "Illustrative, to frame the decision — not a forecast. Change the blue and yellow cells; everything recalculates. Prices are yours to set."
ws["A2"].font = SUB
ws.merge_cells("A2:F2")
ws["A3"] = "Blue = inputs you can change.   Yellow (“Your custom” column) = edit these to model your own scenario.   Black = calculated."
ws["A3"].font = SUB
ws.merge_cells("A3:F3")

# ---- column headers ----
r = 5
ws.cell(r, 1, "").fill = HDRFILL
for col, name in zip("BCDE", ["Launch", "Growth", "Scaled", "Your custom"]):
    c = ws[f"{col}{r}"]; c.value = name; c.font = HDR; c.fill = HDRFILL; c.alignment = center
ws.cell(r, 6, "Notes").font = HDR
ws.cell(r, 6).fill = HDRFILL
ws.cell(r, 1).fill = HDRFILL

# ---- INPUTS ----
def section(row, text):
    ws.cell(row, 1, text).font = BOLD
    for col in range(1, 7):
        ws.cell(row, col).fill = SECTIONFILL

section(6, "INPUTS")

# (label, [Launch, Growth, Scaled, Custom], numfmt, note)
inputs = [
    ("Active CSRs (real, from the CRB scrape)", [5705, 5705, 5705, 5705], INT, "Total active California CSRs in our data."),
    ("% of CSRs who claim a free profile",      [0.05, 0.10, 0.20, 0.05], PCT, "Of all active CSRs, how many sign up (free)."),
    ("Reporters on flat Pro (% of those who claim)", [0.15, 0.18, 0.20, 0.15], PCT, "Heavy users who buy the flat monthly plan."),
    ("Reporters on pay-as-you-go (% of those who claim)", [0.25, 0.30, 0.35, 0.25], PCT, "Occasional users who pay a fee only when they get paid."),
    ("Reporter Pro price ($/mo)",               [9, 15, 25, 9], CUR, "The flat monthly plan price."),
    ("Avg invoices per pay-as-you-go reporter (/mo)", [4, 5, 6, 4], INT, "How many invoices an occasional reporter sends per month."),
    ("Avg invoice amount ($)",                  [400, 450, 500, 400], CUR, "Typical invoice size."),
    ("Dewey Sholes fee on payments collected (%)", [0.01, 0.02, 0.03, 0.01], PCT, "Our cut of each payment (on top of Stripe's, which the reporter pays)."),
    ("Paying firms (#)",                        [100, 200, 500, 100], INT, "Firms on the paid subscription. This is the main lever."),
    ("Firm subscription ($/mo)",                [29, 59, 99, 29], CUR, "Monthly firm price."),
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

# convenience row refs
R_CSR = input_rows["Active CSRs (real, from the CRB scrape)"]
R_CLAIM = input_rows["% of CSRs who claim a free profile"]
R_FLAT = input_rows["Reporters on flat Pro (% of those who claim)"]
R_PAYGO = input_rows["Reporters on pay-as-you-go (% of those who claim)"]
R_PRICE = input_rows["Reporter Pro price ($/mo)"]
R_INV = input_rows["Avg invoices per pay-as-you-go reporter (/mo)"]
R_AMT = input_rows["Avg invoice amount ($)"]
R_FEE = input_rows["Dewey Sholes fee on payments collected (%)"]
R_FIRMS = input_rows["Paying firms (#)"]
R_FPRICE = input_rows["Firm subscription ($/mo)"]

# ---- RESULTS ----
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
    r_now = row
    row += 1
    return r_now

R_claimers = result("Reporters who claim (free)", lambda c: f"={c}{R_CSR}*{c}{R_CLAIM}", INT)
R_flatN = result("Reporters on flat Pro", lambda c: f"={c}{R_claimers}*{c}{R_FLAT}", INT)
R_pgN = result("Reporters on pay-as-you-go", lambda c: f"={c}{R_claimers}*{c}{R_PAYGO}", INT)
R_flatRev = result("Flat Pro revenue (/mo)", lambda c: f"={c}{R_flatN}*{c}{R_PRICE}", CUR)
R_vol = result("Payment volume through us (/mo)", lambda c: f"={c}{R_pgN}*{c}{R_INV}*{c}{R_AMT}", CUR, "Dollars flowing through pay-as-you-go reporters.")
R_txnRev = result("Transaction-fee revenue (/mo)", lambda c: f"={c}{R_vol}*{c}{R_FEE}", CUR, "Our cut of that volume.")
R_repRev = result("Reporter revenue (/mo)", lambda c: f"={c}{R_flatRev}+{c}{R_txnRev}", CUR, "Flat Pro + transaction fees.")
R_firmRev = result("Firm revenue (/mo)", lambda c: f"={c}{R_FIRMS}*{c}{R_FPRICE}", CUR)
R_totMo = result("TOTAL revenue (/mo)", lambda c: f"={c}{R_repRev}+{c}{R_firmRev}", CUR, total=True)
R_totYr = result("TOTAL revenue (/year)", lambda c: f"={c}{R_totMo}*12", CUR, total=True)
row += 1
R_firmShare = result("Firm share of revenue", lambda c: f"=IFERROR({c}{R_firmRev}/{c}{R_totMo},0)", PCT)
R_repShare = result("Reporter share of revenue", lambda c: f"=IFERROR({c}{R_repRev}/{c}{R_totMo},0)", PCT)

# column widths
ws.column_dimensions["A"].width = 44
for col in "BCDE":
    ws.column_dimensions[col].width = 13
ws.column_dimensions["F"].width = 52
ws.freeze_panes = "B6"

wb.save(OUT)
print("saved", OUT)
