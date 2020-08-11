import React from "react";
import API from "../util/API";
import "./style.css";


class MainPage extends React.Component {

    state={
        employees:[],
        searchInput: "",
        sortEmp:[],
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
    filter(e){
        this.setState({
            searchInput: e.target.value
        });
    }

    //sort by first name
    sortFirstName(a,b){
        if(a.name.first<b.name.first){
            return -1;
        }
        if(a.name.first>b.name.first){
            return 1;
        }
    }

    onClickFirstName= () =>{
        if(this.state.order===false){
            this.setState({
                sortEmp:this.state.employees.sort(this.sortFirstName),
                order:true
            })
        }
        else{
            this.setState({
                sortEmp:this.state.employees.reverse(),
                order:false
            })
        }

    }
   
   
    render(){

    let employeesFilter=this.state.employees.filter(
        (employee)=>{
            return employee.name.first.toLowerCase().indexOf(this.state.searchInput.toLowerCase())!== -1;
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
                    <input type="text" value={this.state.searchInput} onChange={this.filter.bind(this)}/>
                 </div>
             </div>

             <table className="table">
                 <thead>
                     <tr>
                     <th scope="col"></th>
                     <th scope="col">Image</th>
                     <th scope="col" onClick={this.onClickFirstName}>First Name</th>
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