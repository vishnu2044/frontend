import React, { useEffect, useState } from 'react';
import { MdDelete, MdDifference } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../alertBoxes/ErrorMessage';
import { SuccessMessage } from '../alertBoxes/SuccessMessage';

const NoteList = () => {
    const navigate = useNavigate()
    let [notes, setNotes] = useState(null)

    const getNotesData = async () =>{
        try{
            let response = await fetch(`http://127.0.0.1:8000/get_notes/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });   
            if (response.status === 200){
                setNotes(await response.json())

            }else if (response.status === 401){
                ErrorMessge({message : "Notes are empty"})
            }

        } catch (error) {
          console.error('Error:', error);
          ErrorMessge({ message: 'Some error occurred' });
          
        }
    }



    useEffect (()=>{
        getNotesData()
    }, [])

  return (
    <div>

            <div class="px-2 pb-2 w-full">
                <div className='flex justify-end w-full'>
                    <button onClick={()=>navigate("/addnote")} className=' px-6 py-1 bg-teal-500 mb-2 rounded-md text-base font-medium '>Add new</button>
                </div>
                {
                    notes && notes.length >  0 ?
                    <div>
                        {
                            notes.map((note) =>(

                                <div class="bg-gray-200 rounded flex px-4 py-2 my-2  h-full items-center justify-between">
                                    <div className='flex justify-between'>
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                            class="border-teal-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span class="font-medium">{note.title}</span>

                                    </div>
                                    <div className='flex gap-2 text-lg '>
                                        <button onClick={()=>navigate('singlenote', {state : {noteId : note.id }} )} title="Open" className='hover:bg-teal-500 hover:shadow-lg rounded-lg p-2 hover:text-white'><FaEnvelopeOpenText /></button>
                                        <button onClick={() => navigate('/editnote', { state: { noteId: note.id } })} title="Edit" className='hover:bg-teal-500 hover:shadow-lg rounded-lg p-2 hover:text-white'><MdModeEdit  /></button>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                :
                <p>no data present</p>
                }
            </div>

    </div>
  )
}

export default NoteList