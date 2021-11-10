import React from 'react';

import { connect } from 'react-redux';
import actions from '../../actions';
import EditBrand from '../../components/manager/EditBrand';
import SubPage from '../../components/manager/SubPage';
import NotFound from '../../components/common/NotFound';

class Edit extends React.PureComponent {
    componentDidMount() {
        const brandId = this.props.match.params.id;
        this.props.fetchBrand(brandId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const brandId = this.props.match.params.id;
            this.props.fetchBrand(brandId);
        }
    }

    render() {
        const {
            history,
            brand,
            formErrors,
            brandEditChange,
            updateBrand,
            deleteBrand,
            activateBrand
        } = this.props;

        return (
            <SubPage
                title='Edit Brand'
                actionTitle='Cancel'
                handleAction={history.goBack}
            >
                {brand?._id ? (
                    <EditBrand
                        brand={brand}
                        brandChange={brandEditChange}
                        formErrors={formErrors}
                        updateBrand={updateBrand}
                        deleteBrand={deleteBrand}
                        activateBrand={activateBrand}
                    />
                ) : (
                    <NotFound message='no brand found.' />
                )}
            </SubPage>
        );
    }
}

const mapStateToProps = state => {
    return {
        brand: state.brand.brand,
        formErrors: state.brand.editFormErrors
    };
};

export default connect(mapStateToProps, actions)(Edit);
