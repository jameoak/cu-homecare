import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import moment from 'moment';
import BarChart from"../components/BarChart";

export default class Home extends Component {

 constructor(props) {
   super(props);
   this.state = {
     isLoading: true,
     notes: [],
     chartData: {},
     username: ""
   }
 }

 // Might need to be combined with did mount at the end of section
 // componentWillMount(){
 //   this.getChartData(this.state.notes);
 // }

 getChartData(notes){

   this.setState({
     chartData:{
       labels: [
        moment(notes[0].createdAt).format(),
        moment(notes[1].createdAt).format()],
        //moment(notes[2].createdAt).format(),
        //moment(notes[3].createdAt).format()],
       datasets: [
         {
           label: 'Dataset1',
           fill: false,
           lineTension: 0.1,
           backgroundColor: 'rgba(75,192,192,0.4)',
           borderColor: 'rgba(75,192,192,1)',
           borderCapStyle: 'butt',
           borderDash: [],
           borderDashOffset: 0.0,
           borderJoinStyle: 'miter',
           pointBorderColor: 'rgba(75,192,192,1)',
           pointBackgroundColor: '#fff',
           pointBorderWidth: 1,
           pointHoverRadius: 5,
           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
           pointHoverBorderColor: 'rgba(220,220,220,1)',
           pointHoverBorderWidth: 2,
           pointRadius: 1,
           pointHitRadius: 10,
           data: [
           notes[0].content,
           notes[1].content]
           //notes[2].content,
          // notes[3].content]
         }
       ]
     }
   });
 }

 renderNotesList(notes, username) {
   console.log(notes);
   console.log("renderNoteList");
   return (
     <div>
       <h4>
        {"Welcome " + notes[0].name}
       </h4>
       <div>
        <BarChart chartData={this.state.chartData} title="Example Metrics"/>
       </div>
     </div>
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

 renderNotes(notes) {
   console.log("renderNotes");
   console.log(notes);
   return (
     <div className="notes">
       <PageHeader>Your Data</PageHeader>
       <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes, this.state.username)}
       </ListGroup>
     </div>
   );
 }

 render() {
   console.log("render");
   return (
     <div className="Home">
       {this.props.isAuthenticated ? this.renderNotes(this.state.notes) : this.renderLander()}
     </div>
   );
 }

 async componentDidMount() {
   if (!this.props.isAuthenticated) {
     return;
   }

   try {
     const results = await this.notes();
     this.setState({ notes: results });
     this.getChartData(this.state.notes);
     console.log("mount");
     if(this.props.username === ""){
       this.setState({ username: localStorage.getItem('username')});
     } else {
       this.setState({ username: this.props.username});
       localStorage.setItem('username', this.props.username);
     }

   } catch (e) {
     alert(e);
   }

   this.setState({ isLoading: false });
 }

 notes() {
   return invokeApig({ path: "/notes" });
 }


}

// const BarGraph = (props) => {
//
//   const testData = props.dataset
//
//   const data = {
//     labels: ['January', 'February', 'March', 'April'],
//     datasets: [
//       {
//         label: 'Data Set',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: testData
//       }
//     ]
//   }
//     return (
//       <Bar data={data} />
//     )
// }
