import { useContext, useEffect, useState } from "react"
import { AppContext } from "../components/layout/Layout"
import Api from "../tools/api"
import { Card, Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'
import DashOrd from "./DashOrd";
import NewOrder from "./NewOrder";
import EditOrder from "./EditOrder";
import OrderState from "./OrderState";

export default function Dashprod(){
    const appContext = useContext(AppContext)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        // call API
        let params
        if (appContext.appState.search != null) {
            params = { name: appContext.appState.search }
        }
        if (appContext.appState.category != null) {
            params = { ...params, category: appContext.appState.category }
        }
        const response = await Api.fetch({
            url: 'products', params: params,
        })
        console.log(response)
          // check response
          if (response != null) {
            const productsRes = []
            if (response.data != null) {
                for (const keyIndex in response.data) {
                    // object: key - array: index
                    productsRes.push(response.data[keyIndex])
                }
            }
            setProducts(productsRes) // update state with recevied products       
        }}
         // set effect functionalities
    useEffect(() => {
        // component did mount => get & update categories from back-end        
        
        getProducts()
    }, [])
  
    return(<>   
   
   
     <div  style={{width:'900px'}} className="table"> 
        <Table striped bordered hover  >
  <thead className="thead-dark">
    <tr>
      <th className="th">id</th>
      <th className="th">Name</th>
      <th className="th">description</th>
      <th className="th">price</th>
      <th >Image</th>
   
 </tr>
  </thead>
  <tbody >
  {products.map((el,index)=>(
       <tr key={index}>
       <td className="td">{el.id}</td>
       <td className="td">{el.name}</td>
       <td className="td">{el.description}</td>
       <td className="td">{el.price}</td>
       <td><Card.Img  variant="top" className="proimg" src={el.image} /></td>
     </tr>
  )

  )}
  </tbody>
</Table>  
  


    </div>
   
   
    <DashOrd products={products}/>
   
  
    </>

    );
}