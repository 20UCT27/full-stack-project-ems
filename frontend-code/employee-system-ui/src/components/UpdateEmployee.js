import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import "../components/AddEmployee.css";


function UpdateEmployee(){

        const {id} = useParams();
        const navigate = useNavigate();
        const [employee,setEmployee] = useState(
            {
                id: id,
                firstName:"",
                lastName :"",
                emailId :"",
                mobileNo :"",
                department :"",
                salary :"",
            });

    const handleChange = (e)=>{
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]:value});
    };

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await EmployeeService.getEmployeeById(employee.id);
                setEmployee(response.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchData();
    },[]);

    const updateEmployee = (e) =>{
        e.preventDefault(); 
        console.log(employee); 
        EmployeeService.updateEmployee(employee,id).then((response)=>{
            navigate("/employeeList");
        })
        .catch((error)=>{
            console.log(error);
        });
    };

    return(
        <div className="employee">
            <div className="add-employee">
                <div className="header-add">
                    <h1>Update Employee</h1>
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
                    <button onClick={updateEmployee}>Update</button>
                    <button onClick={()=>navigate("/employeeList")} style={{backgroundColor:"red"}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee;