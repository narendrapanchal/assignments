import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, users } from '../features/usersSlice';
import UserCard from './UserCard';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function UserList() {
    const dispatch=useDispatch();
    const {data,loading, error}=useSelector(users);
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
        {data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
    </>
  );
};

export default UserList;