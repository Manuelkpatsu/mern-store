import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import CategoryList from '../../components/manager/CategoryList';
import SubPage from '../../components/manager/SubPage';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import NotFound from '../../components/common/NotFound';

class List extends React.PureComponent {
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const { history, categories, isLoading } = this.props;

        return (
            <>
                <SubPage
                    title='Categories'
                    actionTitle='Add'
                    handleAction={() => history.push('/dashboard/category/add')}
                >
                    {isLoading ? (
                        <LoadingIndicator inline />
                    ) : categories.length > 0 ? (
                        <CategoryList categories={categories} />
                    ) : (
                        <NotFound message='no categories found.' />
                    )}
                </SubPage>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        isLoading: state.category.isLoading,
        user: state.account.user
    };
};

export default connect(mapStateToProps, actions)(List);
