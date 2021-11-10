import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import actions from '../../actions';
import Footer from '../../components/common/Footer';
import Page404 from '../../components/common/Page404';
import Login from '../Login';
import HomePage from '../Homepage';
import Navigation from '../Navigation';

class Application extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
    
        // if (token) {
        //     this.props.fetchProfile();
        // }
    
        this.props.handleCart();
    
        document.addEventListener('keydown', this.handleTabbing);
        document.addEventListener('mousedown', this.handleMouseDown);
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
                <Navigation />
                <main className='main'>
                    <Container>
                        <div className='wrapper'>
                            <Switch>
                                <Route exact path='/' component={HomePage} />
                                <Route path='/login' component={Login} />
                                <Route path='/404' component={Page404} />
                                <Route path='*' component={Page404} />
                            </Switch>
                        </div>
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.authentication.authenticated,
        products: state.product.storeProducts
    };
};

export default connect(mapStateToProps, actions)(Application);
