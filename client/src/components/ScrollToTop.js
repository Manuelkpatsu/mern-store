import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.history.pathname !== prevProps.history.pathname) {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);