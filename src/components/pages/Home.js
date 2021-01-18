import React, {useEffect, useContext, useState} from 'react';
import ShoppiesContext from '../../context/omdb/shoppiesContext'
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import Spinner from "../utils/Spinner";
import Footer from "../layout/Footer";

const Home = () => {
  const shoppiesContext = useContext(ShoppiesContext);
  const {omdbMovies, getMovie, error, loading, clearErrors} = shoppiesContext;

  const [movieName, setMovieName] = useState('');
  const [results, setResults] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState(null);
  const [nomination, setNomination] = useState([]);

  useEffect(() => {
    // loop through nomination list
    nomination.forEach(nom => console.log(nom.title))
    // if nominated is in nomination and btn isn't disabled, disable it
    const movieContainer = document.getElementById('movie-container');
    const div = movieContainer.querySelectorAll('div.card-2');
    let movieTitle = [];
    div.forEach(mov => {
      movieTitle.push(mov.lastChild.childNodes[0].textContent)
    })
    console.log(movieTitle);

    if (omdbMovies !== null) {
      if (omdbMovies.Search) {
        setResults(omdbMovies.Search)
      }
      if (omdbMovies.Error === "Movie not found!") {
        setErr(omdbMovies.Error)
        /*Swal.fire({
          icon: 'error',
          text: `${err}`
        })*/
      }
    }
    //console.log('length of nomination', nomination.length)
  }, [omdbMovies, nomination])

  useEffect(()=>{
    if (nomination.length === 5) {
      Swal.fire({
        icon: 'info',
        text: "You've added 5 nominations"
      })
    }
  })

  const onKeyUp = (e) => {
    e.preventDefault();
    getMovie(movieName)
    if (error) {
      Swal.fire({
        icon: 'error',
        text: `${error}`
      })
      clearErrors()
    }
  }

  const nominateClick = (e) => {
    //console.log(e.target.id)
    e.target.disabled = true;
    e.target.classList.add('text-gray-400')
    const search = {
      image: e.nativeEvent.path[3].childNodes[0].childNodes[0].currentSrc,
      title: e.nativeEvent.path[3].childNodes[1].childNodes[0].textContent,
      year: e.nativeEvent.path[3].childNodes[1].childNodes[1].textContent,
      imdbId: e.target.id
    }
    if (nomination.length < 5) {
      setNomination(nomination => [...nomination, search])
      window.localStorage.setItem("nominatedMovies",JSON.stringify(nomination))
    }
    if (nomination.length === 5) {
      e.target.disabled = false;
      e.target.classList.remove('text-gray-400')
      Swal.fire({
        icon: 'info',
        text: "You've added 5 nominations"
      })
    }
  }

  const removeClick = (e) => {
    const position = e.target.parentElement.parentElement.id;
    /*console.log(e.target.parentElement.firstChild.textContent);
    console.log(e.target.dataset.key)*/
    let identifier = e.target.dataset.key;
    console.log(identifier)
    if (document.getElementById(identifier)) {
      document.getElementById(identifier).disabled = false;
      document.getElementById(identifier).classList.remove('text-gray-400')
    }
    /*console.log(document.getElementById(identifier))*/
    let removed = nomination.splice(parseInt(position), 1)
    let rem = removed.map(rem => rem.title)
    Swal.fire({
      icon: 'info',
      text: `"${rem}" has been removed`
    })
    console.log(e.target.parentElement.childNodes[0].textContent)
    setNomination(nomination.filter(nom => nom.title !== e.target.parentElement.childNodes[0].textContent))

  }

  return (
    <div className="mx-4 mb-10">
      <h3 className="mt-6 ml-4 lg:ml-24 text-xl uppercase font-bold text-gray-300">The Shoppies</h3>
      <div className="container mx-auto mt-5 card-1">
        <form action="" onKeyUp={onKeyUp} className="relative">
          <label htmlFor="search" className="block text-center text-lg font-bold mb-2 text-gray-300">Movie Title</label>
          <input type="text"
                 id="search"
                 className="block border border-2 border-green-400 w-full rounded-xl text-green-400 p-3 text-sm lg:text-xl bg-transparent outline-0"
                 name="movieName"
                 value={movieName}
                 onChange={(e) => setMovieName(e.target.value)}
                 placeholder="put in the movie you are looking for"
          />
          <i className="fas fa-search fa-2x absolute search-icon cursor-pointer">
          </i>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row mx-4">
        <div className="lg:mr-2 lg:w-3/6">
          {movieName && (<h3 className="font-bold text-gray-300">Search results for "{movieName}"</h3>)}
          {loading
            ? (
              <div className="flex justify-center items-center h-full w-90vw ">
                <Spinner/>
              </div>) :
            (<div id="movie-container" className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center mt-5">
              {
                results && results.map((movie) => (
                  <div key={movie.imdbID} className="card-2 flex flex-row">
                    <div className="w-3/6">
                      <img src={movie.Poster} alt={movie.Title} className="object-cover h-56 w-max"/>
                    </div>
                    <div className="w-3/6 py-3 px-1 text-center font-mono overflow-auto flex flex-col self-center">
                      <p>{movie.Title}</p>
                      <p className="my-2">{movie.Year}</p>
                      <div>
                        <button id={movie.imdbID}
                                className="bg-green-200 shadow-lg p-2 rounded-lg nominateBtn animate-pulse"
                                onClick={nominateClick}>Nominate
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>)}
        </div>

        <div className="card-3 mt-6 font-mono py-4 lg:ml-2 lg:w-3/6">
          <h3 className="text-xl uppercase font-bold text-black text-center">Nominations</h3>
          <br/>
          <div className="mx-auto">
            {nomination.length !== 0 ?
              (
                <div>
                  {nomination.map((nominatedMovies, index) => (
                    <div key={uuidv4()} className="mx-2">
                      <div id={index} className="mx-auto text-center flex flex-row">
                        <div className="w-3/6">
                          <img
                            src={nominatedMovies.image}
                            alt="" className="h-32 object-cover w-max"/>
                        </div>
                        <div className="lg:ml-20 md:ml-32 ml-2 w-3/6">
                          <p>{nominatedMovies.title}</p>
                          <p className="my-2">{nominatedMovies.year} </p>
                          <button
                            data-key={nominatedMovies.imdbId}
                            className={`bg-red-700 p-2 ${nominatedMovies.imdbId}`}
                            onClick={removeClick}
                          >
                            <i className="fas fa-trash mr-2">
                            </i>Remove
                          </button>
                        </div>
                      </div>
                      <br/>
                    </div>
                  ))}
                </div>)
              :
              (<p className="text-center">add nominations</p>)
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
