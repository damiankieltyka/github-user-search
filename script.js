class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users: []
        };
    }

    onChangeHandle(event) {
        this.setState({searchText: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({users: responseJson.items}));
    }

    render() {
        const {
            state: { onSubmit, onChangeHandle },
            searchText, users } = this.state;

        return (
            <div>
                <h1>GitHub User Search</h1>
                <form onSubmit={event => onSubmit(event)}>
                    <label htmlFor="searchText">Search by user name</label><br/>
                    <input
                        type="text"
                        id="searchText"
                        onChange={event => onChangeHandle(event)}
                        value={searchText}/>
                </form>
                <UsersList users={users}/>
            </div>
        );
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user}/>);
    }

    render() {
        return (
            <div>
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        const { avatar_url, html_url, login } = this.props.user;
        return (
            <div>
                <img src={avatar_url} style={{maxWidth: '100px'}}/>
                <a href={html_url} target="_blank">{login}</a>
            </div>
        );
    }
}

ReactDOM.render(
<App />,
    document.getElementById('root')
);
