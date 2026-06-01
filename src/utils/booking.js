import { format } from 'date-fns';

// 營業時間設定
export const BUSINESS_START = 10; // 營業 10:00 開始
export const LAST_BOOKING = 20; // 最後可預約的時段為 20:00（之後不接受預約）
export const SLOT_MIN = 30; // 每 30 分鐘一個時段

const STORAGE_KEY = 'pawbooking.bookings';

// ---- localStorage 存取 ----
export function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

// ---- 時段計算 ----

// 產生整天所有可預約時段，例如 ["10:00", "10:30", ..., "20:00"]（含最後預約時間 20:00）
export function generateSlots() {
  const slots = [];
  for (let m = BUSINESS_START * 60; m <= LAST_BOOKING * 60; m += SLOT_MIN) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
  }
  return slots;
}

export function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// 某天已被佔用的時間區間（單位：分鐘）
function bookedRanges(dateStr, bookings) {
  return bookings
    .filter((b) => b.date === dateStr)
    .map((b) => {
      const start = timeToMinutes(b.time);
      return { start, end: start + b.duration };
    });
}

// 判斷某時段能否容納時長 durationMin 的服務
// 涵蓋的 QA 邊界：超過營業時間、過去時間、與既有預約重疊
export function isSlotAvailable(dateStr, time, durationMin, bookings, now = new Date()) {
  const start = timeToMinutes(time);
  const end = start + durationMin;

  // 1. 不能晚於最後預約時間（20:00 仍可預約，之後不行）
  if (start > LAST_BOOKING * 60) return false;

  // 2. 不接受當天（含）以前的預約，最早只能預約明天
  const todayStr = format(now, 'yyyy-MM-dd');
  if (dateStr <= todayStr) return false;

  // 3. 不能和既有預約的時間區間重疊
  for (const r of bookedRanges(dateStr, bookings)) {
    if (start < r.end && end > r.start) return false;
  }

  return true;
}

// 回傳某天所有時段 + 是否可預約
export function getAvailableSlots(dateStr, durationMin, bookings, now = new Date()) {
  return generateSlots().map((time) => ({
    time,
    available: isSlotAvailable(dateStr, time, durationMin, bookings, now),
  }));
}
