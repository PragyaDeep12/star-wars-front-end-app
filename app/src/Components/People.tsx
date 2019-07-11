import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EachPerson from "./EachPerson";
import PersonModel from "../Models/PersonModel";
export default function People(props) {
  const { peopleList } = props;
  let count = 1;
  return (
    <div>
      <div>
        {peopleList.map((item: PersonModel, index) => {
          return (
            <EachPerson
              element={item}
              key={index}
              count={count++}
              filmList={props.filmList}
              filmMap={props.filmMap}
              setFilmMap={props.setFilmMap}
              setFilmList={props.setFilmList}
            />
          );
        })}
      </div>
    </div>
  );
}
