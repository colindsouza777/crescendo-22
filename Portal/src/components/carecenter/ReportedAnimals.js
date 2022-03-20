import React from "react";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, width } from "@mui/system";
import Navbar from "../stores/NavBar";
import { useState,useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";

const rows = [{
  id:1,
  name:"German Shepard",
  age:"5"
  
},
{
    id:2,
    name:"German Shepard",
    age:"3"
    
  },
  {
    id:3,
    name:"German Shepard",
    age:"1"
    
  },
]  

const columns = [
  {
    field:'id',
    headerName:'ID',  
  },
  {
    field : 'name',
    headerName : 'Animal Name',
    width:300
  },
  {
    field : 'age',
    headerName : 'Age',
    width:300
  },
  {
    field : 'Request',
    headerName : 'Request',
    width  : 400,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            alert('Request Sended')  
          }}
        >
          Show
        </Button>
      );
    }
  }
]



function ReportedAnimals()  {  
  
  let [data,setData] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/care/api/reportedAnimals')
    // .then(res=>{
    //   })
},[])
  return (

    <Box>
    <Navbar/>
    <Box sx={{
      'marginTop':"50px",
      'height':"600px",
    }}>
      <DataGrid
        rowHeight={100}
        rows={rows}
        columns={columns}
        pageSize={5}
      />
      </Box>
      <Footer/>
    </Box>
  );
}


export default ReportedAnimals;
