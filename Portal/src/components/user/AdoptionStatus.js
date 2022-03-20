import React from "react";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, width } from "@mui/system";
import Navbar from "./NavBar";
import { useState,useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";

const rows = [{
  id:1,
  name:"German Shepard",
  age:"5",
  status:"Pending"
  
}]  

const columns = [
  {
    field:'id',
    headerName:'ID',  
  },
  {
    field : 'animalId',
    headerName : 'Animal Id',
    width:300
  },
  {
    field : 'status',
    headerName : 'Status',
    width:300
  },
]



function ViewDisaster()  {  
  
  let [data,setData] = useState([]);
  useEffect(()=>{
    axios.post('http://localhost:5000/adoption/api/show',{
      adopterId : localStorage.getItem('id_user')
    }).then(res=>{
      let count = 1;
      res = res.data;
      res.map(item=>{
        item["id"] = count++;
        return item
      })
      console.log(res);
      setData(res)

  })
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
        rows={data}
        columns={columns}
        pageSize={5}
      />
      </Box>
      <Footer/>
    </Box>
  );
}


export default ViewDisaster;
