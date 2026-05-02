import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#0a1628",
  darkBlue: "#132744",
  medBlue: "#1a3a5c",
  accent: "#0078d4",
  accentLight: "#e6f2ff",
  red: "#d4380d",
  redBg: "#fff1ec",
  orange: "#d46b08",
  orangeBg: "#fff7e6",
  green: "#389e0d",
  greenBg: "#f0fce8",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray700: "#374151",
  gray900: "#111827",
};

const AISparkle = ({ size = 16, color = COLORS.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill={color} />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CheckCircle = ({ color = COLORS.green, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M8 12.5L10.5 15L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = ({ color = COLORS.orange }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 22H22L12 2Z" fill={color} />
    <path d="M12 10V14M12 17V17.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ErrorIcon = ({ color = COLORS.red }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M12 8V13M12 16V16.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const StatusBar = () => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 4px", color: COLORS.gray900, fontSize: 14, fontWeight: 600 }}>
    <span>9:41</span>
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="3" width="3" height="9" rx="1" fill={COLORS.gray900}/><rect x="4.5" y="2" width="3" height="10" rx="1" fill={COLORS.gray900}/><rect x="9" y="0" width="3" height="12" rx="1" fill={COLORS.gray900}/><rect x="13.5" y="0" width="3" height="12" rx="1" fill={COLORS.gray200}/></svg>
      <svg width="16" height="12" viewBox="0 0 24 16"><path d="M2 8C5.5 2 18.5 2 22 8" stroke={COLORS.gray900} strokeWidth="2.5" fill="none"/><circle cx="12" cy="12" r="2.5" fill={COLORS.gray900}/></svg>
      <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0" y="0" width="22" height="12" rx="3" stroke={COLORS.gray900} strokeWidth="1.5" fill="none"/><rect x="2" y="2" width="15" height="8" rx="1.5" fill={COLORS.green}/><rect x="23" y="3.5" width="3" height="5" rx="1" fill={COLORS.gray400}/></svg>
    </div>
  </div>
);

const NavHeader = ({ title, onBack, rightAction }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", borderBottom: `1px solid ${COLORS.gray200}` }}>
    {onBack ? (
      <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.accent, fontSize: 15, fontWeight: 500, cursor: "pointer", padding: "4px 0" }}>
        ← Back
      </button>
    ) : <div style={{ width: 60 }} />}
    <span style={{ fontSize: 17, fontWeight: 600, color: COLORS.gray900 }}>{title}</span>
    {rightAction || <div style={{ width: 60 }} />}
  </div>
);

const AIBadge = ({ label }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "linear-gradient(135deg, #e6f2ff, #f0e6ff)", padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, color: COLORS.accent }}>
    <AISparkle size={10} /> {label}
  </span>
);

// ==========================================
// SCREEN 1: Expense List with AI Insights
// ==========================================
const EXPENSES = [
  { id: 1, merchant: "American Airlines", category: "Travel", amount: 1500.00, date: "May 14, 2025", status: "complete", hasReceipt: true },
  { id: 2, merchant: "Uber", category: "Taxi", amount: 82.09, date: "May 14, 2025", status: "incomplete", hasReceipt: false, issue: "Missing receipt" },
  { id: 3, merchant: "The Westin - Denver", category: "Hotel", amount: 900.00, date: "May 13, 2025", status: "flagged", hasReceipt: true, issue: "Exceeds $350/night hotel policy" },
  { id: 4, merchant: "Starbucks", category: "Food", amount: 65.03, date: "Apr 16, 2025", status: "complete", hasReceipt: true },
  { id: 5, merchant: "Client Dinner - Nobu", category: "Meals", amount: 294.05, date: "Apr 16, 2025", status: "flagged", hasReceipt: true, issue: "Exceeds $75/person meal limit" },
];

const ExpenseRow = ({ exp, onClick }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "flex-start", width: "100%", padding: "14px 16px", background: "none", border: "none", borderBottom: `1px solid ${COLORS.gray100}`, cursor: "pointer", textAlign: "left" }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, background: exp.status === "flagged" ? COLORS.orangeBg : exp.status === "incomplete" ? COLORS.redBg : COLORS.greenBg, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, flexShrink: 0, marginTop: 2 }}>
      {exp.status === "flagged" ? <WarningIcon /> : exp.status === "incomplete" ? <ErrorIcon /> : <CheckCircle />}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.gray900 }}>{exp.merchant}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>${exp.amount.toFixed(2)}</span>
      </div>
      <div style={{ marginTop: 3 }}>
        <span style={{ fontSize: 12, color: COLORS.gray500 }}>{exp.category} · {exp.date}</span>
      </div>
      {exp.issue && (
        <div style={{ marginTop: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: exp.status === "flagged" ? COLORS.orange : COLORS.red, background: exp.status === "flagged" ? COLORS.orangeBg : COLORS.redBg, padding: "3px 8px", borderRadius: 10, display: "inline-block" }}>
            {exp.issue}
          </span>
        </div>
      )}
    </div>
    <div style={{ marginLeft: 8, marginTop: 4, flexShrink: 0 }}>
      <ChevronRight />
    </div>
  </button>
);

const ExpenseList = ({ onSelectExpense, onCreateReport, onSubmitReport, onResolveIssues, onGenerateReceipt, onViewComplete, onViewFlagged, tempUpdate, showHighlight, reportSubmitted }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All", "Flagged", "Incomplete", "Complete"];

  // Apply persistent updates to the expense list
  const updates = tempUpdate ? tempUpdate.split(",") : [];
  let displayExpenses = [...EXPENSES];

  if (updates.includes("new-expense")) {
    displayExpenses = [
      { id: 99, merchant: "The Capital Grille", category: "Meals", amount: 187.50, date: "May 14, 2025", status: "complete", hasReceipt: true },
      ...displayExpenses,
    ];
  }
  if (updates.includes("uber-complete")) {
    displayExpenses = displayExpenses.map(e =>
      e.merchant === "Uber" ? { ...e, status: "complete", hasReceipt: true, issue: null } : e
    );
  }
  if (updates.includes("westin-resolved")) {
    displayExpenses = displayExpenses.map(e =>
      e.merchant === "The Westin - Denver" ? { ...e, status: "complete", issue: null } : e
    );
  }
  if (updates.includes("nobu-resolved")) {
    displayExpenses = displayExpenses.map(e =>
      e.merchant === "Client Dinner - Nobu" ? { ...e, status: "complete", issue: null } : e
    );
  }

  const filtered = activeTab === 0 ? displayExpenses
    : activeTab === 1 ? displayExpenses.filter(e => e.status === "flagged")
    : activeTab === 2 ? displayExpenses.filter(e => e.status === "incomplete")
    : displayExpenses.filter(e => e.status === "complete");

  const handleTap = (exp) => {
    if (exp.status === "incomplete") onGenerateReceipt(exp);
    else if (exp.status === "complete") onViewComplete(exp);
    else if (exp.status === "flagged") onViewFlagged(exp);
    else onSelectExpense(exp);
  };

  return (
    <div>
      {/* AI Summary Banner */}
      {(() => {
        const flaggedCount = displayExpenses.filter(e => e.status === "flagged").length;
        const incompleteCount = displayExpenses.filter(e => e.status === "incomplete").length;
        const hasIssues = flaggedCount > 0 || incompleteCount > 0;
        const allClear = !hasIssues;

        if (reportSubmitted) {
          return (
            <div style={{ margin: "12px 16px", padding: "14px 16px", background: COLORS.greenBg, borderRadius: 12, border: `1px solid #bbf7d0` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <CheckCircle />
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.green }}>Report Submitted</span>
              </div>
              <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
                <strong>Denver Client Visit</strong> submitted to <strong>Michael J. Scott</strong> for approval. You'll be notified when it's reviewed.
              </p>
              <div style={{ marginTop: 12, width: "100%", padding: "10px 0", background: "white", color: COLORS.accent, border: `1.5px solid ${COLORS.accent}`, borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                View Expense Reports
              </div>
            </div>
          );
        }

        return (
          <div style={{ margin: "12px 16px", padding: "14px 16px", background: allClear ? COLORS.greenBg : "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12, border: `1px solid ${allClear ? "#bbf7d0" : COLORS.accentLight}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              {allClear ? <CheckCircle /> : <AISparkle size={14} />}
              <span style={{ fontSize: 13, fontWeight: 700, color: allClear ? COLORS.green : COLORS.accent }}>
                {allClear ? "All Expenses Reconciled" : "AI Expense Assistant"}
              </span>
            </div>
            <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
              {allClear
                ? <>All expenses are complete. Your <strong>Denver trip report</strong> is ready to submit.</>
                : <>{flaggedCount > 0 && <><strong>{flaggedCount} policy flag{flaggedCount > 1 ? "s" : ""}</strong></>}{flaggedCount > 0 && incompleteCount > 0 && " and "}{incompleteCount > 0 && <><strong>{incompleteCount} missing receipt{incompleteCount > 1 ? "s" : ""}</strong></>} to resolve. I've grouped expenses into a <strong>Denver trip report</strong> ready to review.</>
              }
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={allClear ? onSubmitReport : onCreateReport} style={{ flex: 1, padding: "10px 0", background: allClear ? COLORS.green : COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {allClear ? "Submit Report" : "Review Report"}
              </button>
              {hasIssues && (
                <button onClick={onResolveIssues} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.accent, border: `1.5px solid ${COLORS.accent}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  Resolve Issues
                </button>
              )}
            </div>
          </div>
        );
      })()}

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `2px solid ${COLORS.gray200}`, margin: "0 16px" }}>
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", borderBottom: i === activeTab ? `2px solid ${COLORS.accent}` : "2px solid transparent", color: i === activeTab ? COLORS.accent : COLORS.gray500, fontSize: 12, fontWeight: i === activeTab ? 600 : 500, cursor: "pointer", marginBottom: -2 }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Expense Items */}
      <div style={{ padding: "8px 0" }}>
        {filtered.length === 0 && (
          <div style={{ padding: "40px 16px", textAlign: "center" }}>
            <span style={{ fontSize: 14, color: COLORS.gray400 }}>No expenses in this category</span>
          </div>
        )}
        {filtered.map((exp) => {
          const isNew = (updates.includes("new-expense") && exp.id === 99)
            || (updates.includes("uber-complete") && exp.merchant === "Uber")
            || (updates.includes("westin-resolved") && exp.merchant === "The Westin - Denver")
            || (updates.includes("nobu-resolved") && exp.merchant === "Client Dinner - Nobu");
          return (
            <div key={exp.id} style={{ background: isNew && showHighlight ? "#f0fce8" : "transparent", transition: "background 1s ease" }}>
              <ExpenseRow exp={exp} onClick={() => handleTap(exp)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// SCREEN 1b: Complete Expense Detail
// ==========================================
const CompleteExpenseDetail = ({ expense, onBack, onAddToReport }) => {
  const [showReportPicker, setShowReportPicker] = useState(false);
  const [addedToReport, setAddedToReport] = useState(false);

  const receiptData = {
    "American Airlines": { type: "Flight", details: [
      { label: "Confirmation", value: "AA-7482910" },
      { label: "Route", value: "NYC (LGA) → Denver (DEN)" },
      { label: "Date", value: "May 14, 2025" },
      { label: "Class", value: "Economy" },
      { label: "Passenger", value: "Mervet Hafez" },
      { label: "Card", value: "Visa ···1234" },
    ], subtotals: [{ label: "Base fare", value: "$1,312.00" }, { label: "Taxes & fees", value: "$188.00" }] },
    "Starbucks": { type: "Food & Beverage", details: [
      { label: "Location", value: "1600 California St, Denver" },
      { label: "Date", value: "Apr 16, 2025 · 8:14 AM" },
      { label: "Card", value: "Visa ···1234" },
    ], subtotals: [{ label: "Items (4)", value: "$58.30" }, { label: "Tax", value: "$4.23" }, { label: "Tip", value: "$2.50" }] },
  };

  const data = receiptData[expense.merchant] || receiptData["Starbucks"];

  return (
    <div>
      <NavHeader title="Expense Details" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: COLORS.greenBg, borderRadius: 10, marginBottom: 16 }}>
          <CheckCircle />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Complete — receipt attached</span>
        </div>

        {/* Receipt */}
        <div style={{ border: `1px solid ${COLORS.gray200}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", background: COLORS.gray50, borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray900 }}>Receipt</span>
            <span style={{ fontSize: 11, color: COLORS.gray400 }}>{data.type}</span>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 14, paddingBottom: 12, borderBottom: `1px dashed ${COLORS.gray300}` }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.gray900 }}>{expense.merchant}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.details.map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: COLORS.gray500 }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900, textAlign: "right", maxWidth: "60%" }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${COLORS.gray300}`, display: "flex", flexDirection: "column", gap: 6 }}>
              {data.subtotals.map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: COLORS.gray500 }}>{s.label}</span>
                  <span style={{ fontSize: 12, color: COLORS.gray900 }}>{s.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `2px solid ${COLORS.gray900}`, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>${expense.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Expense Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Merchant", value: expense.merchant },
            { label: "Amount", value: `$${expense.amount.toFixed(2)}` },
            { label: "Date", value: expense.date },
            { label: "Category", value: expense.category },
            { label: "Card", value: "···1234" },
          ].map((field) => (
            <div key={field.label}>
              <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, display: "block" }}>{field.label}</label>
              <div style={{ padding: "11px 14px", background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 14, color: COLORS.gray900, fontWeight: 500 }}>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {/* Policy */}
        <div style={{ marginTop: 16, padding: 14, background: COLORS.greenBg, borderRadius: 12, border: `1px solid #bbf7d0`, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Within policy</span>
        </div>

        {/* Report Picker */}
        {showReportPicker && !addedToReport && (
          <div style={{ marginTop: 16, padding: 16, background: COLORS.gray50, borderRadius: 12, border: `1px solid ${COLORS.gray200}` }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 10 }}>Add to report</span>

            {/* Existing report */}
            <button onClick={() => { setAddedToReport(true); setShowReportPicker(false); }} style={{ width: "100%", padding: "14px 16px", background: "white", borderRadius: 10, border: `1.5px solid ${COLORS.accent}`, cursor: "pointer", textAlign: "left", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray900 }}>Denver Client Visit</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>3 expenses · $2,482.09 · Draft</div>
              </div>
              <AISparkle size={14} />
            </button>

            {/* Create new */}
            <button style={{ width: "100%", padding: "14px 16px", background: "white", borderRadius: 10, border: `1.5px dashed ${COLORS.gray300}`, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1V13M1 7H13" stroke={COLORS.gray500} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray500 }}>Create new report</span>
            </button>
          </div>
        )}

        {/* Added confirmation */}
        {addedToReport && (
          <div style={{ marginTop: 16, padding: 14, background: COLORS.greenBg, borderRadius: 12, border: `1px solid #bbf7d0` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Added to Denver Client Visit</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>Report now has 4 expenses · ${ (2482.09 + expense.amount).toFixed(2) }</div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, paddingBottom: 20 }}>
          {addedToReport ? (
            <>
              <button onClick={onBack} style={{ width: 90, flexShrink: 0, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
              <button onClick={onAddToReport} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                View Report
              </button>
            </>
          ) : (
            <>
              <button onClick={onBack} style={{ flex: 1, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
              <button onClick={() => setShowReportPicker(true)} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Add to Report
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCREEN 1c: Incomplete Expense Detail
// ==========================================
const IncompleteExpenseDetail = ({ expense, onBack, onGenerate }) => (
  <div>
    <NavHeader title="Expense Details" onBack={onBack} />
    <div style={{ padding: 16 }}>
      {/* Missing Receipt Banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: COLORS.redBg, borderRadius: 10, marginBottom: 16, border: `1px solid #fecaca` }}>
        <ErrorIcon />
        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.red }}>{expense.issue || "Missing receipt"}</span>
      </div>

      {/* Expense Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Merchant", value: expense.merchant },
          { label: "Amount", value: `$${expense.amount.toFixed(2)}` },
          { label: "Date", value: expense.date },
          { label: "Category", value: expense.category },
          { label: "Card", value: "···1234" },
          { label: "Receipt", value: "Not attached" },
        ].map((field) => (
          <div key={field.label}>
            <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, display: "block" }}>{field.label}</label>
            <div style={{ padding: "11px 14px", background: field.label === "Receipt" ? COLORS.redBg : COLORS.gray50, borderRadius: 8, border: `1px solid ${field.label === "Receipt" ? "#fecaca" : COLORS.gray200}`, fontSize: 14, color: field.label === "Receipt" ? COLORS.red : COLORS.gray900, fontWeight: 500 }}>
              {field.value}
            </div>
          </div>
        ))}
      </div>

      {/* AI Suggestion */}
      <div style={{ padding: 16, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <AISparkle size={14} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>AI Suggestion</span>
        </div>
        <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
          I found a matching Capital One transaction for <strong>{expense.merchant}</strong> on <strong>{expense.date}</strong>. I can generate a receipt from your transaction data and attach it to this expense.
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, paddingBottom: 20 }}>
        <button onClick={onBack} style={{ width: 90, flexShrink: 0, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          Close
        </button>
        <button onClick={onGenerate} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <AISparkle size={12} color="white" /> Generate Receipt
        </button>
      </div>
    </div>
  </div>
);

// ==========================================
// SCREEN 1d: Flagged Expense Detail + Split
// ==========================================
const FlaggedExpenseDetail = ({ expense, onBack, onResolved }) => {
  const [showSplit, setShowSplit] = useState(false);
  const [splitDone, setSplitDone] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [justificationText, setJustificationText] = useState("");
  const [justificationSubmitted, setJustificationSubmitted] = useState(false);

  const isWestin = expense.merchant === "The Westin - Denver";

  const splitData = isWestin
    ? { original: "$900.00", policy: "$350/night", nights: 2, splits: [
        { label: "Night 1 — Within policy", amount: "$350.00", status: "ok" },
        { label: "Night 2 — Within policy", amount: "$350.00", status: "ok" },
        { label: "Incidentals (minibar, parking)", amount: "$200.00", status: "flag", note: "Requires justification" },
      ]}
    : { original: "$294.05", policy: "$75/person", attendees: 4, splits: [
        { label: "Attendee 1 — Mervet Hafez", amount: "$73.51", status: "ok" },
        { label: "Attendee 2 — Client (J. Park)", amount: "$73.51", status: "ok" },
        { label: "Attendee 3 — Client (S. Lee)", amount: "$73.51", status: "ok" },
        { label: "Attendee 4 — Client (R. Chen)", amount: "$73.52", status: "ok" },
      ]};

  if (splitDone) {
    return (
      <div>
        <NavHeader title="Expense Split" />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.greenBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "48px auto 20px" }}>
            <CheckCircle color={COLORS.green} size={44} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Expense Split</h2>
          <p style={{ fontSize: 14, color: COLORS.gray500, margin: 0, lineHeight: 1.5 }}>
            {expense.merchant} has been split into {splitData.splits.length} expenses{isWestin ? "" : " — all within $75/person policy"}.
          </p>
          <button onClick={() => onResolved ? onResolved() : onBack()} style={{ marginTop: 32, padding: "14px 48px", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Back to Expenses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavHeader title="Expense Details" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Flag Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: COLORS.orangeBg, borderRadius: 10, marginBottom: 16, border: `1px solid #ffd8a8` }}>
          <WarningIcon />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.orange }}>{expense.issue}</span>
        </div>

        {/* Expense Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Merchant", value: expense.merchant },
            { label: "Amount", value: `$${expense.amount.toFixed(2)}` },
            { label: "Date", value: expense.date },
            { label: "Category", value: expense.category },
            { label: "Card", value: "···1234" },
          ].map((field) => (
            <div key={field.label}>
              <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, display: "block" }}>{field.label}</label>
              <div style={{ padding: "11px 14px", background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 14, color: COLORS.gray900, fontWeight: 500 }}>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {!showSplit ? (
          <>
            {/* AI Suggestion */}
            <div style={{ padding: 16, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <AISparkle size={14} />
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>AI Suggestion</span>
              </div>
              <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
                {isWestin
                  ? "This hotel charge can be split into nightly rates + incidentals. Splitting into 2 nights at $350 each would bring each within the per-night policy."
                  : "This dinner for 4 attendees comes to $73.51/person — under the $75 limit. Splitting by attendee would make all line items compliant."
                }
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, paddingBottom: 20 }}>
              <button onClick={onBack} style={{ flex: 1, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
              <button onClick={() => setShowSplit(true)} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <AISparkle size={12} color="white" /> Split Expense
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Split Preview */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <AISparkle size={14} />
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>Proposed Split</span>
              </div>
            </div>
            <div style={{ borderRadius: 12, border: `1px solid ${COLORS.gray200}`, overflow: "hidden", marginBottom: 16 }}>
              {splitData.splits.map((split, i) => {
                const isFlagged = split.status === "flag";
                const isExpanded = expandedIdx === i;
                const isResolved = isFlagged && justificationSubmitted;

                return (
                  <div key={i} style={{ borderBottom: i < splitData.splits.length - 1 ? `1px solid ${COLORS.gray100}` : "none", background: isExpanded ? "#fafbff" : "white" }}>
                    <div
                      onClick={() => {
                        if (isFlagged && !justificationSubmitted) {
                          setExpandedIdx(isExpanded ? null : i);
                          if (!isExpanded && !justificationText) {
                            setJustificationText("Parking for client-site visits (2 days). Minibar charges during extended evening work session — working dinner prep for next-day presentation.");
                          }
                        }
                      }}
                      style={{ padding: "14px 16px", cursor: isFlagged && !isResolved ? "pointer" : "default" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray900 }}>{split.label}</div>
                          {isFlagged && !isResolved && !isExpanded && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                              <AISparkle size={10} />
                              <span style={{ fontSize: 11, color: COLORS.accent, fontWeight: 600 }}>Tap to add AI justification</span>
                            </div>
                          )}
                          {isResolved && (
                            <div style={{ fontSize: 12, color: COLORS.green, marginTop: 2, fontWeight: 500 }}>Justification submitted</div>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{split.amount}</span>
                          {isResolved ? <CheckCircle color={COLORS.green} /> : split.status === "ok" ? <CheckCircle color={COLORS.green} /> : <WarningIcon />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Justification Form */}
                    {isFlagged && isExpanded && !isResolved && (
                      <div style={{ padding: "0 16px 16px" }}>
                        <div style={{ padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 10, border: `1px solid ${COLORS.accentLight}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <AISparkle size={12} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>AI-Generated Justification</span>
                          </div>
                          <textarea
                            value={justificationText}
                            onChange={(e) => setJustificationText(e.target.value)}
                            style={{
                              width: "100%", minHeight: 72, padding: 10, fontSize: 13, lineHeight: 1.5,
                              color: COLORS.gray700, background: "white", border: `1px solid ${COLORS.gray200}`,
                              borderRadius: 8, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
                            }}
                          />
                          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                            <button onClick={() => setExpandedIdx(null)} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                              Cancel
                            </button>
                            <button
                              onClick={() => { setJustificationSubmitted(true); setExpandedIdx(null); }}
                              style={{ flex: 1, padding: "10px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                            >
                              <AISparkle size={10} color="white" /> Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Split Actions */}
            <div style={{ display: "flex", gap: 12, paddingBottom: 20 }}>
              <button onClick={() => setShowSplit(false)} style={{ flex: 1, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={() => setSplitDone(true)} disabled={isWestin && !justificationSubmitted} style={{ flex: 1, padding: "14px 0", background: (!isWestin || justificationSubmitted) ? COLORS.accent : COLORS.gray300, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: (!isWestin || justificationSubmitted) ? "pointer" : "default" }}>
                Confirm Split
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ==========================================
// SCREEN 2: Receipt Scan + AI Processing
// ==========================================
const ReceiptScan = ({ onComplete, onBack }) => {
  const [phase, setPhase] = useState("upload"); // upload, scanning, results, no-receipt, tx-search, tx-found, manual, manual-policy
  const [scanProgress, setScanProgress] = useState(0);
  const [fields, setFields] = useState({});
  const [showJustification, setShowJustification] = useState(false);
  const [justificationText, setJustificationText] = useState("");
  const [justificationDone, setJustificationDone] = useState(false);
  const [txProgress, setTxProgress] = useState(0);
  const [manualFields, setManualFields] = useState({ merchant: "", amount: "", date: "", category: "" });
  const [manualPolicyChecked, setManualPolicyChecked] = useState(false);

  const startScan = () => {
    setPhase("scanning");
    setScanProgress(0);

    const steps = [
      { progress: 15, label: "Reading receipt..." },
      { progress: 35, label: "Extracting merchant..." },
      { progress: 55, label: "Identifying amount..." },
      { progress: 75, label: "Detecting category..." },
      { progress: 90, label: "Checking policy..." },
      { progress: 100, label: "Complete" },
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setScanProgress(step.progress);
        if (step.progress === 100) {
          setTimeout(() => {
            setPhase("results");
            setFields({
              merchant: "The Capital Grille",
              amount: "187.50",
              date: "May 14, 2025",
              category: "Meals & Entertainment",
              card: "···1234",
              attendees: "3",
              perPerson: "$62.50",
              policyStatus: "warning",
              policyNote: "Under $75/person limit ($62.50). Requires business justification for 3+ attendees.",
            });
          }, 300);
        }
      }, 600 * (i + 1));
    });
  };

  const startTxSearch = () => {
    setPhase("tx-search");
    setTxProgress(0);
    const steps = [15, 35, 55, 80, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setTxProgress(p);
        if (p === 100) setTimeout(() => setPhase("tx-found"), 500);
      }, 700 * (i + 1));
    });
  };

  const startManualPolicyCheck = () => {
    setManualPolicyChecked(false);
    setPhase("manual-policy");
    setTimeout(() => setManualPolicyChecked(true), 1500);
  };

  if (phase === "upload") {
    return (
      <div>
        <NavHeader title="Add Expense" onBack={onBack} />
        <div style={{ padding: 24 }}>
          {/* No Receipt Button — top of page */}
          <button onClick={() => setPhase("no-receipt")} style={{ width: "100%", padding: "14px 0", background: "white", color: COLORS.accent, border: `1.5px solid ${COLORS.accent}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            Don't have a receipt?
          </button>

          <div style={{ border: `2px dashed ${COLORS.gray300}`, borderRadius: 16, padding: "48px 24px", textAlign: "center", background: COLORS.gray50 }}>
            <UploadIcon />
            <p style={{ fontSize: 16, fontWeight: 600, color: COLORS.gray900, marginTop: 16, marginBottom: 4 }}>Upload Receipt</p>
            <p style={{ fontSize: 13, color: COLORS.gray500, margin: 0 }}>JPEG, PNG, or PDF · Max 5MB</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 20, borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.gray200}` }}>
            {[
              { icon: <CameraIcon />, label: "Take Photo", sub: "Use camera to capture receipt" },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>, label: "Photo Library", sub: "Choose from saved photos" },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>, label: "Choose File", sub: "Browse documents" },
            ].map((opt, i) => (
              <button key={i} onClick={startScan} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "white", border: "none", borderBottom: i < 2 ? `1px solid ${COLORS.gray100}` : "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {opt.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.gray900 }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: "14px 16px", background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AISparkle size={12} />
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent }}>AI will auto-extract</span>
            </div>
            <p style={{ fontSize: 12, color: COLORS.gray500, margin: "6px 0 0", lineHeight: 1.4 }}>
              Merchant, amount, date, category, and tip — then check against your company's expense policy before you submit.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "no-receipt") {
    return (
      <div>
        <NavHeader title="Add Expense" onBack={() => setPhase("upload")} />
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 15, color: COLORS.gray700, margin: "0 0 20px", lineHeight: 1.5 }}>
            No worries — choose how you'd like to create this expense:
          </p>

          {/* Option 1: AI Transaction Search */}
          <button onClick={startTxSearch} style={{ width: "100%", padding: 18, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 14, border: `1.5px solid ${COLORS.accentLight}`, cursor: "pointer", textAlign: "left", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AISparkle size={20} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>Find from transactions</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 3, lineHeight: 1.4 }}>AI searches your Capital One card activity, pulls the details, and generates a receipt</div>
              </div>
            </div>
          </button>

          {/* Option 2: Manual Entry */}
          <button onClick={() => setPhase("manual")} style={{ width: "100%", padding: 18, background: COLORS.gray50, borderRadius: 14, border: `1.5px solid ${COLORS.gray200}`, cursor: "pointer", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.gray100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray500} strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>Enter manually</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 3, lineHeight: 1.4 }}>Fill out the expense details yourself — AI will still check policy compliance</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (phase === "tx-search") {
    return (
      <div>
        <NavHeader title="Add Expense" onBack={() => setPhase("no-receipt")} />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "40px auto 24px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Searching Transactions</h3>
          <p style={{ fontSize: 13, color: COLORS.gray500, margin: "0 0 24px", lineHeight: 1.5 }}>
            Looking through recent Capital One card activity...
          </p>
          <div style={{ height: 6, background: COLORS.gray200, borderRadius: 3, overflow: "hidden", margin: "0 32px" }}>
            <div style={{ height: "100%", width: `${txProgress}%`, background: `linear-gradient(90deg, ${COLORS.accent}, #6366f1)`, borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray700, marginTop: 16, display: "block" }}>
            {txProgress < 35 ? "Connecting to account..." : txProgress < 55 ? "Scanning recent charges..." : txProgress < 80 ? "Found 12 recent transactions..." : "Matching expenses..."}
          </span>
        </div>
      </div>
    );
  }

  if (phase === "tx-found") {
    const recentTx = [
      { merchant: "Lyft Ride", amount: "$34.50", date: "May 15, 2025", category: "Transport", selected: false },
      { merchant: "Delta Air Lines", amount: "$489.00", date: "May 15, 2025", category: "Travel", selected: false },
      { merchant: "Marriott Downtown", amount: "$275.00", date: "May 14, 2025", category: "Hotel", selected: false },
      { merchant: "Blue Bottle Coffee", amount: "$12.80", date: "May 14, 2025", category: "Food", selected: false },
    ];
    return (
      <div>
        <NavHeader title="Add Expense" onBack={() => setPhase("no-receipt")} />
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: COLORS.greenBg, borderRadius: 10, marginBottom: 16, border: `1px solid #bbf7d0` }}>
            <CheckCircle />
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Found recent transactions on card ···1234</span>
          </div>

          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 10 }}>Select a transaction</span>

          <div style={{ borderRadius: 12, border: `1px solid ${COLORS.gray200}`, overflow: "hidden" }}>
            {recentTx.map((tx, i) => (
              <button key={i} onClick={() => {
                setFields({
                  merchant: tx.merchant,
                  amount: tx.amount.replace("$", ""),
                  date: tx.date,
                  category: tx.category,
                  card: "···1234",
                  policyStatus: "ok",
                  policyNote: "Within policy limits.",
                });
                setPhase("results");
              }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "14px 16px", background: "white", border: "none", borderBottom: i < recentTx.length - 1 ? `1px solid ${COLORS.gray100}` : "none", cursor: "pointer", textAlign: "left" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray900 }}>{tx.merchant}</div>
                  <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{tx.category} · {tx.date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{tx.amount}</span>
                  <ChevronRight />
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AISparkle size={12} />
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent }}>Tap a transaction</span>
            </div>
            <p style={{ fontSize: 12, color: COLORS.gray500, margin: "4px 0 0", lineHeight: 1.4 }}>
              AI will generate a receipt and auto-fill your expense form with the transaction details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "manual") {
    return (
      <div>
        <NavHeader title="Add Expense" onBack={() => setPhase("no-receipt")} />
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { key: "merchant", label: "Merchant", placeholder: "e.g. Starbucks, Uber, Hilton..." },
              { key: "amount", label: "Amount", placeholder: "$0.00" },
              { key: "date", label: "Date of Spend", placeholder: "MM/DD/YYYY" },
              { key: "category", label: "Category", placeholder: "Select category..." },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5, display: "block" }}>{field.label}</label>
                <input
                  type="text"
                  value={manualFields[field.key]}
                  onChange={(e) => setManualFields(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{ width: "100%", padding: "12px 14px", background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 15, color: COLORS.gray900, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }}
                />
              </div>
            ))}
          </div>

          {/* AI Policy Check hint */}
          <div style={{ marginTop: 20, padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AISparkle size={12} />
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent }}>AI will check policy on save</span>
            </div>
            <p style={{ fontSize: 12, color: COLORS.gray500, margin: "4px 0 0", lineHeight: 1.4 }}>
              Once you fill out the details, AI will automatically check compliance against your company's expense policy.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24, paddingBottom: 20 }}>
            <button onClick={() => setPhase("no-receipt")} style={{ width: 90, flexShrink: 0, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Back
            </button>
            <button onClick={startManualPolicyCheck} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <AISparkle size={12} color="white" /> Check & Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "manual-policy") {
    return (
      <div>
        <NavHeader title="Add Expense" />
        <div style={{ padding: 16 }}>
          {/* Filled fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Merchant", value: manualFields.merchant || "Starbucks" },
              { label: "Amount", value: manualFields.amount || "$24.50" },
              { label: "Date", value: manualFields.date || "May 15, 2025" },
              { label: "Category", value: manualFields.category || "Food & Beverage" },
            ].map((field) => (
              <div key={field.label}>
                <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, display: "block" }}>{field.label}</label>
                <div style={{ padding: "11px 14px", background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 14, color: COLORS.gray900, fontWeight: 500 }}>
                  {field.value}
                </div>
              </div>
            ))}
          </div>

          {/* Policy check status */}
          {!manualPolicyChecked ? (
            <div style={{ padding: 20, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2.5px solid ${COLORS.accent}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray700 }}>Checking policy compliance...</span>
              </div>
            </div>
          ) : (
            <>
              <div style={{ padding: 14, background: COLORS.greenBg, borderRadius: 12, border: `1px solid #bbf7d0`, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Within Policy</div>
                    <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>Amount is under daily meal limit — no issues found.</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, paddingBottom: 20 }}>
                <button onClick={() => setPhase("manual")} style={{ width: 90, flexShrink: 0, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  Edit
                </button>
                <button onClick={onComplete} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  Save Expense
                </button>
              </div>
            </>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (phase === "scanning") {
    return (
      <div>
        <NavHeader title="Add Expense" onBack={onBack} />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 200, height: 260, margin: "32px auto", background: COLORS.gray100, borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: `${scanProgress}%`, background: "linear-gradient(180deg, rgba(0,120,212,0.08), rgba(0,120,212,0.03))", transition: "height 0.5s ease" }} />
            <div style={{ fontSize: 48, marginBottom: 8 }}>🧾</div>
            <span style={{ fontSize: 12, color: COLORS.gray500, position: "relative" }}>receipt_img.jpg</span>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2.5px solid ${COLORS.accent}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.gray900 }}>
                {scanProgress < 35 ? "Reading receipt..." : scanProgress < 55 ? "Extracting merchant..." : scanProgress < 75 ? "Identifying amount..." : scanProgress < 90 ? "Detecting category..." : "Checking policy..."}
              </span>
            </div>
            <div style={{ height: 6, background: COLORS.gray200, borderRadius: 3, overflow: "hidden", margin: "0 40px" }}>
              <div style={{ height: "100%", width: `${scanProgress}%`, background: `linear-gradient(90deg, ${COLORS.accent}, #6366f1)`, borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: 12, color: COLORS.gray500, marginTop: 8, display: "block" }}>{scanProgress}% complete</span>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  // Results phase
  return (
    <div>
      <NavHeader title="Add Expense" onBack={onBack} />
      <div style={{ padding: "16px" }}>
        {/* AI Extracted Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: COLORS.greenBg, borderRadius: 10, marginBottom: 16 }}>
          <CheckCircle />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>AI extracted 6 fields from your receipt</span>
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Merchant", value: fields.merchant },
            { label: "Amount", value: `$${fields.amount}` },
            { label: "Date of Spend", value: fields.date },
            { label: "Category", value: fields.category },
            { label: "Card", value: fields.card },
          ].map((field) => (
            <div key={field.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5 }}>{field.label}</label>
                <AIBadge label="AI filled" />
              </div>
              <div style={{ padding: "12px 14px", background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 15, color: COLORS.gray900, fontWeight: 500 }}>
                {field.value}
              </div>
            </div>
          ))}

          {/* Policy Check */}
          <div style={{ padding: 16, background: justificationDone ? COLORS.greenBg : COLORS.orangeBg, borderRadius: 12, border: `1px solid ${justificationDone ? "#bbf7d0" : "#ffd8a8"}`, transition: "all 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {justificationDone ? <CheckCircle /> : <WarningIcon />}
              <span style={{ fontSize: 13, fontWeight: 700, color: justificationDone ? COLORS.green : COLORS.orange }}>
                {justificationDone ? "Policy Resolved" : "Policy Check"}
              </span>
              <AIBadge label="Auto-checked" />
            </div>
            <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
              {justificationDone ? "Business justification added — expense is compliant." : fields.policyNote}
            </p>

            {!justificationDone && !showJustification && (
              <button onClick={() => { setShowJustification(true); setJustificationText("Client dinner with 3 attendees (J. Park, S. Lee, R. Chen) — prospective partnership discussion for Q3 initiative."); }} style={{ marginTop: 10, padding: "8px 16px", background: "white", border: `1.5px solid ${COLORS.orange}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: COLORS.orange, cursor: "pointer" }}>
                Add Business Justification
              </button>
            )}

            {showJustification && !justificationDone && (
              <div style={{ marginTop: 12 }}>
                <div style={{ padding: 12, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 10, border: `1px solid ${COLORS.accentLight}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <AISparkle size={10} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent }}>AI-Generated Justification</span>
                  </div>
                  <textarea
                    value={justificationText}
                    onChange={(e) => setJustificationText(e.target.value)}
                    style={{ width: "100%", minHeight: 60, padding: 10, fontSize: 13, lineHeight: 1.5, color: COLORS.gray700, background: "white", border: `1px solid ${COLORS.gray200}`, borderRadius: 8, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => setShowJustification(false)} style={{ flex: 1, padding: "8px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                    <button onClick={() => { setJustificationDone(true); setShowJustification(false); }} style={{ flex: 1, padding: "8px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      <AISparkle size={10} color="white" /> Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 24, paddingBottom: 20 }}>
          <button onClick={onBack} style={{ flex: 1, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onComplete} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCREEN 3: Generate Receipt from Transaction
// ==========================================
const GenerateReceiptExpense = ({ onBack, onConfirm }) => {
  const [phase, setPhase] = useState("finding"); // finding, review, confirmed
  const [findProgress, setFindProgress] = useState(0);

  useEffect(() => {
    if (phase !== "finding") return;
    const steps = [
      { progress: 20 },
      { progress: 45 },
      { progress: 70 },
      { progress: 90 },
      { progress: 100 },
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setFindProgress(step.progress);
        if (step.progress === 100) {
          setTimeout(() => setPhase("review"), 500);
        }
      }, 600 * (i + 1));
    });
  }, []);

  if (phase === "finding") {
    return (
      <div>
        <NavHeader title="Generate Receipt" onBack={onBack} />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "40px auto 24px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Searching Transactions</h3>
          <p style={{ fontSize: 13, color: COLORS.gray500, margin: "0 0 24px", lineHeight: 1.5 }}>
            Looking for Uber charge of $82.09 on card ···1234
          </p>

          <div style={{ height: 6, background: COLORS.gray200, borderRadius: 3, overflow: "hidden", margin: "0 32px" }}>
            <div style={{ height: "100%", width: `${findProgress}%`, background: `linear-gradient(90deg, ${COLORS.accent}, #6366f1)`, borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray700, marginTop: 16, display: "block" }}>
            {findProgress < 45 ? "Searching transactions..." : findProgress < 70 ? "Match found" : findProgress < 100 ? "Generating receipt..." : "Complete"}
          </span>

          {findProgress >= 45 && (
            <div style={{ marginTop: 24, padding: 16, background: COLORS.greenBg, borderRadius: 12, textAlign: "left", border: `1px solid #bbf7d0` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <CheckCircle />
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.green }}>Transaction Found</span>
              </div>
              <span style={{ fontSize: 13, color: COLORS.gray700 }}>Uber Technologies · $82.09</span>
              <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>Card ···1234 · May 14, 2025 · 6:32 AM</div>
            </div>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (phase === "confirmed") {
    return (
      <div>
        <NavHeader title="Expense Created" />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.greenBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "48px auto 20px" }}>
            <CheckCircle color={COLORS.green} size={44} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Expense Saved</h2>
          <p style={{ fontSize: 14, color: COLORS.gray500, margin: "0 0 4px", lineHeight: 1.5 }}>
            Uber · $82.09 · May 14, 2025
          </p>
          <p style={{ fontSize: 13, color: COLORS.gray400, margin: 0 }}>
            Receipt generated and attached automatically.
          </p>
          <button onClick={onConfirm} style={{ marginTop: 32, padding: "14px 48px", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Back to Expenses
          </button>
        </div>
      </div>
    );
  }

  // Review phase — form pre-filled with generated receipt
  return (
    <div>
      <NavHeader title="Review Expense" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* AI Generated Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: COLORS.greenBg, borderRadius: 10, marginBottom: 16 }}>
          <CheckCircle />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Receipt generated from transaction data</span>
        </div>

        {/* Generated Receipt Card */}
        <div style={{ border: `1px solid ${COLORS.gray200}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", background: COLORS.gray50, borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AISparkle size={12} />
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>AI-Generated Receipt</span>
            </div>
            <span style={{ fontSize: 11, color: COLORS.gray400 }}>From card ···1234</span>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 14, paddingBottom: 12, borderBottom: `1px dashed ${COLORS.gray300}` }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.gray900 }}>Uber Technologies</div>
              <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>May 14, 2025 · 6:32 AM</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Service", value: "UberX" },
                { label: "Route", value: "Hotel → Denver Intl Airport" },
                { label: "Distance", value: "23.4 mi · 34 min" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: COLORS.gray500 }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${COLORS.gray300}`, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>$82.09</span>
            </div>
          </div>
        </div>

        {/* Pre-filled Expense Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Merchant", value: "Uber Technologies" },
            { label: "Amount", value: "$82.09" },
            { label: "Date of Spend", value: "May 14, 2025" },
            { label: "Category", value: "Ground Transportation" },
            { label: "Card", value: "···1234" },
            { label: "Purpose", value: "Airport transfer — Denver client visit" },
          ].map((field) => (
            <div key={field.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5 }}>{field.label}</label>
                <AIBadge label="AI filled" />
              </div>
              <div style={{ padding: "11px 14px", background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 14, color: COLORS.gray900, fontWeight: 500 }}>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {/* Policy Check */}
        <div style={{ marginTop: 16, padding: 14, background: COLORS.greenBg, borderRadius: 12, border: `1px solid #bbf7d0`, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>Policy compliant</div>
            <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 1 }}>$82.09 ground transport — within limits</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, paddingBottom: 20 }}>
          <button onClick={onBack} style={{ flex: 1, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={() => setPhase("confirmed")} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Confirm Expense
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCREEN 4: Resolve Issues
// ==========================================
const ResolveIssues = ({ onBack, onAllResolved }) => {
  const [phase, setPhase] = useState("list"); // list, finding, generating
  const [findProgress, setFindProgress] = useState(0);
  const [resolved, setResolved] = useState({}); // { uber: false, westin: false, nobu: false }
  const [expandedIssue, setExpandedIssue] = useState(null); // "westin" | "nobu" | null
  const [westinStep, setWestinStep] = useState("suggest"); // suggest, split, justify
  const [nobuStep, setNobuStep] = useState("suggest"); // suggest, split
  const [justText, setJustText] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);

  const resolvedCount = Object.values(resolved).filter(Boolean).length;
  const totalIssues = 3;
  const remaining = totalIssues - resolvedCount;

  const startReceiptGeneration = () => {
    setPhase("finding");
    setFindProgress(0);
    setExpandedIssue(null);

    const steps = [
      { progress: 20 }, { progress: 45 }, { progress: 65 }, { progress: 85 }, { progress: 100 },
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setFindProgress(step.progress);
        if (step.progress === 100) {
          setTimeout(() => setPhase("generating"), 400);
          setTimeout(() => {
            setResolved(prev => ({ ...prev, uber: true }));
            setPhase("list");
          }, 1800);
        }
      }, 700 * (i + 1));
    });
  };

  if (phase === "finding") {
    return (
      <div>
        <NavHeader title="Resolve Issues" onBack={() => setPhase("list")} />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "40px auto 24px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Searching Your Transactions</h3>
          <p style={{ fontSize: 13, color: COLORS.gray500, margin: "0 0 24px", lineHeight: 1.5 }}>
            Looking for Uber charge on card ···1234 around May 14, 2025
          </p>
          <div style={{ height: 6, background: COLORS.gray200, borderRadius: 3, overflow: "hidden", margin: "0 32px" }}>
            <div style={{ height: "100%", width: `${findProgress}%`, background: `linear-gradient(90deg, ${COLORS.accent}, #6366f1)`, borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray700, marginTop: 16, display: "block" }}>
            {findProgress < 45 ? "Searching transactions..." : findProgress < 65 ? "Match found: Uber, $82.09" : findProgress < 85 ? "Pulling transaction details..." : "Generating receipt..."}
          </span>
          {findProgress >= 45 && (
            <div style={{ marginTop: 24, padding: 16, background: COLORS.greenBg, borderRadius: 12, textAlign: "left", border: `1px solid #bbf7d0` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <CheckCircle />
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.green }}>Transaction Found</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 13, color: COLORS.gray700 }}>Uber Technologies · $82.09</span>
                <span style={{ fontSize: 12, color: COLORS.gray500 }}>Card ···1234 · May 14, 2025 · 6:32 AM</span>
              </div>
            </div>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (phase === "generating") {
    return (
      <div>
        <NavHeader title="Resolve Issues" onBack={() => setPhase("list")} />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #e6f2ff, #f0e6ff)", display: "flex", alignItems: "center", justifyContent: "center", margin: "40px auto 24px" }}>
            <div style={{ animation: "spin 1.5s linear infinite" }}><AISparkle size={32} /></div>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Generating Receipt</h3>
          <p style={{ fontSize: 13, color: COLORS.gray500, margin: 0, lineHeight: 1.5 }}>Building a receipt from your transaction data...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  // Main list view — shows all issues with resolved states and expandable resolution flows
  const issueCards = [
    {
      key: "uber", type: "missing", merchant: "Uber", amount: "$82.09", date: "May 14, 2025",
      desc: "Missing receipt", resolvedLabel: "Receipt generated from transaction data",
    },
    {
      key: "westin", type: "flagged", merchant: "The Westin - Denver", amount: "$900.00", date: "May 13, 2025",
      desc: "Exceeds $350/night hotel policy", resolvedLabel: "Split into 2 nights + incidentals justified",
    },
    {
      key: "nobu", type: "flagged", merchant: "Client Dinner - Nobu", amount: "$294.05", date: "Apr 16, 2025",
      desc: "Exceeds $75/person meal limit", resolvedLabel: "Split by 4 attendees — all within policy",
    },
  ];

  return (
    <div>
      <NavHeader title="Resolve Issues" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Progress Header */}
        <div style={{ padding: "12px 16px", background: remaining === 0 ? COLORS.greenBg : "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12, marginBottom: 16, border: remaining === 0 ? `1px solid #bbf7d0` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {remaining === 0 ? <CheckCircle /> : <AISparkle size={12} />}
            <span style={{ fontSize: 12, fontWeight: 700, color: remaining === 0 ? COLORS.green : COLORS.accent }}>
              {remaining === 0 ? "All issues resolved — ready to submit!" : `${remaining} issue${remaining !== 1 ? "s" : ""} to resolve before submitting`}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: 8, height: 4, background: remaining === 0 ? "#bbf7d0" : COLORS.gray200, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(resolvedCount / totalIssues) * 100}%`, background: remaining === 0 ? COLORS.green : COLORS.accent, borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontSize: 11, color: COLORS.gray500, marginTop: 4, display: "block" }}>{resolvedCount}/{totalIssues} resolved</span>
        </div>

        {/* Issue Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {issueCards.map((issue) => {
            const isResolved = resolved[issue.key];
            const isExpanded = expandedIssue === issue.key;

            return (
              <div key={issue.key} style={{ borderRadius: 12, border: `1px solid ${isResolved ? "#bbf7d0" : issue.type === "missing" ? "#fecaca" : "#ffd8a8"}`, background: isResolved ? COLORS.greenBg : issue.type === "missing" ? COLORS.redBg : COLORS.orangeBg, overflow: "hidden" }}>
                {/* Issue Header */}
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        {isResolved ? <CheckCircle /> : issue.type === "missing" ? <ErrorIcon /> : <WarningIcon />}
                        <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{issue.merchant}</span>
                      </div>
                      {isResolved ? (
                        <span style={{ fontSize: 12, color: COLORS.green, fontWeight: 500 }}>{issue.resolvedLabel}</span>
                      ) : (
                        <>
                          <p style={{ fontSize: 13, color: COLORS.gray700, margin: "0 0 2px" }}>{issue.desc}</p>
                          <span style={{ fontSize: 12, color: COLORS.gray500 }}>{issue.amount} · {issue.date}</span>
                        </>
                      )}
                    </div>
                    {isResolved && (
                      <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.green, background: "white", padding: "2px 10px", borderRadius: 10 }}>Resolved</span>
                    )}
                  </div>

                  {/* Action Button — only when not resolved and not expanded */}
                  {!isResolved && !isExpanded && (
                    <button
                      onClick={() => {
                        if (issue.key === "uber") {
                          startReceiptGeneration();
                        } else {
                          setExpandedIssue(issue.key);
                        }
                      }}
                      style={{ marginTop: 12, width: "100%", padding: "11px 0", background: issue.key === "uber" ? COLORS.accent : "white", color: issue.key === "uber" ? "white" : COLORS.accent, border: issue.key === "uber" ? "none" : `1.5px solid ${COLORS.accent}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                    >
                      <AISparkle size={12} color={issue.key === "uber" ? "white" : COLORS.accent} />
                      {issue.key === "uber" ? "Find & Generate Receipt" : "AI Split & Resolve"}
                    </button>
                  )}
                </div>

                {/* ====== WESTIN EXPANDED FLOW ====== */}
                {isExpanded && issue.key === "westin" && !isResolved && (
                  <div style={{ padding: "0 16px 16px", borderTop: `1px solid #ffd8a8` }}>
                    {westinStep === "suggest" && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 10, border: `1px solid ${COLORS.accentLight}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <AISparkle size={12} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>AI Suggestion</span>
                          </div>
                          <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
                            Split this $900 hotel charge into 2 nights at $350/night (within policy) + $200 incidentals. The incidentals will need a business justification.
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button onClick={() => setExpandedIssue(null)} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                          <button onClick={() => setWestinStep("split")} style={{ flex: 1, padding: "10px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                            <AISparkle size={10} color="white" /> Split Expense
                          </button>
                        </div>
                      </div>
                    )}
                    {westinStep === "split" && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                          <AISparkle size={12} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>Proposed Split</span>
                        </div>
                        <div style={{ borderRadius: 10, border: `1px solid ${COLORS.gray200}`, overflow: "hidden", background: "white" }}>
                          {[
                            { label: "Night 1 — Within policy", amount: "$350.00", ok: true },
                            { label: "Night 2 — Within policy", amount: "$350.00", ok: true },
                            { label: "Incidentals (minibar, parking)", amount: "$200.00", ok: false },
                          ].map((s, i) => (
                            <div key={i} style={{ padding: "12px 14px", borderBottom: i < 2 ? `1px solid ${COLORS.gray100}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.gray900 }}>{s.label}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray900 }}>{s.amount}</span>
                                {s.ok ? <CheckCircle /> : <WarningIcon />}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button onClick={() => setWestinStep("suggest")} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back</button>
                          <button onClick={() => { setWestinStep("justify"); setJustText("Parking for client-site visits (2 days). Minibar charges during extended evening work session — working dinner prep for next-day presentation."); }} style={{ flex: 1, padding: "10px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                            Add Justification
                          </button>
                        </div>
                      </div>
                    )}
                    {westinStep === "justify" && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 10, border: `1px solid ${COLORS.accentLight}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <AISparkle size={12} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>AI-Generated Justification</span>
                          </div>
                          <textarea value={justText} onChange={(e) => setJustText(e.target.value)} style={{ width: "100%", minHeight: 64, padding: 10, fontSize: 13, lineHeight: 1.5, color: COLORS.gray700, background: "white", border: `1px solid ${COLORS.gray200}`, borderRadius: 8, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button onClick={() => setWestinStep("split")} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back</button>
                          <button onClick={() => { setResolved(prev => ({ ...prev, westin: true })); setExpandedIssue(null); setWestinStep("suggest"); }} style={{ flex: 1, padding: "10px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                            <AISparkle size={10} color="white" /> Resolve
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ====== NOBU EXPANDED FLOW ====== */}
                {isExpanded && issue.key === "nobu" && !isResolved && (
                  <div style={{ padding: "0 16px 16px", borderTop: `1px solid #ffd8a8` }}>
                    {nobuStep === "suggest" && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 10, border: `1px solid ${COLORS.accentLight}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <AISparkle size={12} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>AI Suggestion</span>
                          </div>
                          <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5 }}>
                            This dinner for 4 attendees totals $294.05 — that's $73.51/person, which is under the $75/person policy. Splitting by attendee makes every line item compliant.
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button onClick={() => setExpandedIssue(null)} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                          <button onClick={() => setNobuStep("split")} style={{ flex: 1, padding: "10px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                            <AISparkle size={10} color="white" /> Split Attendees
                          </button>
                        </div>
                      </div>
                    )}
                    {nobuStep === "split" && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                          <AISparkle size={12} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>Split by Attendee</span>
                        </div>
                        <div style={{ borderRadius: 10, border: `1px solid ${COLORS.gray200}`, overflow: "hidden", background: "white" }}>
                          {[
                            { label: "Mervet Hafez", amount: "$73.51" },
                            { label: "Client — J. Park", amount: "$73.51" },
                            { label: "Client — S. Lee", amount: "$73.51" },
                            { label: "Client — R. Chen", amount: "$73.52" },
                          ].map((s, i) => (
                            <div key={i} style={{ padding: "12px 14px", borderBottom: i < 3 ? `1px solid ${COLORS.gray100}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.gray900 }}>{s.label}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray900 }}>{s.amount}</span>
                                <CheckCircle />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ padding: "8px 10px", background: COLORS.greenBg, borderRadius: 8, marginTop: 8, border: `1px solid #bbf7d0` }}>
                          <span style={{ fontSize: 12, color: COLORS.green, fontWeight: 600 }}>All splits under $75/person policy</span>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button onClick={() => setNobuStep("suggest")} style={{ flex: 1, padding: "10px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back</button>
                          <button onClick={() => { setResolved(prev => ({ ...prev, nobu: true })); setExpandedIssue(null); setNobuStep("suggest"); }} style={{ flex: 1, padding: "10px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                            Confirm Split
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, paddingBottom: 20 }}>
          {remaining === 0 ? (
            <button onClick={() => { if (onAllResolved) onAllResolved(); }} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <CheckCircle color="white" size={18} /> Done — View Report
            </button>
          ) : (
            <button onClick={onBack} style={{ flex: 1, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Back to Expenses
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCREEN 4: AI Auto-Generated Trip Report
// ==========================================
const TripReport = ({ onBack, onSubmit, onResolveIssues, issuesResolved, addedExpense }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [approverNote, setApproverNote] = useState("");
  const [showNoteField, setShowNoteField] = useState(false);

  const hasIssues = !issuesResolved;

  let tripExpenses = hasIssues ? [
    { merchant: "American Airlines", category: "Airfare", amount: 1500.00, status: "ok" },
    { merchant: "The Westin - Denver", category: "Hotel (2 nights)", amount: 900.00, status: "flagged", flag: "Exceeds $350/night limit" },
    { merchant: "Uber to Airport", category: "Ground Transport", amount: 82.09, status: "missing", flag: "Missing receipt" },
  ] : [
    { merchant: "American Airlines", category: "Airfare", amount: 1500.00, status: "ok" },
    { merchant: "The Westin - Denver", category: "Hotel (2 nights)", amount: 900.00, status: "ok" },
    { merchant: "Uber to Airport", category: "Ground Transport", amount: 82.09, status: "ok" },
  ];

  if (addedExpense) {
    tripExpenses = [...tripExpenses, { merchant: addedExpense.merchant, category: addedExpense.category, amount: addedExpense.amount, status: "ok", isNew: true }];
  }

  const total = tripExpenses.reduce((sum, e) => sum + e.amount, 0);

  if (showConfirm) {
    return (
      <div>
        <NavHeader title="Report Submitted" />
        <div style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.greenBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "48px auto 20px" }}>
            <CheckCircle color={COLORS.green} size={44} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.gray900, margin: "0 0 8px" }}>Report Submitted</h2>
          <p style={{ fontSize: 14, color: COLORS.gray500, margin: 0, lineHeight: 1.5 }}>
            Submitted for approval to <strong>Michael J. Scott</strong>. You'll be notified when it's reviewed.
          </p>

          {/* Report receipt */}
          <div style={{ marginTop: 24, padding: 16, background: COLORS.gray50, borderRadius: 12, border: `1px solid ${COLORS.gray200}`, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>Denver Client Visit</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.green, background: COLORS.greenBg, padding: "2px 10px", borderRadius: 10 }}>Submitted</span>
            </div>
            {[
              { label: "Report number", value: "ER05142025" },
              { label: "Submitted on", value: "May 14, 2025" },
              { label: "Approver", value: "Michael J. Scott" },
              { label: "Total", value: "$2,482.09" },
              { label: "Expenses", value: "3" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ fontSize: 12, color: COLORS.gray500 }}>{row.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray700 }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 14, background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginBottom: 8 }}>
              <AISparkle size={14} />
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>AI Summary</span>
            </div>
            <p style={{ fontSize: 13, color: COLORS.gray700, margin: 0, lineHeight: 1.5, textAlign: "left" }}>
              1 policy flag (hotel rate) submitted with justification · Uber receipt still needed — you'll be reminded in 24hrs.
            </p>
          </div>
          <button onClick={onSubmit} style={{ marginTop: 32, padding: "14px 48px", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavHeader title="Trip Report" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* AI Generated Header */}
        <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #f0f7ff, #f5f0ff)", borderRadius: 14, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <AISparkle size={14} />
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>AI-Generated Report</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.gray900, margin: "0 0 4px" }}>Denver Client Visit</h2>
          <p style={{ fontSize: 13, color: COLORS.gray500, margin: 0 }}>May 13–14, 2025 · {tripExpenses.length} expenses · ${total.toFixed(2)}</p>
          <p style={{ fontSize: 12, color: COLORS.gray400, margin: "8px 0 0", lineHeight: 1.4 }}>
            I grouped these based on date proximity, shared Denver location, and travel category patterns.
          </p>
        </div>

        {/* Report Metadata — mirrors C1 expense report */}
        <div style={{ padding: "14px 16px", background: COLORS.gray50, borderRadius: 12, border: `1px solid ${COLORS.gray200}`, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>Denver Client Visit</div>
              <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{tripExpenses.length} expenses</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>${total.toFixed(2)}</div>
              <span style={{ display: "inline-block", marginTop: 4, fontSize: 11, fontWeight: 600, color: COLORS.accent, background: COLORS.accentLight, padding: "2px 10px", borderRadius: 10 }}>Draft</span>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.gray200}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Report number", value: "ER05142025" },
              { label: "Created on", value: "May 14, 2025" },
              { label: "Approver", value: "Michael J. Scott" },
              { label: "Cost center", value: "Product Design — Expense Mgmt" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: COLORS.gray500 }}>{row.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray700 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses in Report */}
        <div style={{ borderRadius: 12, border: `1px solid ${COLORS.gray200}`, overflow: "hidden" }}>
          {tripExpenses.map((exp, i) => (
            <div key={i} style={{ padding: "14px 16px", borderBottom: i < tripExpenses.length - 1 ? `1px solid ${COLORS.gray100}` : "none", background: exp.isNew ? "#f0fce8" : "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.gray900 }}>{exp.merchant}{exp.isNew ? " ✱" : ""}</div>
                  <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{exp.category}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.gray900 }}>${exp.amount.toFixed(2)}</div>
                  <div style={{ marginTop: 4 }}>
                    {exp.status === "ok" && <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.green, background: COLORS.greenBg, padding: "2px 8px", borderRadius: 10 }}>✓ Reconciled</span>}
                    {exp.status === "flagged" && <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.orange, background: COLORS.orangeBg, padding: "2px 8px", borderRadius: 10 }}>⚠ {exp.flag}</span>}
                    {exp.status === "missing" && <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.red, background: COLORS.redBg, padding: "2px 8px", borderRadius: 10 }}>✕ {exp.flag}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Expenses */}
        <button style={{ marginTop: 12, width: "100%", padding: "12px 0", background: "none", border: `1.5px dashed ${COLORS.accent}`, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.accent }}>Add expenses</span>
        </button>

        {/* Note to Approver */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray500, textTransform: "uppercase", letterSpacing: 0.5 }}>Note to Approver</span>
            {!showNoteField && (
              <button onClick={() => setShowNoteField(true)} style={{ background: "none", border: "none", color: COLORS.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>
                + Add note
              </button>
            )}
          </div>
          {showNoteField ? (
            <textarea
              value={approverNote}
              onChange={(e) => setApproverNote(e.target.value)}
              placeholder="Add a note for your approver (e.g., business justification, context for flagged items)..."
              style={{
                width: "100%", minHeight: 72, padding: 12, fontSize: 13, lineHeight: 1.5,
                color: COLORS.gray700, background: COLORS.gray50, border: `1px solid ${COLORS.gray200}`,
                borderRadius: 10, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          ) : (
            <div style={{ padding: "14px 16px", background: COLORS.gray50, borderRadius: 10, border: `1px solid ${COLORS.gray200}` }}>
              <span style={{ fontSize: 13, color: COLORS.gray400 }}>No note added</span>
            </div>
          )}
        </div>

        {/* Policy Summary */}
        <div style={{ marginTop: 16, padding: 16, background: hasIssues ? COLORS.gray50 : COLORS.greenBg, borderRadius: 12, border: `1px solid ${hasIssues ? COLORS.gray200 : "#bbf7d0"}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            {hasIssues ? <AISparkle size={12} /> : <CheckCircle />}
            <span style={{ fontSize: 12, fontWeight: 700, color: hasIssues ? COLORS.gray700 : COLORS.green }}>
              {hasIssues ? "Pre-Submission Policy Review" : "All Policy Checks Passed"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle color={COLORS.green} />
              <span style={{ fontSize: 13, color: COLORS.gray700 }}>Airfare within policy</span>
            </div>
            {hasIssues ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <WarningIcon />
                  <span style={{ fontSize: 13, color: COLORS.gray700 }}>Hotel $100/night over limit — justification required</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ErrorIcon />
                  <span style={{ fontSize: 13, color: COLORS.gray700 }}>Uber receipt missing — must attach before submitting</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle color={COLORS.green} />
                  <span style={{ fontSize: 13, color: COLORS.gray700 }}>Hotel split & justified</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle color={COLORS.green} />
                  <span style={{ fontSize: 13, color: COLORS.gray700 }}>Uber receipt generated & attached</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Totals */}
        <div style={{ marginTop: 16, padding: "14px 16px", background: COLORS.navy, borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Report Total</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "white" }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, paddingBottom: 20 }}>
          {hasIssues ? (
            <>
              <button onClick={onBack} style={{ width: 90, flexShrink: 0, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
              <button onClick={onResolveIssues} style={{ flex: 1, padding: "14px 0", background: COLORS.accent, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <AISparkle size={12} color="white" /> Resolve Issues
              </button>
            </>
          ) : (
            <>
              <button onClick={onBack} style={{ width: 90, flexShrink: 0, padding: "14px 0", background: "white", color: COLORS.gray500, border: `1.5px solid ${COLORS.gray300}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
              <button onClick={() => setShowConfirm(true)} style={{ flex: 1, padding: "14px 0", background: COLORS.green, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Submit Report →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
export default function App() {
  const [screen, setScreen] = useState("list"); // list, scan, generate, report, resolve, complete-detail, flagged-detail, incomplete-detail
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [issuesResolved, setIssuesResolved] = useState(false);
  const [tempUpdate, setTempUpdate] = useState(null);
  const [addedToReport, setAddedToReport] = useState(null);
  const [showHighlight, setShowHighlight] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current) {
      phoneRef.current.scrollTop = 0;
    }
  }, [screen]);

  const applyTempUpdate = (type) => {
    setShowHighlight(true);
    setTimeout(() => setShowHighlight(false), 2000);
    setTempUpdate((prev) => {
      if (!prev) return type;
      const existing = prev.split(",");
      if (existing.includes(type)) return prev;
      return prev + "," + type;
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #0f172a, #1e293b)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <AISparkle size={20} color="#818cf8" />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0 }}>AI-Enhanced Expense Management</h1>
        </div>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Concept by Mervet Hafez · Product Design Exploration</p>
      </div>

      <style>{`
        .phone-scroll::-webkit-scrollbar { width: 3px; }
        .phone-scroll::-webkit-scrollbar-track { background: transparent; }
        .phone-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 3px; }
        .phone-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }
        .phone-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.15) transparent; }
      `}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, background: "#111", borderRadius: 44, padding: "12px 12px", boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)" }}>
        <div ref={phoneRef} className="phone-scroll" style={{ background: "white", borderRadius: 34, overflow: "hidden", height: 720, overflowY: "auto", position: "relative" }}>
          <StatusBar />

          {screen === "list" && (
            <div>
              <div style={{ padding: "8px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.gray900, margin: 0 }}>Expenses</h1>
                <button onClick={() => setScreen("scan")} style={{ height: 36, borderRadius: 18, background: COLORS.accent, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 14px 0 11px" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Add expense</span>
                </button>
              </div>
              <ExpenseList
                onSelectExpense={() => setScreen("scan")}
                onCreateReport={() => setScreen("report")}
                onSubmitReport={() => { setIssuesResolved(true); setScreen("report"); }}
                onResolveIssues={() => setScreen("resolve")}
                onGenerateReceipt={(exp) => { setSelectedExpense(exp); setScreen("incomplete-detail"); }}
                onViewComplete={(exp) => { setSelectedExpense(exp); setScreen("complete-detail"); }}
                onViewFlagged={(exp) => { setSelectedExpense(exp); setScreen("flagged-detail"); }}
                tempUpdate={tempUpdate}
                showHighlight={showHighlight}
                reportSubmitted={reportSubmitted}
              />
            </div>
          )}

          {screen === "generate" && (
            <GenerateReceiptExpense
              onBack={() => setScreen("list")}
              onConfirm={() => { applyTempUpdate("uber-complete"); setScreen("list"); }}
            />
          )}

          {screen === "scan" && (
            <ReceiptScan
              onComplete={() => { applyTempUpdate("new-expense"); setScreen("list"); }}
              onBack={() => setScreen("list")}
            />
          )}

          {screen === "resolve" && (
            <ResolveIssues
              onBack={() => setScreen("list")}
              onAllResolved={() => { setIssuesResolved(true); applyTempUpdate("uber-complete"); applyTempUpdate("westin-resolved"); applyTempUpdate("nobu-resolved"); setScreen("report"); }}
            />
          )}

          {screen === "report" && (
            <TripReport
              onBack={() => setScreen("list")}
              onSubmit={() => { setReportSubmitted(true); applyTempUpdate("uber-complete"); applyTempUpdate("westin-resolved"); applyTempUpdate("nobu-resolved"); setScreen("list"); }}
              onResolveIssues={() => setScreen("resolve")}
              issuesResolved={issuesResolved}
              addedExpense={addedToReport}
            />
          )}

          {screen === "complete-detail" && selectedExpense && (
            <CompleteExpenseDetail
              expense={selectedExpense}
              onBack={() => { setSelectedExpense(null); setScreen("list"); }}
              onAddToReport={() => { setAddedToReport(selectedExpense); setSelectedExpense(null); setScreen("report"); }}
            />
          )}

          {screen === "flagged-detail" && selectedExpense && (
            <FlaggedExpenseDetail
              expense={selectedExpense}
              onBack={() => { setSelectedExpense(null); setScreen("list"); }}
              onResolved={() => { const m = selectedExpense.merchant; setSelectedExpense(null); applyTempUpdate(m.includes("Westin") ? "westin-resolved" : "nobu-resolved"); setScreen("list"); }}
            />
          )}

          {screen === "incomplete-detail" && selectedExpense && (
            <IncompleteExpenseDetail
              expense={selectedExpense}
              onBack={() => { setSelectedExpense(null); setScreen("list"); }}
              onGenerate={() => { setSelectedExpense(null); setScreen("generate"); }}
            />
          )}
        </div>
      </div>

      {/* Feature Labels */}
      <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { label: "Smart Receipt Scan", desc: "Auto-extract & fill" },
          { label: "Policy Detection", desc: "Pre-submit compliance" },
          { label: "Auto Trip Reports", desc: "AI-grouped expenses" },
          { label: "Receipt Generation", desc: "From transaction data" },
        ].map((feat) => (
          <div key={feat.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(255,255,255,0.06)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)" }}>
            <AISparkle size={12} color="#818cf8" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "white" }}>{feat.label}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{feat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
