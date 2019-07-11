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
  useEffect(() => {
    if (person.eye_color) {
      createColorBox("eye-color", person.eye_color.split(","));
    }
    if (person.hair_color) {
      createColorBox("hair-color", person.hair_color.split(","));
    }
  }, []);
  const createColorBox = (parentID, colors) => {
    var elem = document.getElementById(parentID);
    if (person.eye_color) {
      getColorCode(colors).forEach(color => {
        if (elem) {
          elem.innerHTML +=
            '<div class="color-box col-md-1"style="background-color:' +
            color +
            ' "></div>';
        }
      });
    }
  };
  return (
    <div className="card my-card ">
      <div className="card-header mb-3">
        <h4>{person.name}</h4>
      </div>
      <div className="card-body">
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
                {/* {person.eye_color ? (
                <ColorChooser
                  colors={getColorCode(person.eye_color.split(","))}
                  showAll={true}
                />
              ) : (
                person.eye_color
              )} */}
                <div id="eye-color" className="row" />
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
                {/* {person.hair_color ? (
                <ColorChooser
                  colors={getColorCode(person.hair_color.split(","))}
                  showAll={true}
                />
              ) : (
                person.hair_color
              )} */}
                <div id="hair-color" className="row" />
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
          <li>
            <div className="row">
              <div className="col-md-5">
                <h6>Worked in Films :</h6>
              </div>
              <div className="col-md-7 text-left">
                <ul>
                  {props.films.map(film => {
                    return <li>{film}</li>;
                  })}
                </ul>
              </div>
            </div>{" "}
          </li>
        </ul>
      </div>
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
