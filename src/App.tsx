import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import { events } from './data/events';
import './styles/main.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Show the river timeline on the homepage */}
        <Route path="/" element={<TimelinePage events={events} />} />
        {/* Old 3D scene moved to /3d */}
        <Route path="/3d" element={<HomePage events={events} />} />
        <Route path="/timeline" element={<TimelinePage events={events} />} />
      </Routes>
    </BrowserRouter>
  );
}

