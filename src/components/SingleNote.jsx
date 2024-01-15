import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { ErrorMessge } from '../alertBoxes/ErrorMessage';
import { SuccessMessage } from '../alertBoxes/SuccessMessage';
import { useLocation, useNavigate, Link } from 'react-router-dom';


const SingleNote = () => {
    let [singleNote, setSingleNote] = useState(null)
    let [deleteAlert, setDeleteAlert] = useState(null)
    const location = useLocation()
    const noteId = location.state?.noteId
    const navigate = useNavigate()

    const getNote = async () => {
        try {
          let response = await fetch(`http://127.0.0.1:8000/get_single_note/${noteId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setSingleNote(data);
            
            
          } else if (response.status === 404) {
            console.log('No data present');
            ErrorMessge({ message: 'No data found' });

          } else {
            console.log('Error:', response.status);
            ErrorMessge({ message: 'Failed to fetch data' });
          }
        } catch (error) {
          console.error('Error:', error);
          ErrorMessge({ message: 'Some error occurred' });
        }
      };

      const deleteAlertBox = () =>{
        if (deleteAlert === null){
          setDeleteAlert("deleteAlert")
        }else{
          setDeleteAlert(null)
        }
      }


      const deleteNote = async () => {
        try {
          console.log(noteId);
      
          // Sending a DELETE request with a trailing slash
          const response = await fetch(`http://127.0.0.1:8000/delete_note/${noteId}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.status);
      
          if (response.status === 200) {
            SuccessMessage({ message: 'Note deleted successfully' });
            navigate('/')
          } else if (response.status === 404) {
            ErrorMessge({ message: 'Note not found!' });
          } else if (response.redirected) {
            console.log('Redirected to:', response.url);
          } else {
            ErrorMessge({ message: 'Delete failed' });
          }
        } catch (error) {
          console.error('Error:', error);
          ErrorMessge({ message: 'Some error occurred' });
        }
      };
      




    useEffect(()=>{
        getNote()
    }, [])
  return (
<>
  {deleteAlert === null ? (
    <div className='p-2 '>
      <div className='bg-gray-300 px-3 py-2 my-3 flex justify-between rounded-lg w-full h-auto'>
        <p className='text-lg font-semibold first-letter:uppercase'>{singleNote?.title ? singleNote?.title : "title"}</p>

        <div className='flex gap-2 text-lg '>
        
          <button title='Delete' onClick={()=>deleteAlertBox()} className='hover:bg-teal-500 hover:shadow-lg rounded-lg p-2 hover:text-white'><MdDelete /></button>

        </div>
      </div>
      <p className='bg-gray-300 px-4 font-medium text-sm py-2 w-full h-auto rounded-lg '>{singleNote?.body ? singleNote?.body : "body"}</p>
      <div className='flex justify-center pt-3'>
        <button onClick={() => navigate('/')} className='bg-teal-500 px-6 py-2 rounded-lg text-white font-medium '>Back</button>
      </div>
    </div>
  ) : (
<div class="border rounded-lg shadow relative m-6">
    <div class="flex justify-end p-2">
        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>

    <div class="p-6 pt-0 text-center">
        <svg class="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this note?</h3>
        <p
            onClick={() => deleteNote()}
            className="text-white bg-red-600 cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            Yes, I'm sure
        </p>

        <p
        onClick={()=>deleteAlertBox()} 
            class="text-gray-900 bg-white cursor-pointer hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center">
            No, cancel
        </p>
    </div>
</div>
  )}
</>

  )
}

export default SingleNote