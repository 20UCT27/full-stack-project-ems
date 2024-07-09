import React, { useState,useEffect } from "react";
import "../components/EmployeeList.css";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Employee from "./Employee";

function EmployeeList(){

    const navigate = useNavigate();
    const[loading , setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);   

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);

            }catch(error){
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    },[]);

    const deleteEmployee = (e,id) =>{
        e.preventDefault();
        EmployeeService.deleteEmployee(id).then((res)=>{
            if(employees){
                setEmployees((prevElement)=>{
                    return prevElement.filter((employee) =>employee.id !==id);
                })
            }
        })
    }
    return(
       <div className="container">
        <div className="index-page">
            <button onClick={()=>navigate("/addEmployee")} className="add-btn">Add Employee</button>
        </div>
        <div className="container-below">
            <table className="record-table">
                <thead>
                    <tr className="table-row">
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"left",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>FirstName</th>
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"left",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>LastName</th>
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"left",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>EmailId</th>
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"left",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>MobileNo</th>
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"left",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>Department</th>
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"left",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>Salary</th>
                        <th style={{color:"gray",fontFamily:"sans-serif",textAlign:"right",textTransform:"uppercase", fontSize:"13px" ,fontWeight:"600"}}>Actions</th>
                    </tr>
                </thead>
                {!loading && (
                <tbody>
                    {employees.map((employee)=>(
                        <Employee employee={employee} deleteEmployee={deleteEmployee} key={employee.id}/>
                    ))}
                </tbody>)}
            </table>
        </div>
       </div>
    )
}

export default EmployeeList;