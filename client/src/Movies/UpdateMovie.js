import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const initialFormValues = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

const UpdateMovie = (props) => {
    const [data, setData] = useState(initialFormValues);
    const { id } = useParams();
    const history = useHistory();
    
    useEffect(() => {
        const populate = () => {
            axios.get(`http://localhost:5000/api/movies/${id}`)
                 .then(res => {
                     setData(res.data)
                    })
                 .catch(err => console.log(`${err.response.status}, ${err.response.statusText}`))
        }
        populate();
    }, [])

    const onChange = evt => {
        setData({
            ...data,
            [evt.target.name]: evt.target.value
        })
    }

    const onClick = evt => {
        evt.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, data)
             .then(res => {
                 let movieListCopy = [...props.movieList];
                 movieListCopy[id] = res.data;
                 props.setMovieList(movieListCopy);
                 history.push(`/`);
                })
             .catch(err => console.log({ err }))
    }

    return(
    <div>
        <form>
            <input type="text" name="title" onChange={onChange} value={data.title} ></input>
            <input type="text" name="director" onChange={onChange} value={data.director} ></input>
            <input type="number" name="metascore" onChange={onChange} value={data.metascore} ></input>
            <input type="text" name="stars" onChange={onChange} value={data.stars} ></input>
            <button onClick={onClick}>Update</button>
        </form>
    </div>
    );
}

export default UpdateMovie;