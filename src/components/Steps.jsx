const STEP_LABELS = ['選服務', '選時段', '填資料', '確認'];

// current：目前在第幾步（1~4）
export default function Steps({ current }) {
  return (
    <div className="d-flex align-items-center justify-content-center mb-4">
      {STEP_LABELS.map((label, i) => {
        const stepNo = i + 1;
        const state = stepNo < current ? 'done' : stepNo === current ? 'active' : 'todo';
        return (
          <div className="d-flex align-items-center" key={label}>
            <div className={`step-bubble step-${state}`}>{state === 'done' ? '✓' : stepNo}</div>
            <span className={`step-label small ms-1 d-none d-sm-inline ${state === 'todo' ? 'text-muted' : ''}`}>
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <div className={`step-line ${stepNo < current ? 'step-line-done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
