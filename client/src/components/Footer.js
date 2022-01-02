import {Link} from 'react-router-dom'
import Context from '../Context';
import { useContext } from 'react';
const Footer = () => {
    const Login = useContext(Context);
    return (
        <footer>
            {Login && <p>Copyright &copy; 2021 </p>}
            {Login && <p>Email me :<a href="https://mail.google.com/mail/?view=cm&fs=1&to=sudhikumar8055@gmail.com"> SUDHI</a></p>}
            {Login && <Link to="/about">About</Link>}
            
        </footer>
    )
}

export default Footer;
