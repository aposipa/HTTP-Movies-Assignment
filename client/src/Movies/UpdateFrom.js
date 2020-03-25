import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [] 
}

const UpdateForm = props => {
    const [item, setItem] = useState(initialItem)
    const { id } = useParams();

    useEffect(() => {
        console.log("***", props)
        const movieToUpdate = props.movieList.find(items => `${items.id}` === id)
        console.log(movieToUpdate)
        if (movieToUpdate) {
            setItem(movieToUpdate)
        }
    }, [props.movieList, id])

    const handleChange = e => {
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value)
        } else if (e.target.name === 'stars') {
            value = value.split (',')
        }
        setItem({
            ...item,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, item)
        .then(res => {
            console.log(res.data)
            props.setMovieList([res.data]);
            props.history.push(`/movies/${id}`)
        })
        .catch(err => console.log('you have an error here...', err))
    }

    return (
        <div>
            <h1>Update the Movie</h1>
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="Movie Title"
                type='text'
                name="title"
                onChange={handleChange}
                value={item.title}
                />

                <input 
                placeholder="Director"
                type='text'
                name="director"
                onChange={handleChange}
                value={item.director}
                />

                <input 
                placeholder="MetaScore Rating %"
                type='number'
                name="metascore"
                onChange={handleChange}
                value={item.metascore}
                />

                <input 
                placeholder="Main Stars"
                type='text'
                name="stars"
                onChange={handleChange}
                value={item.stars}
                />
                <button>Update the Movie</button>
            </form>
        </div>
    )
}

export default UpdateForm;