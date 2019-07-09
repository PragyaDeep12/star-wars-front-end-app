import * as React from "react";
import { useEffect, useState } from "react";
import PersonModel from "../Models/PersonModel";
import { Link } from "react-router-dom";

import axios from "axios";
import { closeDialog } from "./CustomDialog";
export default function EachPersonDetails(props) {
  const { element } = props;
  const [person, setPerson] = useState<PersonModel>({});
  const getBackendData = async () => {
    // await fetch("https://swapi.co/api/films/1/").then(async res => {
    //   console.log(await res.json());
    // });
    // var res = await axios.get("https://swapi.co/api/people/" + id);
    // var element = res.data;
    // console.log(res);
    setPerson({
      id: element.id,
      name: element.name,
      birthYear: element.birth_year,
      height: element.height,
      created: element.created,
      edited: element.edited,
      films: element.films,
      eyeColor: element.eye_color,
      gender: element.gender,
      homeworld: element.homeworld,
      mass: element.mass,
      skinColor: element.skin_color,
      species: element.species,
      starships: element.starships,
      vehicles: element.vehicles
    });
  };
  useEffect(() => {
    // var id = match.params.id;
    // console.log(id);
    getBackendData();
  }, []);
  return (
    <div>
      {person.name}
      {console.log(person)}
      <div className="col-md-5 card bg-light">
        <div className="card-header">{person.name}</div>
        <ul>
          <li>height: {person.height}</li>
          <li>eye-color: {person.eyeColor}</li>
          <li>gender: {person.gender}</li>
        </ul>
        <Link
          to="/"
          onClick={() => {
            closeDialog();
          }}
        >
          Back
        </Link>
      </div>
    </div>
  );
}
