import * as React from "react";
import { useEffect, useState } from "react";
import People from "../Components/People";
import axios from "axios";
import PersonModel from "../Models/PersonModel";
export default function MainPage({ match }) {
  const [peopleList, setPeopleList]: [Array<PersonModel>, any] = useState([]);
  const callBackend = async () => {
    axios.get("/people").then(async list => {
      setPeopleList(list.data.results);
      let next = true;
      let page = 2;
      while (next) {
        next = false;
        var res = await axios.get("/people/?page=" + page);

        await res.data.results.map((element, index) => {
          console.log(peopleList);
          setPeopleList([...peopleList, element]);
        });
        // setPeopleList([...peopleList, res.data.results]);

        //  .then(res => {
        //   if (res.data.results)
        //     setPeopleList([...peopleList, res.data.results]);
        //   console.log(res.data);
        if (res.data.next) {
          console.log(next);
          next = true;
        }
        // });
        page = page + 1;
      }
    });
  };
  useEffect(() => {
    callBackend();
    //   let peopleList=[];
  }, []);
  return (
    <div>
      {console.log(peopleList)}
      this is the main page
      <People />
    </div>
  );
}
