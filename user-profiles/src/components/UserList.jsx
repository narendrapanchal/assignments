import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, users } from '../features/usersSlice';
import UserCard from './UserCard';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EditUser from './EditUser';
function UserList() {
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex,setEditIndex] = useState(null);
  const handleEdit = (index) => {
    setIsOpen(true);
    setEditIndex(index);
  };

    const dispatch=useDispatch();
    const {data,loading, error}=useSelector(users);
    const handlePopup = () => {
      setIsOpen(!isOpen);
    };
    useEffect(()=>{
      dispatch(fetchUsers())
    },[])
    
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen loader">
        <AiOutlineLoading3Quarters size={60} />
      
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((user,index) => (
          <UserCard key={user.id} user={user} handleEdit={()=>{handleEdit(index)}} />
        ))}
      </div>
    </div>
    {isOpen&&<EditUser userData={data[editIndex]} closePopup={handlePopup}/>}
    </>
  );
};

export default UserList;