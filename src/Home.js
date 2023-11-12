import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import NewChart from "./NewChart";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Home =()=>{

    const [chartdata,setData] = useState([])
    const [initialChartData,setInitial] = useState([])
    const [labels,setLabels] = useState([])
    // const [chartdata2,setData2] = useState([])
    const [selectedTopic,setSelectedTopic] = useState("")
    const [showChart,setShowChart] = useState(false)

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          console.log(parsedData[0]);
            // setInitial(res)
          setData(parsedData);
          
        };
      }
useEffect(()=>{
  var res = {};
  for (const obj of chartdata) {
      for (const key in obj) {
          res[key] = res[key] ? res[key] + obj[key] : obj[key];
      }
    }
    res["Source Workspace"] = "|Total Open interfaces"
    chartdata.push(res)
    for(let i=0;i<chartdata.length;i++){
      const oldlabel = chartdata[i]["Source Workspace"]
      const last = oldlabel.lastIndexOf("|" )
        const len = oldlabel.length
        const newstring = oldlabel.slice(last+1 ,len  );
        chartdata[i]["Source Workspace"] = newstring
    }
    var label = chartdata.map((el)=>el["Source Workspace"])
    setLabels(label);
    setSelectedTopic(label[label.length-1])
    setShowChart(true)
    console.log(chartdata)
    
},[chartdata])
      // var labels = chartdata.map((el)=>el["Source Workspace"])
      // const labellen = labels.length
      // setSelectedTopic(labels[labellen])
      function selectHandle(e){
        setSelectedTopic(e.target.value)
        setShowChart(true)
      }
    return (
      <div className="div_cover">
        <h2>Process Interfaces Report</h2>
        <div className="report-select_wrap">
          <div className="reportUpload_div">
            <h3>Please select the report : </h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            {showChart ? (
              <div className="select_div">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Workspace
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTopic}
                    onChange={selectHandle}
                  >
                    {labels.map((el, index) => {
                      return (
                        <MenuItem value={el} key={index}>
                          {el}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {showChart ? (
          <NewChart chartdata={chartdata} selectedTopic={selectedTopic} />
        ) : (
          ""
        )}
      </div>
    );
}

export default Home