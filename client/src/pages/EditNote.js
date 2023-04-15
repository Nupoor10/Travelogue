import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/editnote.css'

function EditNote() {
    const [notetitle, setNoteTitle] = useState('')
    const [notecontent, setNoteContent] = useState('')
    const [noteplaces, setNotePlaces] = useState('')
    const [color, setColor] = useState('peachpuff')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
		async function fetchData() {
			try{
				if(id) {
					const response = await axios.get(`http://localhost:6060/api/notes/single/${id}`)
					const data = await response.data
					setNoteTitle(data.note.title)
					setNotePlaces(data.note.places)
					setNoteContent(data.note.content)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchData()
	}, [id])

    if(!id) {
        return (
            <div>
                Loading....
            </div>
        )
    }
    else {
        
        async function handleNoteEdit(e) {
            e.preventDefault()
            try {
                const res = await axios.put(`http://localhost:6060/api/notes/update/${id}`, {
                    title : notetitle,
                    places : noteplaces,
                    content : notecontent
                })

                if(res.data.updatedNote) {
                    alert("Note Updated Successfully")
                    navigate(`/single/${id}`)
                }
            }
            catch(error) {
                console.log(error)
            }
        }

        console.log(notecontent, noteplaces, notetitle)
    
      return (
        <div className='editnote-form-container'>
            <form className="editnote-form" style={{backgroundColor : color}}>
                <input onChange={(e) => setNoteTitle(e.target.value)} type='text' name='title' placeholder='Enter a title' defaultValue={notetitle}></input>
                <input onChange={(e) => setNotePlaces(e.target.value)} type='text' name='places' placeholder='Enter all destinations' defaultValue={noteplaces}></input>
                <textarea onChange={(e) => setNoteContent(e.target.value)} type='text' name='content' placeholder='Enter your content' defaultValue={notecontent}></textarea>   
                <button className='edit-note-btn' onClick={handleNoteEdit} type='button'>SAVE</button>
            </form>
        </div>
      )
    }  
}

export default EditNote