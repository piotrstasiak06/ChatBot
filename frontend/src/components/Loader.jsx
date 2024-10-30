import gif from '../assets/loader/loader.gif'

export default function Loader() {
    return <div className="loader">
        <img src={gif} alt="Loader..." />
    </div>;
    }