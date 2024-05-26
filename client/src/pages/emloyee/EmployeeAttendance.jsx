import React from 'react'
import Header from '../../components/Header'

const EmployeeAttendance = ({role}) => {
  return (
    <div>
      
      

      <main>
      <div className="show_emp_data flex justify-around items-center p-4 bg-gray-600">
        <div className="emp_name text-3xl">Suman</div>
        {/* <div className="month">dfsd</div> */}
        <div className="export_excel">
        <button className="btn btn-success">Export to Excel</button>
        </div>
      </div>

      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Day</th>
        <th>Checkin</th>
        <th>Check Out</th>
        <th>Attendance </th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>2/2/2024</td>
        <td>10:02 AM </td>
        <td>5:02 PM </td>
        <td>Present </td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>3/2/2024</td>
        <td>10:02 AM </td>
        <td>5:02 PM </td>
        <td>Present </td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>4/2/2024</td>
        <td>-- -- </td>
        <td>-- -- </td>
        <td>Absent </td>
      </tr>
      {/* row 4 */}
      <tr>
        <th>1</th>
        <td>2/2/2024</td>
        <td>10:02 AM </td>
        <td>5:02 PM </td>
        <td>Present </td>
      </tr>
    </tbody>
  </table>
</div>


      </main>
    </div>
  )
}

export default EmployeeAttendance
