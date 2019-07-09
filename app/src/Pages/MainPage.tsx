import * as React from "react";
import { useEffect, useState } from "react";
import People from "../Components/People";
import axios from "axios";
import PersonModel from "../Models/PersonModel";
import { fetchSequence } from "../Util";
import Loading from "../icons/rolling.svg";
import Filter from "../Components/Filter";
export default function MainPage({ match }) {
  const [peopleList, setPeopleList]: [Array<PersonModel>, any] = useState([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    setIsloading(true);
    fetchSequence(
      "https://swapi.co/api/people/",
      peopleList,
      setPeopleList,
      setIsloading
    );
  }, []);
  return (
    <div>
      <h3 className="text-left ml-2 pt-2">Starwars API : Charechters</h3>
      <hr />
      <Filter />
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

        <div className="col-md-2">
          <h6>HAIR COLOR</h6>
        </div>

        <div className="col-md-2">
          <h6>BIRTH YEAR</h6>
        </div>
        <div className="col-md-2">
          <h6>EYE COLOR</h6>
        </div>

        <div className="col-md-2">
          <h6>SPECIES</h6>
        </div>
      </div>
      <hr />
      <People peopleList={peopleList} />

      <img src={Loading} className="loading" hidden={!isLoading} />
    </div>
  );
}
