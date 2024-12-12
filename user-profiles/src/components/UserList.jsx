import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, users } from '../features/usersSlice';
import UserCard from './UserCard';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EditUser from './EditUser';
function UserList() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId,setcurrentUserId] = useState(null);
  const [search,setSearch]=useState("");
  const {data,loading, error}=useSelector(users);
  const [filteredData,setFilteredData]=useState(data);
  const handleFilter=()=>{
    setFilteredData(data.filter(({name})=>search==""||name.toLowerCase().includes(search.toLowerCase())));
  }

  const handleSearchChange=(e)=>{
    setSearch(e.target.value);
    
  }
  const handleEdit = (index) => {
    setIsOpen(true);
    setcurrentUserId(index);
  };

    const dispatch=useDispatch();
    const handlePopup = () => {
      setIsOpen(!isOpen);
    };
    useEffect(()=>{
      dispatch(fetchUsers())
    },[])
    useEffect(()=>{
      handleFilter()
    },[search])
    
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen loader">
        <AiOutlineLoading3Quarters size={60} />
      
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <>
    <input type='text' value={search} onChange={handleSearchChange}/>
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 black-background">
        {filteredData.map((user,index) => (
          <UserCard key={user.id} user={user} handleEdit={()=>{handleEdit(user.id)}} />
        ))}
      </div>
    </div>
    {isOpen&&<EditUser userData={{...filteredData.find(({id})=>id==currentUserId),currentUserId}} closePopup={handlePopup}/>}
    </>
  );
};

export default UserList;