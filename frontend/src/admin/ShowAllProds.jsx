import React, { useEffect, useState } from 'react'
import SideNav from './designComp/SideNav'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fontGrid } from '@mui/material/styles/cssUtils';
// import p1 from './p1.png'
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
// import {} "../../images/"

const columns = [
    {
        name: 'id',
        selector: row => row.id,
    },
    {
        name: 'Product Name',
        selector: row => row.pname,
    },
    {
        name: 'Price',
        selector: row => row.pprice,
    },
    
    {
        name: 'Colors',
        selector: row => row.pcolors,
    },
    {
        name: 'Image',
        selector: row => row.pimage,
    },
    {
        name: 'More Info',
        selector: row => row.moreinfo,
    },
    
];

const customeStyle={
    rows:{
       style:{
            //   minHeight:'72px', // override the row height
              fontSize:'17px',
       }
    },
    headCells:{
        style:{
            //   minHeight:'72px', // override the row height
              fontSize:'17px',
       }
    },
    }

export const ShowAllProds = () => {

    


    const [products, setproducts] = useState([])

    useEffect(()=>{
        document.title="All Products"; 

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

        // data.map((product) => () => {




        // })
    <div>
 {/* <DataTable
 columns={columns}
 data={data}
 



 
 /> */}
 <SideNav />
 <br />
 <br />
 <DataTable 
            customStyles={customeStyle}
            title="Products"
            columns={columns}
            data={products?.map((product) => ({

                id: product._id,
                pname: product.product_name,
                pprice: product.product_price,
                pcolors:product.colors,
                pimage:<img src={ require("../../src/public/images/"+product.images[1])} height="100"/> ,
                moreinfo:<Link to={"/admin/getprodbyid/"+product._id}>More Info</Link>

            }))}
            selectableRows
        />

        {/* <img src="p1.png" alt="" /> */}



    </div>

  )
}
