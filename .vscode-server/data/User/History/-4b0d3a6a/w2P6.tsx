import logo from '../../../assets/LocalExpress_logo.svg';
import './Header.scss';

interface HeaderProps {
  onButtonClick: () => void;
}

function Header({ onButtonClick }: HeaderProps) {
  return (
    <header className="header">
      <img src={logo} alt="Local Express" />
      <h1>Vos courses livrées avec le sourire</h1>

      <button
        type="button"
        className="big"
        onClick={onButtonClick}
      >
        Commencer
      </button>
    </header>
  );
}

export default Header;
