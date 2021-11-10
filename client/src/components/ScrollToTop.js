import React from 'react';

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.history.location.pathname !== prevProps.history.location.pathname) {
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

export default ScrollToTop;
