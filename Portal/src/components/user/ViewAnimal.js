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
    headerName : 'Animal Name',
    width:300
  },
  {
    field : 'age',
    headerName : 'Age',
    width:300
  },
  {
    field : 'description',
    headerName : 'Description',
    width:300
  },
  {
    field : 'type',
    headerName : 'Type',
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
            axios.post("http://localhost:5000/adoption/api/create",{
                animalId:cellValues.row._id,
                adopterId:localStorage.getItem('id_user'),
                adoptionCenterId:localStorage.getItem('carecenterid'),
                documentUrl:localStorage.getItem('document')
            })
          }}
        >
          Request
        </Button>
      );
    }
  }
]



function ViewAnimal()  {  
  
  let [data,setData] = useState([]);
  let [document,setDocumentUrl] = useState([]);
  useEffect(()=>{
    axios.post('http://localhost:5000/animals/api/show',{
      id:localStorage.getItem('carecenterid')
    }).then(res=>{
        console.log(res);
        res = res.data;
        let count = 0
        res.map(item=>{
            item["id"] = count++;
            return item 
        })

        setData(res);
  })
  axios.post('http://localhost:5000/user/api/show',{
        id_user:localStorage.getItem('id_user')
    }).then(res=>{
        res = res.data[0];
        console.log(res.verificationDocument);
        localStorage.setItem('document',res.verificationDocument);
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


export default ViewAnimal;
