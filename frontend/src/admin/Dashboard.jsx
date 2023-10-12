import React, { useEffect, useState } from 'react'
import {useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridRow, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import axios from 'axios';
import { getGridRowElement } from '@mui/x-data-grid/utils/domUtils';
import { getRowIdFromRowModel } from '@mui/x-data-grid/internals';
import { Typography } from '@mui/joy';
import styled from '@emotion/styled';

export const Dashboard = () => {


  function DataGridTitle() {
    return(
        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h5">Users</Typography>
        </Box>
    )
}
  const {data,loading} = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });
  
  const [products, setproducts] = useState([])
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport 
        printOptions={
          { 
            fileName:"products.csv",
            hideToolbar:true,
            allColumns:true,

        }}
        csvOptions={
         { 
          fileName:  "products"+Date.now(),
          
        
        }
        }
        // printOptions={
        //   {hideToolbar:true, 
        //     allColumns:true,
        //     pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',
        //     fields: [
        //      'id',
        //       'product_name',
        //       'product_price',
        //       'discount_rate',
        //       'is_avail',
        //       'product_desc',
        //       'avail_mtr',

        //     ],
        //   } 
        
        // }
         

      
      />
      </GridToolbarContainer>
    );
  }

    useEffect(()=>{
        axios.get("/admin/getallproducts",{
            headers:{
                token:sessionStorage.getItem("token")
            }
        }).then(resp=>{
            setproducts(resp.data.products)
            console.log(resp.data.products);
        }).catch(err=>{
            console.log("SWR");
        }) 
    },[])
  return (
    <div>
      <br />
      <h1>Dashboard</h1>

      {/* <Box  style={{ height: 250, width: '100%', }}>  */}
      {/* <h1>Products</h1> */}
        <DataGrid title="Products" components={{Toolbar:DataGridTitle}}  loading={loading} autoHeight  sx={{boxShadow:2,border:2, fontSize:20, '@media print': {
      '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
    },
    
  
  }}
    
        columns={[{field: 'id',flex:1}, {field:"product_name",flex:1}, {field:"product_price",flex:1}, {field:"discount_rate",flex:1}, {field:"is_avail",flex:1}, {field:"product_desc",flex:1},{field:"avail_mtr",flex:1}]}
        // rows={products}
     

        slots={{
          toolbar: CustomToolbar,          
          // hideFooter: true,
          // hideToolbar: true,
        }}
        // slotProps={
        //   {
        //     toolbar:{
        //       printOptions:{hideToolbar:true}
        //     }
        //   }
        // }
      
        rows={
        products?.map((product)=>(

          {
              id:product._id,
              product_name:product.product_name,
              product_price:product.product_price,
              discount_rate:product.discount_rate,
              is_avail:product.is_avail,
              product_desc:product.product_desc,
              avail_mtr:product.avail_mtr,
          }  
        
        ))
      }
      // slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
        
         >

          </DataGrid> 
      {/* </Box> */}

      </div>
  )
}
