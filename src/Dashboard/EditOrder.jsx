import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/layout/Layout";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import Api from "../tools/api";
import { Button, Form } from "react-bootstrap";
import './dashboard.css'




export default function EditOrder({orders,products}){
    console.log(orders)

      const navigate = useNavigate();

    // init app state
    const appContext = useContext(AppContext)

    // init local state
    const [state, setState] = useState({
        orders : -1,
        products:[{
           id : 0,
           qty : 0
        }]
       });
  
    const [cookie, setCookie] = useCookies('token')
    const [loading, setLoading] = useState(false)

    let token

    const updateorder = async () => {
        token = appContext.appState.token != null ? appContext.appState.token : cookie?.token

        // check if we have token or not        
        if (token == null || token == '') return;

        // show loading
        setLoading(true)
      

        // calling API
        let params
        const response = await Api.fetch({
            url: 'orders',
            params: params,
            token,
            body: state,
            method: 'PUT',
            showPopup: appContext.showPopup,
        })
       
console.log(response)
        // check API Response        
        if (response != null) {
            // show message
            appContext.showPopup(response.message)
           navigate('/dashboard/DashOrd');
            // save token (appState - Cockies)
            if (response.token != null) {
                appContext.login(response.token, null)
                setCookie('token', response.token)

                // redirect to pro                
                window.location.href = '/'
             
            }
        }
    }

    return (
        <div className='login-page'>
            <h1> Update  Order</h1>
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>order_id</Form.Label>
                    <Form.Select type="text" placeholder="Enter order_id"
                        onChange={(e) => {
                            setState({ ...state,order:e.target.value})
                        }}>
                          {(orders == null || orders.length == 0)?
                     <option >No order</option>
                      : orders.map((el)=>{
                       return <option value={el.id} key={el.id}>
                        {el.products[0].product_object.name} : {el.products[0].qty}</option>
                     })
                     }
                 </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>product_id</Form.Label>
                    <Form.Select type="text" placeholder="Enter product_id"
                        onChange={(e) => {
                            setState({ ...state,  products: [{ ...state.products[0], id: e.target.value }]})
                        }}>
                        {(products == null || products.length == 0)?
                     <option >No Product</option>
                      : products.map((el)=>{
                       return <option value={el.id} key={el.id}>{el.name}</option>
                     })
                     }
                  
                       
           </Form.Select>
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>qauntity</Form.Label>
                    <Form.Control type="text" placeholder="enter Quantity"
                        onChange={(e) => {
                            setState({ ...state, products: [{ ...state.products[0], qty: e.target.value }] })
                        }}
                    />
                </Form.Group>

                <Button onClick={(e) => {
                    e.preventDefault()
                    updateorder()
                   
                }} variant="primary" type="submit">
                    update
                </Button>
            </Form>
        </div>
    );
}