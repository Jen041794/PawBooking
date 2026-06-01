import { Fragment } from 'react';
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';

// 預約流程的四個步驟
const STEPS = [
  { icon: '✂️', title: '選擇服務', desc: '洗澡 / 美容 / 修剪' },
  { icon: '📅', title: '選擇時段', desc: '挑日期與時段' },
  { icon: '📝', title: '填寫資料', desc: '寵物與飼主資訊' },
  { icon: '✅', title: '確認送出', desc: '完成即可查看' },
];

// 聯絡資訊
const CONTACTS = [
  { icon: '📞', label: '電話', value: '02-1234-5678' },
  { icon: '✉️', label: 'Email', value: 'hello@pawbooking.tw' },
  { icon: '📍', label: '地址', value: '台北市中山區寵物路 123 號' },
  { icon: '🕙', label: '營業時間', value: '每日 10:00 起，最後預約 20:00' },
];

export default function About() {
  return (
    <div>
      {/* 頁首 */}
      <div className="text-center mb-4">
        <div className="display-6">🐾</div>
        <h5 className="fw-bold mb-1">關於我們</h5>
        <p className="text-muted small mb-0">
          毛孩預約是寵物美容／洗澡的線上預約服務，<br className="d-none d-sm-inline" />
          讓你輕鬆幫家中寶貝安排專屬的清潔與美容時光
        </p>
      </div>

      <Tab.Container defaultActiveKey="guide">
        <Row className="g-3">
          {/* 左欄：標題清單（較窄的側欄） */}
          <Col xs={12} md={4}>
            <Nav variant="pills" className="flex-column about-nav p-2 bg-white about-card shadow-sm">
              <Nav.Link eventKey="guide" className="mb-1">
                📖 預約使用說明
              </Nav.Link>
              <Nav.Link eventKey="contact">📞 聯絡我們</Nav.Link>
            </Nav>
          </Col>

          {/* 右欄：點擊標題後顯示的說明（較寬） */}
          <Col xs={12} md={8}>
            <Tab.Content className="bg-white about-card shadow-sm p-3 p-md-4 h-100">
              {/* 預約使用說明 */}
              <Tab.Pane eventKey="guide">
                <h6 className="about-heading">預約使用說明</h6>
                <div className="d-flex flex-column align-items-stretch mb-3 step-flow">
                  {STEPS.map((s, i) => (
                    <Fragment key={s.title}>
                      <Card className="border-0 about-card shadow-sm step-card">
                        <Card.Body className="d-flex align-items-center">
                          <span className="step-icon">{s.icon}</span>
                          <div className="ms-3">
                            <div className="fw-semibold">
                              步驟 {i + 1}：{s.title}
                            </div>
                            <div className="text-muted small">{s.desc}</div>
                          </div>
                        </Card.Body>
                      </Card>
                      {i < STEPS.length - 1 && <div className="step-arrow text-primary">↓</div>}
                    </Fragment>
                  ))}
                </div>

                <div className="bg-success-subtle rounded-2 p-3">
                  <p className="mb-2 fw-semibold text-success-emphasis">📌 預約須知</p>
                  <ul className="small mb-0 text-body-secondary">
                    <li>營業時間自每日早上 10:00 開始，最後預約時間為 20:00</li>
                    <li>
                      需提前一天預約，最早可預約隔天、最晚 30 天內；若隔天時段已被預約完，請再選擇其他日期
                    </li>
                    <li>全套美容需 120 分鐘，會佔用連續的時段</li>
                    <li>取消預約後，該時段會立即釋放給其他人預約</li>
                  </ul>
                </div>
              </Tab.Pane>

              {/* 聯絡我們 */}
              <Tab.Pane eventKey="contact">
                <h6 className="about-heading">聯絡我們</h6>
                <Row className="g-3">
                  {CONTACTS.map((c) => (
                    <Col xs={12} sm={6} key={c.label}>
                      <Card className="border-0 about-card shadow-sm h-100 contact-card">
                        <Card.Body className="d-flex align-items-center">
                          <span className="contact-bubble">{c.icon}</span>
                          <div className="ms-3 text-break">
                            <div className="text-muted small">{c.label}</div>
                            <div className="fw-semibold">{c.value}</div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
