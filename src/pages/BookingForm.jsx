import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useBooking } from '../context/BookingContext';
import Steps from '../components/Steps';

// 台灣手機號碼：09 開頭共 10 碼
const PHONE_RE = /^09\d{8}$/;

export default function BookingForm() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useBooking();
  const [form, setForm] = useState(
    draft.pet || {
      petName: '',
      species: '狗',
      size: '小型',
      ownerName: '',
      phone: '',
      note: '',
    }
  );
  const [validated, setValidated] = useState(false);

  // 還沒選服務 / 日期 / 時段就進來，導回首頁
  if (!draft.service || !draft.date || !draft.time) return <Navigate to="/" replace />;

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const phoneValid = PHONE_RE.test(form.phone);

  const submit = (e) => {
    e.preventDefault();
    const valid = e.currentTarget.checkValidity() && phoneValid;
    setValidated(true);
    if (!valid) return;
    updateDraft({ pet: form });
    navigate('/confirm');
  };

  return (
    <div>
      <Steps current={3} />
      <h4 className="mb-3">填寫預約資料</h4>
      <Form noValidate validated={validated} onSubmit={submit}>
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Form.Label>寵物名字 *</Form.Label>
            <Form.Control name="petName" value={form.petName} onChange={change} required />
            <Form.Control.Feedback type="invalid">請填寫寵物名字</Form.Control.Feedback>
          </Col>
          <Col xs={6} md={3}>
            <Form.Label>類型</Form.Label>
            <Form.Select name="species" value={form.species} onChange={change}>
              <option>狗</option>
              <option>貓</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={3}>
            <Form.Label>體型</Form.Label>
            <Form.Select name="size" value={form.size} onChange={change}>
              <option>小型</option>
              <option>中型</option>
              <option>大型</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>飼主姓名 *</Form.Label>
            <Form.Control name="ownerName" value={form.ownerName} onChange={change} required />
            <Form.Control.Feedback type="invalid">請填寫飼主姓名</Form.Control.Feedback>
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>聯絡電話 *</Form.Label>
            <Form.Control
              name="phone"
              value={form.phone}
              onChange={change}
              required
              isInvalid={validated && !phoneValid}
              placeholder="09xxxxxxxx"
            />
            <Form.Control.Feedback type="invalid">
              請填寫正確的手機號碼（09 開頭共 10 碼）
            </Form.Control.Feedback>
          </Col>
          <Col xs={12}>
            <Form.Label>備註</Form.Label>
            <Form.Control as="textarea" rows={2} name="note" value={form.note} onChange={change} />
          </Col>
        </Row>

        <div className="d-flex gap-2 mt-4">
          <Button variant="outline-secondary" onClick={() => navigate('/datetime')}>
            上一步
          </Button>
          <Button type="submit" variant="primary" className="flex-grow-1">
            下一步：確認
          </Button>
        </div>
      </Form>
    </div>
  );
}
