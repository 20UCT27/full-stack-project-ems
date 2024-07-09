import React, { useState  } from "react" ;
import "../components/AddEmployee.css";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function AddEmployee(){

    const [employee,setEmployee]=useState({
        id:"",
        firstName:"",
        lastName :"",
        emailId :"",
        mobileNo :"",
        department :"",
        salary :"",
    })

    const navigate = useNavigate();
    const handleChange = (e)=>{
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]:value});
    };

    const saveEmployee = (e)=>{
        e.preventDefault();
        EmployeeService.saveEmployee(employee).then((response)=>{
            console.log(response);
            navigate("/employeeList");
        }).catch((error)=>{
            console.log(error);
        })
    };
    
    const reset = (e)=>{
        e.preventDefault();
        setEmployee({
            id:"",
            firstName:"",
            lastName :"",
            emailId :"",
            mobileNo :"",
            department :"",
            salary :"",
        })
    }

    return(
        <div className="employee">
            <div className="add-employee">
                <div className="header-add">
                    <h1>Add New Employee</h1>
                </div>
                <div className="from-details">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={employee.firstName} onChange={(e)=>handleChange(e)}></input>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={employee.lastName}onChange={(e)=>handleChange(e)}></input>
                    <label>E-Mail</label>
                    <input type="email" name="emailId" value={employee.emailId} onChange={(e)=>handleChange(e)}></input>
                    <label>Mobile No</label>
                    <input type="number" name="mobileNo"  value={employee.mobileNo} onChange={(e)=>handleChange(e)}></input>
                    <label>Department</label>
                    <input type="text" name="department" value={employee.department} onChange={(e)=>handleChange(e)}></input>
                    <label>Salary</label>
                    <input type="number" name="salary" value={employee.salary} onChange={(e)=>handleChange(e)}></input>
                    <button onClick={saveEmployee}>Save</button>
                    <button style={{backgroundColor:"red"}} onClick={reset}>Clear</button>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;