import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { IoCallOutline,IoHeartSharp,IoHeartOutline } from "react-icons/io5";
import { MdOutlineMailOutline,MdDelete } from "react-icons/md";
import { deleteUser } from '../features/usersSlice';
import { useDispatch } from 'react-redux';
const UserCard = ({ user,handleEdit }) => {
  const [liked,setLiked]=useState(false);
  const dispatch=useDispatch();
  const handleLike=()=>{
    setLiked(!liked);
  }
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 m-auto">
      <div className='bg-gray-100'>

      <img
        className="m-auto h-40 object-cover "
        src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`}
        alt={`${user.name}'s avatar`}
        />
        </div>
      <div className="p-4 user-data">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600"><MdOutlineMailOutline/> {user.email}</p>
        <p className="text-gray-600"><IoCallOutline className='rotate-270'/>  {user.phone}</p>
        <p className="text-gray-600"><img src="./browser.png" alt="browser" height={20} width={25} />{user.website}</p>
      </div>
      <div className='flex justify-between p-4 pl-8 pr-8 bg-gray-100 icons'>
        <button onClick={handleLike}>{liked?<IoHeartSharp className='liked' />:<IoHeartOutline/>}</button>
        <button onClick={handleEdit}><CiEdit className='hover:text-blue-500'/></button>
        <button onClick={()=>{
          dispatch(deleteUser(user.id))
        }}><MdDelete className='hover:text-blue-500'/></button>
      </div>
    </div>
  );
};

export default UserCard;
