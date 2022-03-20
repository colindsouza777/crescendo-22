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
    headerName : 'Center Name',
    width:300
  },
  {
    field : 'address',
    headerName : 'Address',
    width:300
  },
  {
    field : 'Request',
    headerName : 'Check',
    width  : 400,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            console.log(cellValues)
            localStorage.setItem('carecenterid',cellValues.row._id)
            window.location.href='/user/viewanimal'
          }}
        >
          Show
        </Button>
      );
    }
  }
]



function Adoption()  {  
  
  let [data,setData] = useState([]);
  let [loading,setLoading] = useState(true);
  useEffect(()=>{
    if(loading){
      axios.post('http://localhost:5000/care/api/showall')
      .then(res=>{
        let count = 0;
        setLoading(false);
        res = res.data;
        res.map(item=>{
          item["id"] = count++;
          return item
        })
        setData(res);
    })
    }
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


export default Adoption;
