import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './index.css'

const Header = () => (
    <AuthContext.Consumer>
        {value => {
            const { authState, setAuthState } = value;

            const onCLickLogout = () => {
                localStorage.removeItem("accessToken");
                setAuthState({username: "",id: 0,status: false});
            }

            return (
                <nav>
                    <ul className='post-list-ul'>
                       <div>
                            {!authState.status ? (
                                <>
                                    <Link to="/login" className='link'><li className='nav-li'>Login</li></Link>
                                    <Link to="/registration" className='link'><li className='nav-li'>Registration</li></Link>
                                </>
                            ):(
                                <>
                                    <Link to="/" className='link'><li className='nav-li'>Home</li></Link>
                                    <Link to="/createpost" className='link'><li className='nav-li'>CreatePost</li></Link>
                                </>
                            )}
                        </div>
                    </ul>
                    <ul>
                        <div>
                            {authState.status && (
                                <>
                                    <h2 className='name-in-navbar'>{authState.username}</h2>
                                    <button type="button" onClick={onCLickLogout} className='logout-btn'>Logout</button>
                                </>
                                )}
                        </div>
                        
                    </ul>
                </nav>
            );
        }}
    </AuthContext.Consumer>
)

export default Header;
