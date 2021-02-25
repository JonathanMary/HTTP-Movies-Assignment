import React, { useState } from "react";
import axios from "axios";

const initialFormValues = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

const AddMovie = (props) => {
    const [input, setInput] = useState(initialFormValues);

    const onClick = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, input)
             .then(res => {
                 props.setMovieList([...props.movieList, input])
             })
             .catch(err => console.log({ err }))

    }
    const onChange = e => {
        e.target.name === "stars"?
        setInput({...input, stars: [e.target.value]})
        :setInput({...input, [e.target.name]:e.target.value});
    }

    console.log(props.movieList)
    console.log(input)

    return(
        <div>
            <form>
                <input type="number" name="id" onChange={onChange} value={input.id} placeholder="id.." ></input>
                <input type="text" name="title" onChange={onChange} value={input.title} placeholder="title.." ></input>
                <input type="text" name="director" onChange={onChange} value={input.director} placeholder="director.." ></input>
                <input type="number" name="metascore" onChange={onChange} value={input.metascore} placeholder="metascore.." ></input>
                <input type="text" name="stars" onChange={onChange} value={input.stars} placeholder="stars.." ></input>
                <button onClick={onClick}>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;