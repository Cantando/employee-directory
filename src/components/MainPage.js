import React from "react";
import API from "../util/API";


class MainPage extends React.Component {

    state={
        employees:[],
        sortedEmp:[],
        order:false
    }

    //calling for api
    componentDidMount(){
        API.getEmployees()
        .then(data=>{
            this.setState({
                employees:data.data.results
            })
        })
        .catch(err=> console.log(err));
    }

   render(){
       return(
        <>

        </>
       )
   }
};


export default MainPage;