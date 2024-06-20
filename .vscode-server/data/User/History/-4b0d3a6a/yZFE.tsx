import logo from '../../../assets/LocalExpress_logo.svg';
import './Header.scss';


function Header() {
  const handleClick = () => {
    
  };

  return (
    <header className="header">
      <img src={logo} alt="Local Express" />
      <h1>Vos courses livrées avec le sourire</h1>

      <button
        type="button"
        className="big"
        onClick={handleClick}
      >
        Commencer
      </button>

    </header>
  );
}


export default Header;
