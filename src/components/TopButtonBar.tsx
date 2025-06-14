import '../styles/TopButtonBar.css';
import { Link } from 'react-router-dom';

export default function TopButtonBar() {
  return (
    <div className="top-button-bar">
      <Link className="glow-button" to="/">Timeline</Link>
      <Link className="glow-button" to="/3d">3D Ansicht</Link>
      <button className="glow-button">Projekte</button>
      <button className="glow-button">Über mich</button>
      <button className="glow-button">Kontakt</button>
    </div>
  );
}