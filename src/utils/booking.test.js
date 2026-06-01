import { describe, it, expect } from 'vitest';
import {
  generateSlots,
  timeToMinutes,
  isSlotAvailable,
  getAvailableSlots,
  BUSINESS_START,
  LAST_BOOKING,
} from './booking';

// 固定一個「現在」時間，讓和日期相關的測試結果穩定可重現
// 設為 2026-06-01（今天）上午 9 點
const NOW = new Date('2026-06-01T09:00:00');
const TODAY = '2026-06-01';
const TOMORROW = '2026-06-02';
const YESTERDAY = '2026-05-31';

describe('generateSlots 產生營業時段', () => {
  it('從 10:00 開始、20:00 結束（含最後預約時間），每 30 分鐘一個', () => {
    const slots = generateSlots();
    expect(slots[0]).toBe('10:00');
    expect(slots[slots.length - 1]).toBe('20:00');
  });

  it('時段數量 =（最後預約時間 − 開始）× 2 + 1', () => {
    const slots = generateSlots();
    expect(slots).toHaveLength((LAST_BOOKING - BUSINESS_START) * 2 + 1);
  });
});

describe('timeToMinutes 時間轉分鐘', () => {
  it('正確把 HH:mm 換算成當天分鐘數', () => {
    expect(timeToMinutes('00:00')).toBe(0);
    expect(timeToMinutes('10:30')).toBe(630);
    expect(timeToMinutes('18:00')).toBe(1080);
  });
});

describe('isSlotAvailable 邊界：日期', () => {
  it('過去的日期不可預約', () => {
    expect(isSlotAvailable(YESTERDAY, '11:00', 60, [], NOW)).toBe(false);
  });

  it('當天不可預約（不接受當天預約）', () => {
    expect(isSlotAvailable(TODAY, '11:00', 60, [], NOW)).toBe(false);
  });

  it('明天可以預約', () => {
    expect(isSlotAvailable(TOMORROW, '11:00', 60, [], NOW)).toBe(true);
  });
});

describe('isSlotAvailable 邊界：最後預約時間', () => {
  it('20:00 是最後可預約的時段，仍可預約（服務可延伸至打烊後）', () => {
    expect(isSlotAvailable(TOMORROW, '20:00', 120, [], NOW)).toBe(true);
  });

  it('晚於 20:00 不可預約', () => {
    expect(isSlotAvailable(TOMORROW, '20:30', 30, [], NOW)).toBe(false);
  });
});

describe('isSlotAvailable 邊界：時段重疊', () => {
  const existing = [{ date: TOMORROW, time: '11:00', duration: 60 }]; // 佔用 11:00~12:00

  it('落在既有預約中間會重疊，不可預約', () => {
    expect(isSlotAvailable(TOMORROW, '11:30', 30, existing, NOW)).toBe(false);
  });

  it('背靠背（12:00 接續）不算重疊，可以預約', () => {
    expect(isSlotAvailable(TOMORROW, '12:00', 30, existing, NOW)).toBe(true);
  });

  it('開始前一個時段若會延伸進既有預約，不可預約', () => {
    // 10:30 + 60 分 = 11:30，會撞進 11:00~12:00
    expect(isSlotAvailable(TOMORROW, '10:30', 60, existing, NOW)).toBe(false);
  });

  it('不同天的既有預約不影響', () => {
    const otherDay = [{ date: '2026-06-03', time: '11:00', duration: 60 }];
    expect(isSlotAvailable(TOMORROW, '11:00', 60, otherDay, NOW)).toBe(true);
  });
});

describe('isSlotAvailable 邊界：120 分鐘服務佔多個時段', () => {
  const existing = [{ date: TOMORROW, time: '11:00', duration: 120 }]; // 佔用 11:00~13:00

  it('12:30 落在被佔用區間內，不可預約', () => {
    expect(isSlotAvailable(TOMORROW, '12:30', 30, existing, NOW)).toBe(false);
  });

  it('13:00 區間結束後可以預約', () => {
    expect(isSlotAvailable(TOMORROW, '13:00', 30, existing, NOW)).toBe(true);
  });
});

describe('getAvailableSlots 整天可用時段', () => {
  it('回傳每個時段與是否可預約', () => {
    const result = getAvailableSlots(TOMORROW, 60, [], NOW);
    expect(result).toHaveLength(generateSlots().length);
    // 11:00 該服務（60 分）沒有衝突，應可預約
    expect(result.find((s) => s.time === '11:00').available).toBe(true);
    // 20:00 是最後可預約時段，可預約
    expect(result.find((s) => s.time === '20:00').available).toBe(true);
  });

  it('有既有預約時，重疊的時段會標成不可預約', () => {
    const existing = [{ date: TOMORROW, time: '11:00', duration: 60 }];
    const result = getAvailableSlots(TOMORROW, 60, existing, NOW);
    expect(result.find((s) => s.time === '11:00').available).toBe(false);
    expect(result.find((s) => s.time === '10:30').available).toBe(false); // 會延伸進 11:00
    expect(result.find((s) => s.time === '12:00').available).toBe(true); // 背靠背可約
  });
});
