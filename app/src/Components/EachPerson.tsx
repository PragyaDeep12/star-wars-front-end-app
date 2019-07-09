import * as React from "react";
import PersonModel from "../Models/PersonModel";
import { Link } from "react-router-dom";
import { openModal } from "./CustomDialog";
import EachPersonDetails from "./EachPersonDetails";

import Paper from "@material-ui/core/Paper";
export default function EachPerson(props) {
  const person: PersonModel = props.element;
  return (
    <Paper>
      <div
        className="row btn-light pb-2 pt-2 pointer"
        onClick={() => {
          openModal(<EachPersonDetails element={person} />);
        }}
      >
        <div className="col-md-1">{props.count}</div>
        <div className="col-md-2">{person.name}</div>
        <div className="col-md-1">{person.height}</div>
        <div className="col-md-2">{person.hair_color}</div>
        <div className="col-md-2">
          {person.birth_year ? person.birth_year : ""}
        </div>
        <div className="col-md-2">{person.eye_color}</div>
        <div className="col-md-2">{person.species}</div>
      </div>
    </Paper>
  );
}
