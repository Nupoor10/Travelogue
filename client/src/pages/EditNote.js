import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/editnote.css'

function EditNote() {
    const [notetitle, setNoteTitle] = useState('')
    const [notecontent, setNoteContent] = useState('')
    const [noteplaces, setNotePlaces] = useState('')
    const [color, setColor] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
		async function fetchNote() {
			try{
				if(id) {
					const response = await axios.get(`http://localhost:6060/api/notes/single/${id}`)
					const data = await response.data
					setNoteTitle(data.note.title)
					setNotePlaces(data.note.places)
					setNoteContent(data.note.content)
                    setColor(data.note.color)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchNote()
	}, [id])

    if(!id) {
        return (
            <div>
                Loading....
            </div>
        )
    }

    async function handleNoteUpdate(e) {
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

    return (
        <div className='editnote__container'>
            <form className="editnote__form" style={{backgroundColor : color}}>
                <input className="editnote__input" onChange={(e) => setNoteTitle(e.target.value)} type='text' name='title' placeholder='Enter a title' defaultValue={notetitle}></input>
                <input className="editnote__input" onChange={(e) => setNotePlaces(e.target.value)} type='text' name='places' placeholder='Enter all destinations' defaultValue={noteplaces}></input>
                <textarea className="editnote__textarea" onChange={(e) => setNoteContent(e.target.value)} type='text' name='content' placeholder='Enter your content' defaultValue={notecontent}></textarea>   
                <button className='editnote__btn' onClick={handleNoteUpdate} type='button'>SAVE</button>
            </form>
        </div>
      )
    }  

export default EditNote