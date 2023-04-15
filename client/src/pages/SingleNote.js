import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import axios from 'axios'
import './css/singlenote.css'
import { useParams, useNavigate, Link } from 'react-router-dom'

function SingleNote() {
    const [color,setColor] = useState('palegreen')
    const [noteData, setNoteData] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
		async function fetchData() {
			try{
				if(id) {
					const response = await axios.get(`http://localhost:6060/api/notes/single/${id}`)
					const data = await response.data
					setNoteData(data.note)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchData()
	}, [id])

    if(!id || ! noteData) {
        return(
            <div>Loading....</div>
        )
    }

    else {
        const { title, places, content, _id } = noteData
    
        async function handleDelete() {
            try{
              if(noteData) {
                await axios.delete(`http://localhost:6060/api/notes/delete/${_id}`)
                alert("Note Deleted Successfully!")
                navigate("/home")
              }
            }
            catch(error) {
              console.log(error)
            }  
          }

        
        return (
            <div style={{backgroundColor : color}} className='single-note-container'>
                <div className='note-title'>
                    <h1>{title}</h1>
                </div>
                <div className='note-places'>
                    <h1>{places}</h1>
                </div>
                <div className='note-content'>
                    <p>
                    <ReactMarkdown remarkPlugins={[gfm]}>
                      {content}
                    </ReactMarkdown>
                    </p>
                </div>
                <div className='note-btns'>   
                    <button className='edit-note-btn' type='button'><Link className='link' to={`/edit/${_id}`}>EDIT</Link></button>
                    <button className='delete-note-btn' onClick={handleDelete} type='button'>DELETE</button>
                </div>           
            </div>
          )
    }
}

export default SingleNote