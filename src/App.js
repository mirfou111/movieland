import React from 'react';
import {useEffect, useState} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const API_URL = "https://www.omdbapi.com?apikey=38500ec9";
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    // const movie1 = {
    //     Poster: "N/A",
    //     Title: "Kirikou and the Sorceress",
    //     Type: "movie",
    //     Year: "1998",
    //     imdbID: "tt0181627"
    // }
    useEffect(()=>{
        searchMovies();
    }, [])
    return(
        <div className="app">
            <h1>Movieland</h1>
            <div className="search">
                <input placeholder="Search for movie" value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)}/>
                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (<div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>)
                    : (<div className="empty">
                        <h2>No movies Found</h2>
                    </div>)

            }

        </div>
    )
}
export default App;