import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import TicketBoard from '../ticket';
import {SessionRemoteAPI} from '../remote';
import './Home.css';

const Profile = () => (
    <div>
        <h2>Profile</h2>
    </div>
);

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profile: null};
    }

    componentDidMount() {
        (new SessionRemoteAPI()).get()
            .catch(err => this.props.history.push('/login'))
            .then(data => this.setState({profile: data}));
    }

    render() {
        return (
        <div className="home">
            <Header profile={this.state.profile} onLogout={() => this.props.history.push('/login')}/>
            <Switch>
                <Route path="/profile" component={Profile}/>
                <Route path="/tickets/:id" component={TicketBoard}/>
                <Route path="/tickets" component={TicketBoard}/>
                <Redirect to="/tickets"/>
            </Switch>
            <Footer/>
        </div>
        );
    }
}
