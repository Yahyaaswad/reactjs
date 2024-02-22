import { useContext, useEffect, useState } from "react"
import { AppContext } from "../components/layout/Layout"
import Api from "../tools/api"
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"
import { Link, Outlet } from "react-router-dom"
import './dashboard.css'
import EditOrder from "./EditOrder"
import OrderState from "./OrderState"

import Dashprod from "./DashProd"

export default function DashOrd({products}){
 
// console.log(products)
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
    const appContext = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [cookie, setCookie] = useCookies('token')
    let token
    

    const getorders = async () => {
        token = appContext.appState.token != null ? appContext.appState.token : cookie?.token

        // check if we have token or not        
        if (token == null || token == '') return;

        // show loading
        setLoading(true)
        // call API
      let params
        const response = await Api.fetch({
            url: 'orders', params: params, token
           
        })
        console.log(response)
          // check response
          if (response != null) {
            const productsRes = []
            if (response.order != null) {
                for (const keyIndex in response.order) {
                    productsRes.push(response.order[keyIndex])
                }
            }
            setOrders(productsRes) // update state with recevied products       
        }}
         
    useEffect(() => { 
        getorders()
    }, [])
  
  
    return(
        <> 
        

        <div  style={{width:'900px'}} className="table"> 
        <Table striped bordered hover  >
  <thead className="thead-dark">
    <tr>
      <th className="th">order_id</th>
      <th className="th">order_name</th>
      <th className="th">category_id</th>
      <th className="th">category_name</th>
      <th className="th">user_id</th>  
      <th className="th">qauntity</th>
      <th className="th">price</th>
      <th className="th">total</th>
      <th className="th">date</th>
     
   
 </tr>
  </thead>
  <tbody >
  {orders.map((el,index)=>(
       <tr key={index}>
       <td className="td">{el.id}</td>
       <td className="td">{el.products[0].product_object.name}</td>
       <td className="td">{el.products[0].product_object.categoryname}</td>
       <td className="td">{el.products[0].product_object.category}</td>

       <td className="td">{el.user_id}</td>
       <td className="td">{el.products[0].qty}</td>
       <td className="td">{el.products[0].product_object.price}</td>
       <td className="td">{el.total}</td>
       <td className="td">{el.date}</td>
     
      
     </tr>
  )

  )}
  </tbody>
</Table> 
     </div>
     <Link
        to='/dashboard/EditOrder'
        className={`${activeButton === 'newOrderButton' && 'active'}`}
        onClick={() => handleButtonClick('newOrderButton')}
      >
          <button className="newOrderButton">update old order</button> 
      </Link>
     <Link
        to='/dashboard/NewOrder'
        className={`${activeButton === 'updateOrderButton' && 'active'}`}
        onClick={() => handleButtonClick('updateOrderButton')}
      >
          <button to className="updateOrderButton">creat new order</button>
      </Link>

      <EditOrder orders={orders} products = {products}/>     
     </>
    
    );
}