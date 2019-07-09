import * as React from "react";
import { useEffect, useState } from "react";
import PersonModel from "../Models/PersonModel";
import { Link } from "react-router-dom";

import axios from "axios";
import { closeDialog } from "./CustomDialog";
import { getMap } from "../AppConstants";
import ColorRadio from "./ColorRadio";
import ColorChooser from "./ColorChooser";
import { getColorCode } from "../Util";
export default function EachPersonDetails(props) {
  const person: PersonModel = props.element;
  // console.log(ha)
  return (
    <div className="card my-card ">
      <div className="card-header mb-3">
        <h4>{person.name}</h4>
      </div>
      <ul>
        <li>
          <div className="row">
            <div className="col-md-5">
              <h6>Height :</h6>
            </div>
            <div className="col-md-7">{person.height}</div>
          </div>
        </li>
        <li>
          <div className="row">
            <div className="col-md-5">
              <h6>Eye-Color:</h6>
            </div>
            <div className="col-md-7">
              {person.eye_color ? (
                <ColorChooser
                  colors={getColorCode(person.eye_color.split(","))}
                  showAll={true}
                />
              ) : (
                person.eye_color
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="row">
            <div className="col-md-5">
              <h6>Gender :</h6>
            </div>
            <div className="col-md-7">{person.gender}</div>
          </div>
        </li>
        <li>
          <div className="row">
            <div className="col-md-5">
              <h6>Birth Year :</h6>
            </div>
            <div className="col-md-7">{person.birth_year}</div>
          </div>
        </li>
        <li>
          <div className="row">
            <div className="col-md-5">
              <h6>Hair-Color :</h6>
            </div>
            <div className="col-md-7">
              {person.hair_color ? (
                <ColorChooser
                  colors={getColorCode(person.hair_color.split(","))}
                  showAll={true}
                />
              ) : (
                person.hair_color
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="row">
            <div className="col-md-5">
              <h6>Mass :</h6>
            </div>
            <div className="col-md-7">{person.mass}</div>
          </div>{" "}
        </li>
      </ul>
      <div
        className="text-center pointer"
        onClick={() => {
          closeDialog();
        }}
      >
        {" "}
        <h6 className="pointer">CANCEL</h6>
      </div>
    </div>
  );
}
