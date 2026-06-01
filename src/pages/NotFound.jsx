import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function NotFound() {
  return (
    <div className="text-center py-5 notfound">
      <div className="notfound-emoji">🐶</div>
      <h1 className="notfound-code fw-bold text-primary">404</h1>
      <p className="text-muted">
        汪？這個頁面好像走丟了……
        <br />
        帶毛孩回首頁吧！
      </p>
      <Button as={Link} to="/" variant="primary" className="mt-2">
        回首頁
      </Button>
      <div className="notfound-paws">🐾 🐾 🐾</div>
    </div>
  );
}
