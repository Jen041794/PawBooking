import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function MyBookings() {
  const { bookings, cancelBooking } = useBooking();

  // 依日期 + 時間排序
  const sorted = [...bookings].sort((a, b) =>
    (a.date + a.time).localeCompare(b.date + b.time)
  );

  const remove = (b) => {
    if (window.confirm(`確定要取消 ${b.pet.petName} 的「${b.serviceName}」預約嗎？`)) {
      cancelBooking(b.id);
    }
  };

  if (sorted.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="display-4">🐶</div>
        <p className="mt-3">還沒有任何預約</p>
        <Button as={Link} to="/" variant="primary">
          立即預約
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">我的預約</h4>
        <Badge bg="success-subtle" text="success" className="fs-6">
          共 {sorted.length} 筆預約
        </Badge>
      </div>
      {sorted.map((b) => (
        <Card key={b.id} className="shadow-sm border-0 mb-3">
          <Card.Body className="d-flex align-items-center">
            <div className="flex-grow-1">
              <div className="fw-bold">
                {b.serviceName}{' '}
                <Badge bg="success-subtle" text="success">
                  {b.duration} 分鐘
                </Badge>
              </div>
              <div className="text-muted small">
                {b.date} {b.time}・{b.pet.petName}（{b.pet.species}）
              </div>
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => remove(b)}>
              取消
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
