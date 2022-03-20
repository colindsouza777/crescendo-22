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



function BuyItem() {
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState([]);

  const [buyItems, setBuyItem] = useState({});

  const columns = [
    {
      field: "id",
      headerName: "Store Id",
      width: 280,
    },
    {
      field: "product_id",
      headerName: "Product Id",
      width: 280,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "buy",
      headerName: "Buy",
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              console.log(e) 
              console.log(cellValues.row) 
              buyItem(cellValues)
          //     var index = data.findIndex(function(o){
          //       return o.product_id === cellValues.product_id;
          //  })
          //  const newData = delete data[index]
          //  console.log(newData)
              // setData(data.splice(index, 1))
            }}
          >
            Donate
          </Button>
        );
      }
    },
  ];

  const buyItem = (values) => {
    const price = values.quantity * values.price
    const data = {
      product_id:values.product_id,
      id:values.id,
      price:price,
      user_id:"622f6c17b36a3334f84fcee4"
    } 
    axios.post("http://localhost:5000/store/api/purchaseItem", data).then((res) => {
        console.log(res)
      });
  }

  useEffect(() => {
    if (loaded) {
      axios.get("http://localhost:5000/store/api/getItems").then((res) => {
        console.log(res);
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
