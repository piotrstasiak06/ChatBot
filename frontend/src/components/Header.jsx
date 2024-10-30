import gif from '../assets/header/header2.gif';


export default function Header() {
  return (
    <header>
      <img src={gif} alt="logo of the app" />
      <h1>{'ChatBot'}<span>{'\u00ae'}</span></h1>
    </header>
  );
}