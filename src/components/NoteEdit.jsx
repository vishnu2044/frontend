import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../alertBoxes/ErrorMessage';

const NoteEdit = () => {

    const [noteDetails, setNoteDetails] = useState(null);
    const location = useLocation()
    const noteId = location.state.noteId
    const navigate =  useNavigate()

    const getNoteDetails = async () => {
        try {
          if (noteId){
            let response = await fetch(`http://127.0.0.1:8000/get_single_note/${noteId}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.ok) {
              const data = await response.json();
              setNoteDetails(data);
              
              
            } else if (response.status === 404) {
              console.log('No data present');
              ErrorMessge({ message: 'No data found' });
    
            } else {
              console.log('Error:', response.status);
              ErrorMessge({ message: 'Failed to fetch data' });
            }
  
          }
        } catch (error) {
          console.error('Error:', error);
          ErrorMessge({ message: 'Some error occurred from get notes' });
        }
      };

    useEffect(()=>{
        getNoteDetails()
    }, [noteId])
  return (
    <div>
        <form >
            <div className="grid p-4 ">
                <label  className="text-lg font-semibold text-center text-gray-900 block mb-2">
                  Edit Note
                </label>
                <p></p>
              <div className="mb-4 ">
                <label  className="text-sm font-medium text-gray-900 block mb-2">
                  Title
                </label>
                <input type="text" name="title"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder={noteDetails?.title ? noteDetails?.title : "Edit your title"}
                  value={noteDetails?.title ? noteDetails?.title : "Edit your title"}
                />
              </div>
      
              <div className="col-span-full">
                <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">
                  Body
                </label>
                <textarea rows="8" 
                  placeholder={noteDetails?.title ? noteDetails?.title : "Edit your text body"}
                  value={noteDetails?.title ? noteDetails?.title : "Edit your text body"}
                  name='body'

                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  
                ></textarea>
              </div>
            </div>
            <div className='flex justify-center gap-5'>
                <button className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Save</button>
                <button  className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Back</button>
            </div>
        </form>
    </div>
  )
}

export default NoteEdit