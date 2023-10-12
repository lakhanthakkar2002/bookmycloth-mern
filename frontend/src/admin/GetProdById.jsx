import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SideNav from './designComp/SideNav';

export const GetProdById = () => {
    const [products, setproducts] = useState([])
    const id = useParams()._id;
    // console.log(id);    
    useEffect(()=>{
        document.title="Product Details"; 
        axios.get("/admin/getproductbyid/"+id,{
            headers:{
                token:sessionStorage.getItem("token")
            }
        }).then(resp=>{
            console.log(resp.data.product);
            console.log(resp.data.product.colors);
            setproducts(resp.data.product)
            // console.log(resp.data.products);
        }).catch(err=>{
            console.log(err);
            console.log("SWR");
        }) 
    },[]);

    return (
    <div>
        <SideNav/>
        <br /><br /><br />
        <h3>More Detail About Product</h3>
        <table  align='center' className='table table-bordered'>
          
                <tr>
                    <th>id</th>
                    <th>{products._id}</th>
                </tr>
                <tr>
                    <th>HSN Code </th>
                    <th>{products.hsn_code}</th>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <th>{products.product_name}</th>
                </tr>
                <tr>
                    <th>Product Price</th>
                    <th>{products.product_price}</th>
                </tr>
                <tr>
                    <th>color</th>
                    <th>
                    {
                        products?.colors?.map((color)=>{
                            return color + " , "
                        })
                    }
                    </th>
                </tr>
                <tr>
                    <th>Discount Rate</th>
                    <th>{products.discount_rate}</th>
                </tr>
                <tr>
                    <th>Available meters </th>
                    <th>
                        {products.avail_mtr}
                    </th>
                </tr>
                <tr>
                    <th>Brand </th>
                    <th>{products?.brand_id?.brandName}</th>
                </tr>
                <tr>
                    <th>Category </th>
                    <th>{products?.subcat_id?.cat_id?.category_name}</th>
                </tr>
                <tr>
                    <th>Sub Category </th>
                    <th>{products?.subcat_id?.subcat_name}</th>
                </tr>
                <tr>
                    <th>Product Description</th>
                    <th>{products.product_desc}</th>
                </tr>
                <tr>
                    <th>CGST Rate </th>
                    <th>{products.cgst_rate}</th>
                </tr>
                <tr>
                    <th>SGST Rate </th>
                    <th>{products.sgst_rate}</th>
                </tr>
                <tr>
                    <th> IMAGES </th>
                    <th>
                        {
                            products?.images?.map((image)=>{
                                console.log(image);
                                return <img src={ require("../../src/public/images/"+ image )} alt="image" style={{width:"100px",height:"100px"}}/>
                            })
                        }
                    </th>
                </tr>

        </table>

    </div>
  )
}
