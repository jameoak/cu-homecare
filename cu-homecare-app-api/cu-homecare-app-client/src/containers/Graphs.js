import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';

//import {BarChart} from 'react-easy-chart';
import ReactDOM from 'react-dom';
//import LineChart from 'react-linechart';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            notes: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        try {
            const results = await this.notes();
            this.setState({ notes: results });
        } catch (e) {
            alert(e);
        }
        this.setState({ isLoading: false });
    }

    notes() {
        return invokeApig({ path: "/notes" });  // EDITED SCP
    }

    renderNotesList(notes) {
        return [{}].concat(notes).map(
            (note, i) =>
            (i !== 0) ?
            <ListGroupItem bsStyle="success">Success</ListGroupItem>  // If i != 0
            :
            // If i==0
            <ListGroupItem
                  key="new"
                  href="/notes/new"
                  onClick={this.handleNoteClick}
                >
                  <h4>
                  <b>{"\uFF0B"}</b> Create a new note
                  </h4>
            </ListGroupItem>
        );

    }
    handleNoteClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>CU HomeCare</h1>
                <p>Helping you care, from a distance</p>
            </div>
        );
    }

    renderNotes() {
        return (
            <div className="time">
            <PageHeader>Your Graphs</PageHeader>
            <ListGroup>
                {/* Load 'Back' Button*/}
                <ListGroupItem
                      key="back"
                      href="/"
                      onClick={this.handleNoteClick}
                    >
                      <h4>
                      <b>{"\uFF0B"} Back</b>
                      </h4>
                </ListGroupItem>
                {!this.state.isLoading && this.renderNotesList(this.state.notes)}
            </ListGroup>
            </div>
        );
    }
    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ?
                  this.renderNotes() : this.renderLander()
                }
            </div>
        );
    }
}
