import * as React from "react";
import PersonModel from "../Models/PersonModel";
import { Link } from "react-router-dom";
import { openModal } from "./CustomDialog";
import EachPersonDetails from "./EachPersonDetails";
export default function EachPerson(person: PersonModel) {
  return (
    <div className="col-md-3 btn btn-light">
      <Link
        to={"/character/" + person.id}
        className="person-list-data"
        onClick={() => {
          openModal(<EachPersonDetails element={person} />);
        }}
      >
        {person.name}
      </Link>
    </div>
  );
}
