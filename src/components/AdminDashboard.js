import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function AdminDashboard() {
    const[employees, setEmployees] = useState([]);
    const[notifications, setNotifications] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(()=>{
        const fetchEmployeesAndNotifications = async ()=> {
            try {
                setLoading(true);
                const employeesSnapshot = await getDocs(collection(db, 'users'));
                const notificationsSnapshot = await getDocs(collection(db, 'notifications'));

                setEmployees(employeesSnapshot.docs.map(doc => doc.data()));
                setNotifications(notificationsSnapshot.docs.map(doc => doc.data));
                setLoading(false)
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchEmployeesAndNotifications();
    },[]);

    if(loading){
        return <p> Loading ...</p>
    }

    if(error) {
        return <p> Error fetching: {error.message}</p>
    }


  return (
    <div>
        <h1>Admin Dashborad</h1>
        <h2> Employees</h2>

        <ul>
            {employees.map((employee, index)=> (
                <li key={index}>
                   {employee.email}
                </li>
            
        ))}
        </ul>
        <ul>
            {notifications.map((employee, index)=> (
                <li key={index}>
                    {notifications.message} - {new Date(notifications.timesStamp.toDate()).toLocaleString()}                </li>
            ))}
        </ul>
    </div>
  )
}
