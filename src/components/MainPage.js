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
            console.log(data.data.results);
            this.setState({
                employees:data.data.results
            })
        })
        .catch(err=> console.log(err));
    }

   render(){

    let employeesFilter=this.state.employees.filter(
        (employee)=>{
            return employee.name.first;
        }
    )
       return(
        <>
             <div className="jumbotron jumbotron-fluid">
                 <div className="container">
                     <h1>
                         Your Employee Directory
                     </h1>
                    <label>Search for your Employees:</label>
                    <br/>
                    <input type="text" />
                 </div>
             </div>

             <table className="table">
                 <thead>
                     <tr>
                     <th scope="col"></th>
                     <th scope="col">Image</th>
                     <th scope="col">First Name</th>
                     <th scope="col">Last Name</th>
                     <th scope="col">Email</th>
                     <th scope="col">Phone Number</th>
                     <th scope="col">Age</th>
                     </tr>
                   
                 </thead>
                 <tbody>
                    {employeesFilter.map((employee,index)=>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td><img src={employee.picture.medium} alt="employeee"/> </td>
                            <td>{employee.name.first}</td>
                            <td>{employee.name.last}</td>
                            <td>{employee.email}</td>
                            <td>{employee.cell}</td>
                            <td>{employee.dob.age}</td>
                        </tr>
                    ))}
                 </tbody>
             </table>
        </>
       )
   }
};


export default MainPage;