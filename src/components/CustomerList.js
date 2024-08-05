import React, { useEffect, useState } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
export default function CustomerList() {
    const[customers, setCustomes] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[page, setPage] = useState(1);
    const[searchTerm, setSearchTerm] = useState('');
    const[selectedCustomers, setSelectedCustomers] = useState([]);

    useEffect(()=>{
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/users?per_page=10&since=11');
                const data = await response.json();
                setCustomes(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchCustomers();
    }, [page]);

    if(loading){
        return <p>loading ...</p>
    }
    if(error){
        return <p>Error  data: { error.message}</p>;
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectedCustomer = (customer) => {
        setSelectedCustomers(prevSelected => {
            if(prevSelected.includes(customer)) {
                return prevSelected.filter(c => c !== customer);
            }else {
                return [...prevSelected, customer];
            }
        });
    }
    const handleMarkAsFollowed = async( )=>{
        try {
            const notificationRef = collection(db, 'notifications');
            await addDoc(notificationRef, {
                message: `${selectedCustomers.length} customers followed`,
                Timestamp: new Date(),
                customers: selectedCustomers.map(c => c.login)
            });
            alert(`${selectedCustomers.length} cutomers followed`);
            setSelectedCustomers([]);
        } catch (error) {
            alert(`Error sending notification: ${error.message}`);
        }
    }

    const filteredCustomers = customers.filter(customer => customer.login.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div>
        <input type='text' placeholder='Search customers' value={searchTerm} onChange={handleSearch} />
        <button onClick={handleMarkAsFollowed}>Mark as Followed</button>
        <p>{selectedCustomers.length} customers selected</p>
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Username</th>
                    <th>Profile Picture</th>
                </tr>
            </thead>
            <tbody>
                {filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td><input type='checkbox' checked={selectedCustomers.includes(customer)} onChange={() => handleSelectedCustomer(customer)} /></td>
                        <td>{customer.login}</td>
                        <td><img src={customer.avatar_url} alt={customer.login} width="50" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
        <button disabled = {page === 1} onClick={()=> setPage(page-1)}>Previous</button>
        <button onClick={() => setPage(page +1)}>Next</button>
        </div>
    </div>
   
  )
}
