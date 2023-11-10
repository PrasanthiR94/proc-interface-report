
import {

    Chart as ChartJS,
  
    CategoryScale,
  
    LinearScale,
  
    PointElement,
  
    LineElement,
  
    Title,
  
    Tooltip,
  
    Legend,
  
  } from 'chart.js';
  
  import { Line } from 'react-chartjs-2';
  
   
  
  ChartJS.register(
  
    CategoryScale,
  
    LinearScale,
  
    PointElement,
  
    LineElement,
  
    Title,
  
    Tooltip,
  
    Legend
  
  );
  
   
  
   
  
   
  
  const NewChart =({chartdata,selectedTopic})=>{
  
  console.log(selectedTopic)
  
   
  
     
  
       const options = {
  
        responsive: true,
  
        plugins: {
  
          legend: {
  
            position: 'top'
  
          },
  
          title: {
  
            display: true,
  
            // text: 'Chart.js Bar Chart',
  
          },
  
        },
  
      };
  
   
  
   
  
   
  
    for(let i=0;i<chartdata.length;i++){
  
      // console.log(chartdata[i])
  
      const oldlabel = chartdata[i]["Source Workspace"]
  
      const last = oldlabel.lastIndexOf("|" )
  
        const len = oldlabel.length
  
   
  
        const newstring = oldlabel.slice(last+1 ,len  );
  
        chartdata[i]["Source Workspace"] = newstring
  
   
  
        var values1=Object.values(chartdata[i])
  
        values1.shift()
  
        values1.splice(-1)
  
        values1.splice(-1)
  
        chartdata[i].values = values1
  
   
  
        var keys1 =  Object.keys(chartdata[i])
  
        keys1.shift()
  
        keys1.splice(-1)
  
        keys1.splice(-1)
  
        chartdata[i].keyss = keys1
  
   
  
    }
  
   
  
    const currentData = chartdata.filter((el)=>el["Source Workspace"] === selectedTopic )
  
   
  
    const labels = currentData.map((el)=>el.keyss)[0]
  
    const chartVal = currentData.map((el)=>el.values)[0]
  
   
  
     
  
     const data = {
  
      labels,
  
        datasets: [
  
          {
  
            label:selectedTopic,
  
            data:chartVal,
  
            borderColor: 'rgb(255, 99, 132)',
  
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
  
          },
  
        ],
  
      };
  
     
  
      // console.log(chartdata)
  
    return(
  
        <div className='chart_div'>
  
        <Line options={options} data={data}  />
  
        </div>
  
    )
  
  }
  
   
  
  export default NewChart