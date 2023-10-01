import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import { useGetAllProducts } from '../query/AdminQuery';
import axios from 'axios';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import MainCard from './MainCard';

// project import

export const Dashboard = () => {

    // const navigate=useNavigate();
    const {data,isLoading,isError,mutate,isIdle}=useGetAllProducts();


    // useEffect(()=>{
    // //   mutate();
    //     console.log("data : ",data);
    //     console.log("isloading : ",isLoading);
    //     console.log("iserror : ",isError);
    //     console.log("isidle : ",isIdle);
    // },[data,isLoading]);

    // async function getprod(){
    //     let  res=await axios.get("http://localhost:5000/api/admin/getallproducts",{
    //         headers:{
    //             "Content-Type": "application/json",

    //           "token":sessionStorage.getItem("token")
    //         }
    //  });
    //  console.log(res.data.data); 
    // }

    const [products, setproducts] = useState([])


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
    <MainCard>
    <Typography variant="body2">
        <Sidebar/>
      
        <h1>DashBoard</h1>
       

        <DataGrid autoHeight columns={[{ field: 'ID' },{field:"ProductName"},{field:""}]}
        rows={[]}
        sx={{ '--DataGrid-overlayHeight': '300px' }}
        >
        </DataGrid>



</Typography>
</MainCard>
  )
}
