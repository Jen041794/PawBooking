import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';
import Steps from '../components/Steps';

export default function ServiceSelect() {
  const navigate = useNavigate();
  const { updateDraft } = useBooking();

  const choose = (service) => {
    // 換了服務就清掉之前選的日期時段，避免時長對不上
    updateDraft({ service, date: '', time: '' });
    navigate('/datetime');
  };

  return (
    <div>
      <div className="hero-banner text-center text-white rounded-4 p-4 p-md-5 mb-4">
        <div className="display-5">🐾</div>
        <h2 className="fw-bold mb-1">毛孩預約</h2>
        <p className="mb-2 opacity-75">幫你家寶貝預約專屬的美容時光</p>
        <span className="badge rounded-pill bg-white text-success">📅 預約請提前一天，最早可約明天</span>
      </div>

      <Steps current={1} />
      <h4 className="mb-3">選擇服務項目</h4>
      <Row className="g-3">
        {SERVICES.map((s) => (
          <Col xs={12} key={s.id}>
            <Card className="shadow-sm border-0 service-card" onClick={() => choose(s)}>
              <Card.Body className="d-flex align-items-center">
                <div className="display-6 me-3">{s.icon}</div>
                <div className="flex-grow-1">
                  <Card.Title className="mb-1">{s.name}</Card.Title>
                  <Card.Text className="text-muted small mb-0">{s.desc}</Card.Text>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-primary">NT$ {s.price}</div>
                  <Badge bg="light" text="dark">
                    {s.duration} 分鐘
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
