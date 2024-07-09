import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/EmployeeList.css";

function Employee({employee,deleteEmployee}) {

    const navigate = useNavigate();
    
    const editEmployee = (e,id) =>{
        e.preventDefault();
        navigate(`/editEmployee/ ${id}`);
    }

    return(
        <tr key={employee.id}>
        <td><div className="data-entry">{employee.firstName}</div></td>
        <td><div className="data-entry">{employee.lastName}</div></td>
        <td><div className="data-entry">{employee.emailId}</div></td>
        <td><div className="data-entry">{employee.mobileNo}</div></td>
        <td><div className="data-entry">{employee.department}</div></td>
        <td><div className="data-entry">{employee.salary}</div></td>
        <td className="data-action">
            <a onClick={(e,id) => editEmployee(e,employee.id)} style={{color:"indigo",textDecoration:"none",cursor:"pointer"}}>Edit</a>
            <a onClick={(e,id)=>deleteEmployee(e,employee.id)} style={{color:"indigo",textDecoration:"none",paddingLeft:"10px",cursor:"pointer"}}>Delete</a>
        </td>
    </tr>
    )
}

export default Employee;