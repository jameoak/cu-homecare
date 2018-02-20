import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }

  }

  static defaultProps = {
    displayTitle:true,
    title: 'Basic Title'
  }

  render(){
    return(
      <div className="barChart">
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display: this.props.displayTitle,
              text: this.props.title
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}
export default BarChart
