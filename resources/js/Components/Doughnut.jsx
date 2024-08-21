import React from 'react'
import {ArcElement, Tooltip, Chart as chartJS, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

chartJS.register(ArcElement, Tooltip,Legend)
const Doughnuts = () => {

    const data = {
        datasets: [
           {
             label: 'Tasks',
            data: [23,45,3],
            backgroundColor: ['#0747bc', '#2265d8', '#2f91f8']
        }
        ],
        labels: ['start', 'pending', 'completed']
    };

  return <Doughnut data={data} options={
    {
        cutout: '60%',
        plugins: {
            legend:{
                display: false
            }
        }
    }
  } />
}

export default Doughnuts