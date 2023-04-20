import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdTravelExplore, MdSearch } from "react-icons/md";
import { BsPatchPlusFill } from "react-icons/bs";
import Note from "../components/Note";
import './css/home.css'
import { UserContext } from '../context/userContext'

function Home() {

	const [notes, setNotes] = useState([])
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const id = user ? user.id : null;
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		async function fetchAllNotes() {
			try{
				if(id) {
					const response = await axios.get(`http://localhost:6060/api/notes/${id}`)
					const data = await response.data
					setNotes(data.notes)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchAllNotes()
	}, [id])

	function handleAddNote() {
		navigate("/new")
	}

	function handleSearchNote(e) {
		setSearchText(e)
		console.log(searchText)
	}

	if(!user || !notes) {
		return(
			<div>Loading...</div>
		)
	}

	return (
		<div className="Home-top">
			<div className="Home">
				<div className="home-header-container">
					<h1>TRAVEL<MdTravelExplore />GUE</h1>
					<div className="Home-header">
						<div className='search'>
							<MdSearch className='icon' size='1.3em' />
							<input
								onChange={(event) =>
									handleSearchNote(event.target.value)
								}
								type='text'
								placeholder='Type to search...'
							/>
						</div>
					</div>
					<div className="add-note">
						<h1>ENTRIES</h1>
						<h1 className="icon" onClick={handleAddNote}><BsPatchPlusFill/></h1>
					</div>
				</div>
				
				<div className="Home-container">
					{notes?.length > 0 ? (
						notes.filter(
							note => {
								if (searchText === " ") {
									return note
								}
								else if(note.title.toLowerCase().includes(searchText.toLowerCase()) || note.places.toLowerCase().includes(searchText.toLowerCase())) {
									return note
								}
							}
						)
						.map(
						(note) => {
							return <Note key={note._id} id={note._id} title={note.title} places={note.places} content={note.content} color={note.color}/>
						}
					)
					) : (
						<h1>No Notes Present</h1>
					)}
				</div>
			</div>
		</div>
	);
}
	

  


  export default Home;
  
