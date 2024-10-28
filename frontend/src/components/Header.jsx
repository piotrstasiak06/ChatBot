import logo from '../assets/header/logo.png';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="logo of the app" />
      <h1>{'ChatBot'}<span>{'\u00ae'}</span></h1>
    </header>
  );
}