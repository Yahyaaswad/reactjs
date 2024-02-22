import { useContext, useEffect, useState } from "react"
import { AppContext } from "../components/layout/Layout"
import Api from "../tools/api"
import { Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'


export default function DashCAt(){
    // const appContext = useContext(AppContext)
    const [dashcat, setDashcat] = useState([])

     const getdashcat = async () => {
        // call API                        
        const response = await Api.fetch({ url: 'categories' })
        console.log(response)
        // check response
        if (response != null)
        setDashcat(response.data) // update state with recevied categories
                  
    }
    useEffect(() => {
      // component did mount => get & update categories from back-end        
      if (dashcat.length == 0) getdashcat()
  }, [])
    const showdashcat=dashcat.map((el, index) => (
        <tr key={index}>
        <td>{el.id}</td>
        <td>{el.name}</td>
      </tr>
    ));

   
    return(
        <div  style={{width:'900px'}}  className="table" > 
            <Table striped bordered hover  >
      <thead className="thead-dark">
        <tr>
          <th>id</th>
          <th>Name</th>
     </tr>
      </thead>
      <tbody>
      {showdashcat}
      </tbody>
    </Table>    
        </div>
    );
}