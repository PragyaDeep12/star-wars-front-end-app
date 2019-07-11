import * as React from "react";
import { useEffect, useState } from "react";
import People from "../Components/People";
import axios from "axios";
import PersonModel from "../Models/PersonModel";
import {
  fetchSequence,
  MapRealYearWithPercent,
  isValidFilteredObject
} from "../Util";
import Loading from "../icons/rolling.svg";
import Filter from "../Components/Filter";
export default function MainPage({ match }) {
  // var charList: Array<PersonModel>=[];
  const [peopleList, setPeopleList] = useState<Array<PersonModel>>([]);
  const [filteredList, setFilteredList] = useState<Array<PersonModel>>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [speciesList, setSpeciesList] = useState<Array<String>>([]);
  const [filmMap, setFilmMap] = useState<Array<{ key: String; value: String }>>(
    []
  );
  const [filmsList, setFilmList] = useState<Array<String>>([]);
  const [choosedSpecies, setChoosedSpecies] = useState<string>();
  const [choosedFilm, setChoosedFilm] = useState<string>();
  const [birthYearRange, setBirthYearRange] = useState<number[]>([0, 0]);
  const [birthYearPercent, setBirthYearPercent] = useState<number[]>([0, 100]);
  useEffect(() => {
    setFilteredList(peopleList);
  }, [peopleList]);
  useEffect(() => {
    setIsloading(true);
    fetchSequence(
      "https://swapi.co/api/people/",
      peopleList,
      setPeopleList,
      setIsloading,
      speciesList,
      setSpeciesList
    );
  }, []);
  useEffect(() => {
    var tempList: PersonModel[] = [];
    peopleList.forEach(people => {
      if (
        isValidFilteredObject(
          people,
          birthYearRange,
          choosedSpecies,
          choosedFilm
        )
      ) {
        tempList.push(people);
      }
    });
    setFilteredList(tempList);
  }, [choosedSpecies, birthYearRange, choosedFilm]);
  useEffect(() => {
    setBirthYearRange(MapRealYearWithPercent(birthYearPercent));
  }, [birthYearPercent]);
  useEffect(() => {
    console.log(choosedFilm);
  }, [choosedFilm]);
  return (
    <div>
      <h3 className="text-left ml-2 pt-2">Starwars API : Charechters</h3>
      <hr />
      <Filter
        speciesList={speciesList}
        setChoosedSpecies={e => {
          console.log(e);
          setChoosedSpecies(e);
        }}
        filmList={filmsList}
        filmMap={filmMap}
        setChoosedFilm={e => {
          console.log(e);
          setChoosedFilm(e);
        }}
        birthYearRange={birthYearRange}
        birthYearRangeCallBack={setBirthYearPercent}
        isLoading={isLoading}
      />
      <hr />
      <div className="row text-left">
        <div className="col-md-1">
          <h6>INDEX</h6>
        </div>
        <div className="col-md-2">
          <h6>NAME</h6>
        </div>
        <div className="col-md-1">
          <h6>AGE</h6>
        </div>

        <div className="col-md-1">
          <h6>HAIR COLOR</h6>
        </div>

        <div className="col-md-2">
          <h6>BIRTH YEAR</h6>
        </div>
        <div className="col-md-3">
          <h6>FILMS</h6>
        </div>

        <div className="col-md-2">
          <h6>SPECIES</h6>
        </div>
      </div>
      <hr />
      <People
        peopleList={filteredList}
        filmList={filmsList}
        filmMap={filmMap}
        setFilmMap={setFilmMap}
        setFilmList={setFilmList}
      />

      <img src={Loading} className="loading" hidden={!isLoading} />
    </div>
  );
}
