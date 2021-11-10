import { bindActionCreators } from 'redux';

import * as application from './screens/Application/actions';
import * as account from './screens/Account/actions';
import * as authentication from './screens/Authentication/actions';
import * as cart from './screens/Cart/actions';
import * as signup from './screens/Signup/actions';
import * as login from './screens/Login/actions';
import * as navigation from './screens/Navigation/actions';
import * as newsletter from './screens/Newsletter/actions';
import * as product from './screens/Product/actions';
import * as homepage from './screens/Homepage/actions';
import * as menu from './screens/NavigationMenu/actions';
import * as brand from './screens/Brand/actions';
import * as category from './screens/Category/actions';

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...application,
            ...account,
            ...authentication,
            ...cart,
            ...signup,
            ...login,
            ...navigation,
            ...newsletter,
            ...product,
            ...homepage,
            ...menu,
            ...brand,
            ...category
        },
        dispatch
    );
}
