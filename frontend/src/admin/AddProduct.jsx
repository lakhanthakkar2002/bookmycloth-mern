import React, { useEffect, useState } from 'react'
import SideNav from './designComp/SideNav'
import { create } from '@mui/material/styles/createTransitions'
import { CssBaseline,  FilledInput,  TextField, createTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from '@emotion/react'
import { Box, Container, Typography } from '@mui/material'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'

export const AddProduct = () => {

  const [brands, setbrands] = useState([])
  const [categories, setcategories] = useState([])
  const [subcategories, setsubcategories] = useState([])
  useEffect( () => {
    document.title = 'Add Product';
    console.log(sessionStorage.getItem('token'));
    axios.get('admin/getallbrands',{
        headers:{
          token:sessionStorage.getItem('token')
        }
      
    }).then(brands=>{
      console.log(brands.data.data);
      setbrands(brands.data.data)
    }).catch(branderr=>{
      console.log(branderr);
    })

    axios.get('admin/getallcategories',{
      headers:{
        token:sessionStorage.getItem('token')
      }

    }).then(categories=>{
      console.log("cat  :",categories.data.data); 
      setcategories(categories.data.data)


    }).catch(categoryerr=>{
      console.log(categoryerr);
    })

}, [])
  // const defaultTheme = createTheme();
  // const {register,handleSubmit} = useForm();

  const styles = {
  "#div":{
    "border": "5px solid",
    "margin": "auto",
    "width": "50%",
    "padding": "10px"
  
  }
  }

  function subcat(event){
    console.log("Sub cat id ,,,,,",event.target.value);

    axios.get('admin/getsubcatbycatid/'+event.target.value,
    {
      headers:{
        token:sessionStorage.getItem('token')
      }
    }
    ).then(subcat=>{
      console.log("subcat  :",subcat.data.subcategory); 
      setsubcategories(subcat.data.subcategory)
    }
      ).catch(subcaterr=>{
      console.log(subcaterr);
    })

      // setcategories(categories.data.data)

  }
  return (
    <div >
      <SideNav/>
      <br /><br /><br />

<h1 >Add Product</h1>
   <hr /><br />

    
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Product Name </label>
          <input type="text" className='form-control' />
        </div>
      </div>


      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Product Price </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>


      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Product Rate </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>

<div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Available Meters </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>
      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Available Quantity  </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>
      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> CGST Rate </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>
      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> SGST Rate </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>
      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> IGST Rate </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>
      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Images </label>
          <input type="file" className='form-control' style={{}}  multiple/>
        </div>
      </div>
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> HSN Code </label>
          <input type="number" className='form-control' style={{}} />
        </div>
      </div>
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Product Description </label>
          <textarea className='form-control' style={{}} />
        </div>
      </div>

      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Select Brand </label>

          <select className='form-control' style={{}}>
            <option value="" disabled selected >Select Brand</option>
            {
              brands?.map((brand)=>{
                return(

                  <option value={brand._id}>{brand.brandName}</option>
                )
              })
            }
            </select>
            
        </div>
      </div>

      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Select Category </label>

          <select className='form-control' style={{}} onChange={subcat}>
            <option value="" disabled selected>Select Category</option>
            {
              categories?.map((category)=>{
                return(
                  <option value={category._id} >{category.category_name}</option>
                )
              })
            }
            </select>
            
        </div>
      </div>
      

      
      <div className='form-row' style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
        <div className='form-group col-md-6'>
          <label htmlFor=""> Select Sub-Category </label>

          <select className='form-control' style={{}}>
            <option value="" disabled selected >Select Sub-Category</option>
            {
                subcategories?.map((subcat)=>{
                return(

                  <option value={subcat._id}>{subcat.subcat_name}</option>
                )
              })
            }
            </select>
            
        </div>
      </div>


      </div>
  )
}
