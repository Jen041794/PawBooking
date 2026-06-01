import { useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useBooking } from '../context/BookingContext';

export default function Success() {
  const { state } = useLocation();
  const { bookings } = useBooking();
  const booking = bookings.find((b) => b.id === state?.id);

  return (
    <div className="text-center py-4">
      <div className="display-1">✅</div>
      <h4 className="mt-3">預約成功！</h4>
      {booking ? (
        <p className="text-muted">
          已為 <strong>{booking.pet.petName}</strong> 預約
          <br />
          <strong>{booking.serviceName}</strong> — {booking.date} {booking.time}
        </p>
      ) : (
        <p className="text-muted">預約已建立</p>
      )}
      <div className="d-flex gap-2 justify-content-center mt-4">
        <Button as={Link} to="/my-bookings" variant="primary">
          查看我的預約
        </Button>
        <Button as={Link} to="/" variant="outline-secondary">
          再預約一筆
        </Button>
      </div>
    </div>
  );
}
