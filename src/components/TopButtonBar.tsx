import './styles/TopButtonBar.css';

export default function TopButtonBar() {
  return (
    <div className="top-button-bar">
      <button className="glow-button">Projekte</button>
      <button className="glow-button">Über mich</button>
      <button className="glow-button">Kontakt</button>
    </div>
  );
}