import * as React from "react";
import { useEffect, useState } from "react";
import People from "../Components/People";
import axios from "axios";
import PersonModel from "../Models/PersonModel";
import {
  fetchSequence,
  MapRealYearWithPercent,
  isValidFilteredObject
} from "../Util";
import Loading from "../icons/rolling.svg";
import Filter from "../Components/Filter";
export default function MainPage({ match }) {
  // var charList: Array<PersonModel>=[];
  const [peopleList, setPeopleList] = useState<Array<PersonModel>>([]);
  const [filteredList, setFilteredList] = useState<Array<PersonModel>>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [speciesList, setSpeciesList] = useState<Array<String>>([]);
  const [choosedSpecies, setChoosedSpecies] = useState<string>();
  const [birthYearRange, setBirthYearRange] = useState<number[]>([0, 0]);

  const [birthYearPercent, setBirthYearPercent] = useState<number[]>([0, 100]);
  useEffect(() => {
    setFilteredList(peopleList);
  }, [peopleList]);
  useEffect(() => {
    setIsloading(true);
    fetchSequence(
      "https://swapi.co/api/people/",
      peopleList,
      setPeopleList,
      setIsloading,
      speciesList,
      setSpeciesList
    );
  }, []);
  useEffect(() => {
    console.log(birthYearRange);
    var tempList: PersonModel[] = [];
    peopleList.forEach(people => {
      if (isValidFilteredObject(people, birthYearRange, choosedSpecies)) {
        console.log(people.species + "isValid");
        tempList.push(people);
      }
      // if (choosedSpecies || birthYearRange) {
      //   // if(people.birth_year)
      //   var bYear = people.birth_year;
      //   console.log(bYear);
      //   if (bYear && bYear != "unknown") {
      //     var bNYear = Number.parseFloat(
      //       bYear.substring(0, bYear.length - 3)
      //     );
      //     console.log(bNYear);
      //     console.log(birthYearRange);
      //     if (bNYear > birthYearRange[0] && bNYear < birthYearRange[1]) {
      //       //between range add
      //       if (people.species) {
      //         //species has been choosed
      //         if (people.species === choosedSpecies) {
      //           //species matched
      //           tempList.push(people);
      //         } else {
      //           //species not matched
      //           //  tempList.push(people);
      //         }
      //       } else {
      //         //species not defined
      //         tempList.push(people);
      //       }
      //       // tempList.push(people);
      //     }
      //   } else {
      //     // tempList.push(people);
      //   }
      // }
    });
    setFilteredList(tempList);
    // } else {
    //   setFilteredList(peopleList);
    // }
  }, [choosedSpecies, birthYearRange]);
  useEffect(() => {
    setBirthYearRange(MapRealYearWithPercent(birthYearPercent));
  }, [birthYearPercent]);
  return (
    <div>
      <h3 className="text-left ml-2 pt-2">Starwars API : Charechters</h3>
      <hr />
      <Filter
        speciesList={speciesList}
        setChoosedSpecies={e => {
          console.log(e);
          setChoosedSpecies(e);
        }}
        birthYearRangeCallBack={setBirthYearPercent}
      />
      <hr />
      <div className="row text-left">
        <div className="col-md-1">
          <h6>INDEX</h6>
        </div>
        <div className="col-md-2">
          <h6>NAME</h6>
        </div>
        <div className="col-md-1">
          <h6>AGE</h6>
        </div>

        <div className="col-md-2">
          <h6>HAIR COLOR</h6>
        </div>

        <div className="col-md-2">
          <h6>BIRTH YEAR</h6>
        </div>
        <div className="col-md-2">
          <h6>EYE COLOR</h6>
        </div>

        <div className="col-md-2">
          <h6>SPECIES</h6>
        </div>
      </div>
      <hr />
      <People peopleList={filteredList} />

      <img src={Loading} className="loading" hidden={!isLoading} />
    </div>
  );
}
