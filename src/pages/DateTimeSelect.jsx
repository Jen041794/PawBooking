import { useState, useMemo } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { format, addDays } from 'date-fns';
import { useBooking } from '../context/BookingContext';
import { getAvailableSlots } from '../utils/booking';
import Steps from '../components/Steps';

export default function DateTimeSelect() {
  const navigate = useNavigate();
  const { draft, updateDraft, bookings } = useBooking();
  const [date, setDate] = useState(draft.date || '');

  // 不接受當天預約，最早從明天開始
  const minDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const maxDate = format(addDays(new Date(), 30), 'yyyy-MM-dd');

  const slots = useMemo(() => {
    if (!date || !draft.service) return [];
    return getAvailableSlots(date, draft.service.duration, bookings);
  }, [date, draft.service, bookings]);

  // 沒先選服務就進來，導回首頁
  if (!draft.service) return <Navigate to="/" replace />;

  const pick = (time) => {
    updateDraft({ date, time });
    navigate('/form');
  };

  const allFull = date && slots.length > 0 && slots.every((s) => !s.available);

  return (
    <div>
      <Steps current={2} />
      <h4 className="mb-3">選擇日期與時段</h4>
      <Alert variant="light" className="border">
        服務：<strong>{draft.service.name}</strong>（{draft.service.duration} 分鐘）
      </Alert>

      <Form.Group className="mb-4">
        <Form.Label>預約日期</Form.Label>
        <Form.Control
          type="date"
          value={date}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
        />
        <Form.Text className="text-muted">
          最早可預約明天、最晚 30 天內，最後預約時段為 20:00
        </Form.Text>
      </Form.Group>

      {date && (
        <>
          <div className="mb-2 text-muted small">
            點選可預約的時段（灰色為已額滿或已過時間）
          </div>
          <div className="d-flex flex-wrap gap-2">
            {slots.map(({ time, available }) => (
              <Button
                key={time}
                variant={available ? 'outline-primary' : 'outline-secondary'}
                disabled={!available}
                onClick={() => pick(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          {allFull && (
            <Alert variant="warning" className="mt-3">
              這天已經沒有可預約的時段了，換一天看看吧 🙏
            </Alert>
          )}
        </>
      )}

      <div className="mt-4">
        <Button variant="outline-secondary" onClick={() => navigate('/')}>
          上一步
        </Button>
      </div>
    </div>
  );
}
