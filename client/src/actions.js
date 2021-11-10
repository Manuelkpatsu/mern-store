import { bindActionCreators } from 'redux';

import * as account from './screens/Account/actions';
import * as authentication from './screens/Authentication/actions';
import * as cart from './screens/Cart/actions';
import * as login from './screens/Login/actions';
import * as navigation from './screens/Navigation/actions';
import * as newsletter from './screens/Newsletter/actions';
import * as product from './screens/Product/actions';
import * as homepage from './screens/Homepage/actions'

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...account,
            ...authentication,
            ...cart,
            ...login,
            ...navigation,
            ...newsletter,
            ...product,
            ...homepage
        },
        dispatch
    );
}
