import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';

import applicationReducer from './screens/Application/reducer';
import accountReducer from './screens/Account/reducer';
import authenticationReducer from './screens/Authentication/reducer';
import cartReducer from './screens/Cart/reducer';
import signupReducer from './screens/Signup/reducer';
import loginReducer from './screens/Login/reducer';
import forgotPasswordReducer from './screens/ForgotPassword/reducer';
import resetPasswordReducer from './screens/ResetPassword/reducer';
import navigationReducer from './screens/Navigation/reducer';
import newsletterReducer from './screens/Newsletter/reducer';
import productReducer from './screens/Product/reducer';
import homepageReducer from './screens/Homepage/reducer';
import navigationMenuReducer from './screens/NavigationMenu/reducer';
import brandReducer from './screens/Brand/reducer';
import categoryReducer from './screens/Category/reducer';

const createReducer = history =>
    combineReducers({
        router: connectRouter(history),
        notifications,
        application: applicationReducer,
        account: accountReducer,
        authentication: authenticationReducer,
        cart: cartReducer,
        signup: signupReducer,
        login: loginReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        product: productReducer,
        navigation: navigationReducer,
        newsletter: newsletterReducer,
        homepage: homepageReducer,
        menu: navigationMenuReducer,
        brand: brandReducer,
        category: categoryReducer
    });

export default createReducer;