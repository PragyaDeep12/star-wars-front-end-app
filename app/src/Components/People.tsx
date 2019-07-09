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
      {/* <div className="row">
        <button
          className=" btn btn-primary"
          onClick={() => {
            if (page !== 1) {
              setPage(page - 1);
            }
          }}
        >
          {"<"}
        </button>
        <button
          className=" btn btn-primary"
          onClick={() => {
            if (hasNext) {
              setPage(page + 1);
            }
          }}
        >
          {">"}
        </button>
      </div> */}

      <div>
        {peopleList.map((item: PersonModel, index) => {
          return <EachPerson element={item} key={index} count={count++} />;
        })}
      </div>
    </div>
  );
}
