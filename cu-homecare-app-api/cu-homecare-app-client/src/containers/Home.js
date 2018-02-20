import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import { Accordion, AccordionItem } from 'react-sanfona';
import Chart from '../components/Chart.js'


// Hi Steve


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
            i !== 0
            ? <ListGroupItem
                key={note.noteId}
                href={`/notes/${note.noteId}`}
                onClick={this.handleNoteClick}
                header={note.content}           //  .content.trim().split("\n")[0]}         CHANGE TO timestamp
            >
            <b> {"Created: "} </b>
            {"" + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
            : <ListGroupItem
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

    checkItem(item) {
      // const isLoggedIn = props.isLoggedIn;
      if (item == "Graphs") {
        return (
          <div>
              <center> <b> Graphs: </b> View trends in your data. </center>
              <Chart />
          </div>
        );
      }
      else if (item == "Data") {
        return(
            <div className="quick-data">
                <h4>
                  <center>
                    <b> Quickly view important information. </b>
                  </center>
                </h4> <br />
                <p> <b> Temperature: </b>  68° </p>
                <p> <b> Movement: </b> 27 minutes ago </p>
                <p> <b> Medication: </b>  Taken 12 minutes ago </p>
                <p> <b> Humidity: </b>  45% </p>
                <p> <b> Open Door: </b>  1.5 hours ago </p>
                <p> <b> Smoke/Gas: </b>  None detected </p>
            </div>
        )
      }
      else if (item == "Sensor Status") {
        return(
            <div className="quick-data">
                <h4>
                  <center>
                    <b> Current state of your sensors. </b>
                  </center>
                </h4> <br />
                <p> <b> Temperature: </b>  Connected ✔ </p>
                <p> <b> Movement: </b> Connected ✔ </p>
                <p> <b> Medication: </b>  Connected ✔ </p>
                <p> <b> Humidity: </b>  Connected ✔</p>
                <p> <b> Open Door: </b>  Connected ✔ </p>
                <p color="red"> <b> Smoke/Gas: </b>  ✘ - Disconnected </p>
            </div>
        )
      }
      return <div />;
    }

    renderAccordion() {
        return (
            <Accordion allowMultiple={true}>
                {["Data", "Graphs",  "Sensor Status", "Settings"].map(item => {
                    return (
                        <AccordionItem title={`${item}`} expanded={item === 1}>
                            <div>
                              <ListGroupItem  key="new">
                                {this.checkItem(item)}
                              </ListGroupItem>
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        );
    }



    renderOptions() {
        return (
            <div className="main">
            <PageHeader> Welcome John Smith </PageHeader>
            <ListGroup className="accordion">
                {/* Load Accordion*/}
                {this.renderAccordion()}

                {/* Load 'Graph' Button*/}
                <ListGroupItem
                      key="new"
                      href="/Graphs"
                      onClick={this.handleNoteClick}
                    >
                      <h4>
                      <b>{"\uFF0B"} Graphs</b>
                      </h4>
                </ListGroupItem>

            </ListGroup>
            </div>
        );
    }
    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderOptions() :
                this.renderLander()}
            </div>
        );
    }
}
