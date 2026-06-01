import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Layout() {
  // 自己控制展開狀態，點連結就收合（NavLink 不會觸發 collapseOnSelect）
  const [expanded, setExpanded] = useState(false);
  const close = () => setExpanded(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        bg="white"
        expand="md"
        expanded={expanded}
        onToggle={setExpanded}
        className="shadow-sm mb-4"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary" onClick={close}>
            🐾 毛孩預約
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto" onClick={close}>
              <Nav.Link as={NavLink} to="/" end>
                預約服務
              </Nav.Link>
              <Nav.Link as={NavLink} to="/my-bookings">
                我的預約
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                關於我們
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 主要內容：flex-grow-1 撐開高度，把 footer 推到底部 */}
      <Container as="main" className="pb-5 flex-grow-1" style={{ maxWidth: 760 }}>
        <Outlet />
      </Container>

      {/* 頁尾 */}
      <footer className="app-footer mt-auto py-4 bg-white border-top">
        <Container
          className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
          style={{ maxWidth: 760 }}
        >
          {/* 左：品牌（連回首頁）*/}
          <Link to="/" className="fw-bold text-primary text-decoration-none">
            🐾 毛孩預約 PawBooking
          </Link>

          {/* 右：連結 + 版權 */}
          <div className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 small mb-1">
              <Link to="/" className="text-decoration-none text-muted">
                預約服務
              </Link>
              <Link to="/my-bookings" className="text-decoration-none text-muted">
                我的預約
              </Link>
              <Link to="/about" className="text-decoration-none text-muted">
                關於我們
              </Link>
            </div>
            <div className="text-muted small">© 2026 PawBooking · Made by Michelle</div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
