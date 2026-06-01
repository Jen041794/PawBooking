import { createContext, useContext, useState, useEffect } from 'react';
import { loadBookings, saveBookings } from '../utils/booking';

const BookingContext = createContext(null);

// draft = 預約過程中暫存的草稿；bookings = 已完成的預約清單（存進 localStorage）
const emptyDraft = { service: null, date: '', time: '', pet: null };

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => loadBookings());
  const [draft, setDraft] = useState(emptyDraft);

  // bookings 一變動就同步寫回 localStorage
  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  const updateDraft = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const resetDraft = () => setDraft(emptyDraft);

  // 把草稿正式變成一筆預約
  const confirmBooking = () => {
    const newBooking = {
      id: crypto.randomUUID(),
      serviceId: draft.service.id,
      serviceName: draft.service.name,
      duration: draft.service.duration,
      price: draft.service.price,
      date: draft.date,
      time: draft.time,
      pet: draft.pet,
      createdAt: new Date().toISOString(),
    };
    setBookings((list) => [...list, newBooking]);
    resetDraft();
    return newBooking;
  };

  // 取消預約：直接移除，該時段就會被釋放回去
  const cancelBooking = (id) => {
    setBookings((list) => list.filter((b) => b.id !== id));
  };

  return (
    <BookingContext.Provider
      value={{ bookings, draft, updateDraft, resetDraft, confirmBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking 必須在 BookingProvider 內使用');
  return ctx;
}
