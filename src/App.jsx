import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ServiceSelect from './pages/ServiceSelect';
import DateTimeSelect from './pages/DateTimeSelect';
import BookingForm from './pages/BookingForm';
import Confirm from './pages/Confirm';
import Success from './pages/Success';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ServiceSelect />} />
        <Route path="datetime" element={<DateTimeSelect />} />
        <Route path="form" element={<BookingForm />} />
        <Route path="confirm" element={<Confirm />} />
        <Route path="success" element={<Success />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
