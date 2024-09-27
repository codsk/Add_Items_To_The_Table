import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import React, { useEffect, useState} from 'react'

function App() {
  const [formData, setFormData] = useState({ itemName: '', category: 'Select Category', amount: '' });
  const [data,setData]=useState([])
  const [,setTableCategory]=useState('')
  const [sort,setSort]=useState(true)
  const [fData,setFData]=useState([])

  const postData=async ()=>{
    await axios.post('http://localhost:7000/api/formData',formData)
  }
  const getData= async ()=>{
    await axios.get('http://localhost:7000/api/formData')
    .then((res)=>{
      setData(res.data)
      setFData(res.data)
    })
    .catch((err)=>console.log(err))
  }
  const handleSubmit=async ()=>{
     await postData()
     setFormData({ itemName: '', category: 'Select Category', amount: '' });
     await getData()
  
  }
  const handleTable= (e)=>{
    setTableCategory(e.target.value)
    e.target.value ? setFData(data.filter((item)=>item.category===e.target.value)) : setFData(data)
  }

  const sortData=()=>{
    setFData([...fData].sort((a,b)=>(sort?a.amount-b.amount:b.amount-a.amount)))
    setSort(!sort)
  }
 
  useEffect(()=>{
    getData()
  },[])

  const handleInputs=e=>{
    const {name,value}=e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }
  return (
    <>
    <div className="container mt-5">
      <div className="row ">

        <div className="col-lg col-md bg-danger p-5">
          <div className="form-group d-flex flex-column">

            <label htmlFor="" className='form-label mt-2'>Item Name</label>
            <input type="text" name="itemName" value={formData.itemName} className="form-input" onChange={handleInputs}/>

            <label htmlFor="" className="my-2">Category</label>
            <select name="category" id="category" value={formData.category} onChange={handleInputs}>
              <option  hidden>Select Category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Non-veg">Non-veg</option>
            </select>

            <label htmlFor="" className='form-label mt-2'>Amount</label>
            <input type="text " name="amount" className="form-input" value={formData.amount} onChange={handleInputs}/>
            
          </div>
          {
            (formData.itemName && formData.category && formData.amount)? <button className="btn btn-primary my-3" onClick={handleSubmit}>Submit</button> : <button className="btn btn-primary my-3" disabled >Submit</button>
          }         
        </div>

        <div className="col-lg col-md bg-success p-5">
        <table className='table'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>
              <select name="category" id="category" onChange={(e)=>handleTable(e)}>
              <option value="">All Category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Non-veg">Non-veg</option>
              </select></th>
              <th><button className='btn' onClick={sortData}>Amount</button></th>
            </tr>
          </thead>
          
          <tbody>
            
            {fData.map((item)=>(
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.amount}</td>
                </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
