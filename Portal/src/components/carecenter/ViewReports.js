import React from "react";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, width } from "@mui/system";
import Navbar from "./NavBar";
import { useState,useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";
import NavBar from "./NavBar";




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
    field : 'city',
    headerName : 'City',
    width:300
  },
  {
    field : 'state',
    headerName : 'State',
    width:300
  },
  {
    field : 'photo',
    headerName : 'Photo',
    width  : 200,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            console.log(cellValues)
            window.open("https://ipfs.infura.io/ipfs/"+cellValues.row.photo, "_blank");
          }}
        >
          Show
        </Button>
      );
    }
  },

  {
    field : 'Action',
    headerName : 'Photo',
    width  : 300,
    renderCell: (cellValues) => {
      return (
        <div>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();

            axios.post('http://localhost:5000/animal/api/accept',{
              id:cellValues.row._id,
              acceptedId:localStorage.getItem('id_user'),
            }).then(res=>{
              setTimeout(()=>{
                window.location.href = '/carecenter/viewReport'
              },1000)
            })
          }}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            console.log(cellValues)
            
          }}
        >
          Reject
        </Button>
        </div>
      );
    }
  }
]



function Adoption()  {  
  
  let [data,setData] = useState([]);
  let [loading,setLoading] = useState(true);

  useEffect(()=>{

    axios.get("http://localhost:5000/animal/api/view")
    .then(res=>{
      res = res.data;
      let count = 1;
      res.map((item)=>{
        if (!(item.takenBy =='T')){
          item["id"]  = count++;
        return item
        }
      })
      setData(res);
    })
    .catch(err=>console.log(err))

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
