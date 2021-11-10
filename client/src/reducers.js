import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';

import accountReducer from './screens/Account/reducer';
import authenticationReducer from './screens/Authentication/reducer';
import cartReducer from './screens/Cart/reducer';
import loginReducer from './screens/Login/reducer';
import navigationReducer from './screens/Navigation/reducer';
import newsletterReducer from './screens/Newsletter/reducer';
import productReducer from './screens/Product/reducer';
import homepageReducer from './screens/Homepage/reducer';

const createReducer = history =>
    combineReducers({
        router: connectRouter(history),
        notifications,
        account: accountReducer,
        authentication: authenticationReducer,
        cart: cartReducer,
        login: loginReducer,
        product: productReducer,
        navigation: navigationReducer,
        newsletter: newsletterReducer,
        homepage: homepageReducer,
    });

export default createReducer;