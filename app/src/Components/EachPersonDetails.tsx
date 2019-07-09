import * as React from "react";
import { useEffect, useState } from "react";
import PersonModel from "../Models/PersonModel";
import { Link } from "react-router-dom";

import axios from "axios";
import { closeDialog } from "./CustomDialog";
export default function EachPersonDetails(props) {
  const person: PersonModel = props.element;
  return (
    <div className="card my-card ">
      <div className="card-header">
        <h4>{person.name}</h4>
      </div>
      <ul>
        <li>Height: {person.height}</li>
        <li>Eye-Color: {person.eye_color}</li>
        <li>Gender: {person.gender}</li>
        <li>Birth Year: {person.birth_year}</li>
        <li>Hair-Color: {person.hair_color}</li>
        <li>Mass: {person.mass}</li>
      </ul>
      <div
        className="text-center pointer"
        onClick={() => {
          closeDialog();
        }}
      >
        {" "}
        Back
      </div>
    </div>
  );
}
