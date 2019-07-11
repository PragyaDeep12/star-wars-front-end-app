import React, { useState, useEffect } from "react";
import PersonModel from "../Models/PersonModel";
import { Link } from "react-router-dom";
import { openModal } from "./CustomDialog";
import EachPersonDetails from "./EachPersonDetails";
import Loading from "../icons/rolling.svg";
import Paper from "@material-ui/core/Paper";
import { fetchMovies, isMovieExist } from "../Util";
export default function EachPerson(props) {
  const person: PersonModel = props.element;
  const [isfilmsLoading, setIsFilmsLoading] = useState(true);
  const [films, setFilms] = useState<any[]>([]);

  const { filmList, setFilmList, setFilmMap, filmMap } = props;
  useEffect(() => {
    var filmsApis = person.films;
    setIsFilmsLoading(true);
    if (filmsApis && filmsApis.length > 0) {
      fetchMovies(filmsApis).then(async res => {
        // console.log(res);
        if (res) {
          var tempMap: { key: String; value: String }[] = filmMap;
          var tempList: String[] = filmList;
          var tempFilms: any[] = [];
          await res.map((movie, index) => {
            if (!isMovieExist(movie.title, filmList)) {
              if (films && movie.title && movie.url) {
                tempMap.push({ key: movie.title, value: movie.url });

                tempList.push(movie.title);
              }
            }
            if (movie && movie.title) tempFilms.push(movie.title);
          });
          await setFilmMap([...tempMap]);
          await setFilmList([...tempList]);
          await setFilms(res);
          await setIsFilmsLoading(false);
        }
      });
    }
  }, [person.films]);
  // useEffect()
  return (
    <div className="mb-2 ml-2 mr-2">
      <Paper>
        <div
          className="row btn-light pb-2 pt-2 text-left pointer"
          onClick={() => {
            if (!isfilmsLoading)
              openModal(
                <EachPersonDetails element={person} films={filmList} />
              );
          }}
        >
          <div className="col-md-1">
            <h6>{props.count}</h6>
          </div>
          <div className="col-md-2">{person.name}</div>
          <div className="col-md-1">{person.height}</div>
          <div className="col-md-1">{person.hair_color}</div>
          <div className="col-md-2">
            {person.birth_year ? person.birth_year : ""}
          </div>
          <div className="col-md-3">
            <div>
              <h6>
                {person.films
                  ? "Worked in " + person.films.length + " Movies"
                  : "0"}
              </h6>
            </div>
            {!isfilmsLoading ? (
              films.map((film, index) => {
                return <div>{film.title}</div>;
              })
            ) : (
              <img src={Loading} className="loading" alt="...loading" />
            )}
          </div>
          <div className="col-md-2">{person.species}</div>
        </div>
      </Paper>
    </div>
  );
}
