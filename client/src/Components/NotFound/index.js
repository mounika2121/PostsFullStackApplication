import './index.css';
import Header from '../Header';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <>
        <Header />
        <div className='not-found-container'>
            <h2 className='page-notfound'>Page Not Found</h2>
            <img src='https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'
                alt='not-found'
                className='not-found-img'
            />
            <p>Go to the <Link to="/">Home Page</Link></p>
        </div>
    </>
)

export default NotFound