import React from "react";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, width } from "@mui/system";
import Navbar from "../stores/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

const rows = [
  {
    id: 1,
    name: "dog",
  },
  {
    id: 2,
    disName: "Gujrat Earthquake",
    disCity: "Ahmedabad",
    disState: "Gujrat",
  },
  {
    id: 1,
    disName: "Uttarakhand Floods",
    disCity: "Dehradun",
    disState: "Uttarakhand",
  },
];

const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 300,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "price",
    headerName: "Price",
    width: 300,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 300,
  },
  {
    field: "buy",
    headerName: "Buy",
    width: 300,
  },
];

function BuyItem() {
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loaded) {
      axios.get("http://localhost:5000/store/api/getItems").then((res) => {
        console.log(res);
        for(var i in res.data){
          
        }
        setData(res.data)
      });
    }
  }, []);
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          marginTop: "50px",
          height: "600px",
        }}
      >
        <DataGrid rowHeight={100} rows={data} columns={columns} pageSize={5} />
      </Box>
      <Footer />
    </Box>
  );
}

export default BuyItem;
