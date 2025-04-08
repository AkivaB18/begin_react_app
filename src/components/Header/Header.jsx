import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

export default function Header({ onPantryClick, onLogout }) {
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>Pantry Management</h1>
      <p>
        The days of forgetting what's in your pantry are behind you!
      </p>
      <button id="pantryButton" onClick={onPantryClick}>Go to Pantry</button>
      <button id="logoutButton" onClick={onLogout}>Log Out</button>
    </header>
  );
}