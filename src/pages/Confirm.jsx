import { useNavigate, Navigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useBooking } from '../context/BookingContext';
import Steps from '../components/Steps';

// 摘要的單行欄位（放在元件外，避免每次 render 都重建元件）
function Row({ label, children }) {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <span className="text-muted">{label}</span>
      <span className="text-end">{children}</span>
    </ListGroup.Item>
  );
}

export default function Confirm() {
  const navigate = useNavigate();
  const { draft, confirmBooking } = useBooking();

  if (!draft.service || !draft.date || !draft.time || !draft.pet)
    return <Navigate to="/" replace />;

  const { service, date, time, pet } = draft;

  const submit = () => {
    const booking = confirmBooking();
    navigate('/success', { state: { id: booking.id } });
  };

  return (
    <div>
      <Steps current={4} />
      <h4 className="mb-3">確認預約資訊</h4>
      <Card className="shadow-sm border-0">
        <ListGroup variant="flush">
          <Row label="服務">
            <strong>{service.name}</strong>
          </Row>
          <Row label="日期時間">
            <strong>
              {date} {time}
            </strong>
          </Row>
          <Row label="時長">{service.duration} 分鐘</Row>
          <Row label="寵物">
            {pet.petName}（{pet.species}・{pet.size}）
          </Row>
          <Row label="飼主">
            {pet.ownerName}・{pet.phone}
          </Row>
          {pet.note && <Row label="備註">{pet.note}</Row>}
          <Row label="費用">
            <strong className="text-primary">NT$ {service.price}</strong>
          </Row>
        </ListGroup>
      </Card>

      <div className="d-flex gap-2 mt-4">
        <Button variant="outline-secondary" onClick={() => navigate('/form')}>
          返回修改
        </Button>
        <Button variant="primary" className="flex-grow-1" onClick={submit}>
          確認送出
        </Button>
      </div>
    </div>
  );
}
