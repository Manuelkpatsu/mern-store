import SearchBar from '../common/SearchBar';

const UserSearch = props => {
    return (
        <div className='mb-3'>
            <SearchBar
                name='user'
                placeholder='Type user name or email'
                btnText='Search'
                onSearchSubmit={props.onSearchSubmit}
            />
        </div>
    );
};

export default UserSearch;
