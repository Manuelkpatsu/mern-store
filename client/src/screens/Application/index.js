import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Footer from '../../components/common/Footer';
import Page404 from '../../components/common/Page404';
import HomePage from '../Homepage';

class Application extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
    
        // if (token) {
        //     this.props.fetchProfile();
        // }
    
        // this.props.handleCart();
    
        // document.addEventListener('keydown', this.handleTabbing);
        // document.addEventListener('mousedown', this.handleMouseDown);
    }
    
    handleTabbing(e) {
        if (e.keyCode === 9) {
            document.body.classList.add('user-is-tabbing');
        }
    }
    
    handleMouseDown() {
        document.body.classList.remove('user-is-tabbing');
    }

    render () {
        return (
            <div className='application'>
                <main className='main'>
                    <Container>
                        <div className='wrapper'>
                            <Routes>
                                <Route exact path='/' element={<HomePage />} />
                                <Route path='/404' element={<Page404 />} />
                                <Route path='*' element={<Page404 />} />
                            </Routes>
                        </div>
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Application;
