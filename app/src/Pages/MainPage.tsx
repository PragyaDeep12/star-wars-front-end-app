import * as React from "react";
import { useEffect, useState } from "react";
import People from "../Components/People";
import axios from "axios";
import PersonModel from "../Models/PersonModel";
export default function MainPage({ match }) {
  const [peopleList, setPeopleList]: [Array<PersonModel>, any] = useState([]);
  const callBackend = async () => {
    var l: any = [];
    var i = 1;
    await axios.get("https://swapi.co/api/people/").then(async list => {
      console.log(list);
      list.data.results.map((element: any, index) => {
        // console.log(l);

        let person: PersonModel = {
          id: i,
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
          vehicles: element.vehicles,
          url: element.url
        };
        l.push(person);
        i++;
        // setPeopleList([...peopleList, person]);
      });
      // setPeopleList(list.data.results);
      let next = true;
      let page = 2;
      while (next) {
        next = false;
        var res = await axios.get("https://swapi.co/api/people/?page=" + page);

        await res.data.results.map((element, index) => {
          let person: PersonModel = {
            id: i,
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
            vehicles: element.vehicles,
            url: element.url
          };
          l.push(person);
          i++;
          // setPeopleList([...peopleList, person]);
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
    setPeopleList(l);
  };
  useEffect(() => {
    callBackend();
    //   let peopleList=[];
  }, []);
  return (
    <div>
      {console.log(peopleList)}
      this is the main page
      <People peopleList={peopleList} />
    </div>
  );
}
