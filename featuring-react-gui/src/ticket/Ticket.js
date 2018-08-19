import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import {TicketRemoteAPI, ClientRemoteAPI, ProductRemoteAPI, interceptAPIError} from '../remote';
import './Ticket.css';


export default class TicketBoard extends React.Component {
    constructor(props) {
        super(props);

        this.panelEventCallbacks = {
            onNewTicketSubmitted: this.onNewTicketSubmitted.bind(this),
            onEditTicketSubmitted: this.onEditTicketSubmitted.bind(this),
            onDeleteTicket: this.onDeleteTicket.bind(this),
        };

        this.state = {
            selectedClientId: undefined,
            tickets: [],
            clients: [
                // {
                //     clientId: 1,
                //     clientName: "Client A"
                // },
                // {
                //     clientId: 2,
                //     clientName: "Client B"
                // },
                // {
                //     clientId: 3,
                //     clientName: "Client C"
                // }
            ],
            products: [
                // {
                //     productId: 1,
                //     productName: "Product A"
                // },
                // {
                //     productId: 2,
                //     productName: "Product B"
                // },
                // {
                //     productId: 3,
                //     productName: "Product C"
                // }
            ]
        };
    }

    refreshTickets() {
        return (new TicketRemoteAPI()).list()
            .catch(err => {console.error(err); this.props.history.push('/login')})
            .then(data => this.setState({tickets: data}));
    }

    refreshClients() {
        return (new ClientRemoteAPI()).list()
            .catch(err => {console.error(err); this.props.history.push('/login')})
            .then(data => this.setState({clients: data}));
    }

    refreshProducts() {
        return (new ProductRemoteAPI()).list()
            .catch(err => {console.error(err); this.props.history.push('/login')})
            .then(data => this.setState({products: data}));
    }

    componentDidMount() {
        this.refreshTickets();
        this.refreshClients();
        this.refreshProducts();
    }

    onClientSelect(clientId) {
        const _clientId = parseInt(clientId, 10);
        this.setState({selectedClientId: _clientId});
        const firstClientTicket = this.state.tickets.find((ticket) => ticket.clientId === _clientId);
        const ticketId = (firstClientTicket ? firstClientTicket.ticketId : '');
        this.props.history.push(`/tickets/${ticketId}`);
    }

    onNewTicketSubmitted(ticket) {
        this.props.history.push('/tickets/' + ticket.ticketId);
        this.refreshTickets();
    }

    onEditTicketSubmitted(ticket) {
        this.props.history.push('/tickets/' + ticket.ticketId);
        this.refreshTickets();
    }

    onDeleteTicket(ticket) {
        this.props.history.push('/tickets');
        this.refreshTickets();
    }

    render() {
        const paramTicketId = this.props.match.params.id;
        const targetTicketId = paramTicketId && parseInt(paramTicketId, 10);
        const selectedTicket = this.state.tickets.find((ticket) => ticket.ticketId === targetTicketId) || this.state.tickets[0];
        const currentClientId = this.state.selectedClientId || (selectedTicket && selectedTicket.clientId);

        return (
            <div className="ticket-board">
                <div className="ticket-navigator">
                    <TicketBoardController
                        clients={this.state.clients}
                        currentClientId={currentClientId}
                        onClientSelect={this.onClientSelect.bind(this)}/>
                    <TicketList
                        tickets={this.state.tickets}
                        currentTicketId={selectedTicket && selectedTicket.ticketId}
                        currentClientId={currentClientId}/>
                </div>
                <TicketPanel
                    selectedTicket={selectedTicket}
                    tickets={this.state.tickets}
                    clients={this.state.clients}
                    products={this.state.products}
                    callbacks={this.panelEventCallbacks} />
            </div>
        );
    }
}

function TicketPanel({selectedTicket, tickets, clients, products, callbacks}) {
    if (tickets.length && selectedTicket) {
        return (
            <Switch>
                <Route path="/tickets/new" render={(props) => <TicketCreatePanel {...props} clients={clients} products={products} onSubmit={callbacks.onNewTicketSubmitted} />} />
                <Route path="/tickets/:id/edit" render={(props) => <TicketEditPanel {...props} ticket={selectedTicket} clients={clients} products={products} onSubmit={callbacks.onEditTicketSubmitted} />} />
                <Route render={(props) => <TicketDetailsPanel {...props} ticket={selectedTicket} onDelete={callbacks.onDeleteTicket} />} />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/tickets/new" render={(props) => <TicketCreatePanel {...props} clients={clients} products={products} onSubmit={callbacks.onNewTicketSubmitted} />} />
            <Route component={TicketWelcomePanel}/>
        </Switch>
    );
}


function TicketBoardController({clients, currentClientId, onClientSelect}) {
    return (
        <div className="ticket-board-controller panel-body">
            <div><Link to="/tickets/new" className="btn btn-outline-dark">NEW</Link></div>
            <div>
                <select
                    className="custom-select"
                    value={currentClientId}
                    onChange={(ev) => onClientSelect(ev.target.value)}>
                    {clients.map((client) => <option key={client.clientId} value={client.clientId}>{client.clientName}</option>)}
                </select>
            </div>
        </div>
    );
}


function TicketList({tickets, currentClientId, currentTicketId}) {
    return (
        <div className="ticket-list">
            <div className="list-group list-feature">
                {tickets.filter((ticket) => !currentClientId || ticket.clientId === currentClientId)
                        .map((ticket, idx) => <TicketListItem key={idx} {...ticket} active={ticket.ticketId === currentTicketId}/>)}
            </div>
        </div>
    );
}


function TicketListItem({ticketId, title, active}) {
    return (
        <Link to={`/tickets/${ticketId}`} className={classNames(["ticket-item", "list-group-item", "list-group-item-action", {active}])}>
            <h4>{title}</h4>
            <p className="list-group-item-text">MAIN PRODUCT</p>
        </Link>
    );
}

function createErrorAlert(err, onDismiss) {
    return (
      <div className="alert alert-danger alert-banner">
        Sorry, but your last performed action failed ({err.reason})
        <i onClick={onDismiss || (() => {})} className="btn-error-ack fa fa-times"/>
      </div>);
  }


class TicketCreatePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: undefined};
    }

    render() {
        return (
            <div className="ticket-panel ticket-panel-create">
                {this.state.error ? createErrorAlert(this.state.error) : null}
                <h1>Submit a New Ticket</h1>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" placeholder="Enter description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client">Client</label>
                        <select className="custom-select" id="client" name="client" required>
                            {this.props.clients.map((client) => <option key={client.clientId} value={client.clientId}>{client.clientName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select className="custom-select" id="product" name="product" required>
                            {this.props.products.map((product) => <option key={product.productId} value={product.productId}>{product.productName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Ticket Due by</label>
                        <input type="date" className="form-control" id="deadline" name="deadline" defaultValue={moment().add(1, 'd').format('YYYY-MM-DD')} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }

    onFormSubmit(event) {
        event.preventDefault();

        const formData = {
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            clientId: parseInt(event.target.elements.client.value, 10),
            productId: parseInt(event.target.elements.product.value, 10),
            deadline: moment(event.target.elements.deadline.value, "YYYY-MM-DD"),
        };

        (new TicketRemoteAPI())
            .create(formData)
            .then(result => this.props.onSubmit(result))
            .catch(err => interceptAPIError(err, this.props.history) || this.setState({error: err}));
    }
}

class TicketEditPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
    }

    render() {
        return (
            <div className="ticket-panel ticket-panel-create">
                {this.state.error ? createErrorAlert(this.state.error) : null}
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" defaultValue={this.props.ticket.title} className="form-control" id="title" name="title" placeholder="Enter title" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" defaultValue={this.props.ticket.description} className="form-control" id="description" name="description" placeholder="Enter description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client">Client</label>
                        <select className="custom-select" defaultValue={this.props.ticket.clientId} id="client" name="client" required>
                            {this.props.clients.map((client) => <option key={client.clientId} value={client.clientId}>{client.clientName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select defaultValue={this.props.ticket.productId} className="custom-select" id="product" name="product" required>
                            {this.props.products.map((product) => <option key={product.productId} value={product.productId}>{product.productName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Ticket Due by</label>
                        <input type="date" defaultValue={this.props.ticket.deadline.format('YYYY-MM-DD')} className="form-control" id="deadline" name="deadline" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }

    onFormSubmit(event) {
        event.preventDefault();

        const formData = {
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            clientId: parseInt(event.target.elements.client.value, 10),
            productId: parseInt(event.target.elements.product.value, 10),
            deadline: moment(event.target.elements.deadline.value, "YYYY-MM-DD"),
        };

        (new TicketRemoteAPI())
            .update(this.props.ticket.ticketId, formData)
            .then(result => this.props.onSubmit(result))
            .catch(err => interceptAPIError(err, this.props.history) || this.setState({error: err}));
    }
}

class TicketDetailsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: undefined}
    }

    onTicketDelete() {
        (new TicketRemoteAPI()).delete(this.props.ticket.ticketId)
        .then(result => this.props.onDelete(this.props.ticket))
        .catch(err => interceptAPIError(err, this.props.history) || this.setState({error: err}));
    }

    render() {
        return (
            <div className="ticket-panel ticket-panel-details">
                {this.state.error ? createErrorAlert(this.state.error) : null}
                <h1>{this.props.ticket.title}</h1>
                <header>
                    <div className="badge badge-info">{this.props.ticket.clientName}</div>
                    <div className="badge badge-info">{this.props.ticket.productName}</div>
                    <div>Due by: {this.props.ticket.deadline.format('MM/DD/YYYY')}</div>
                </header>
                <div className="ticket-description">{this.props.ticket.description}</div>
                <Link to={`/tickets/${this.props.ticket.ticketId}/edit`} className="btn btn-outline-primary mr-1">Edit</Link>
                <button className="btn btn-outline-danger" onClick={this.onTicketDelete.bind(this)}>Delete</button>
            </div>
        );
    }
}


function TicketWelcomePanel() {
    return (
        <div className="ticket-panel ticket-panel-welcome">
            <h1>There are no tickets created in the system yet
                <div><small className="text-muted">Please add tickets by using the NEW button</small></div>
            </h1>
        </div>
    );
}

