import axios from "axios";
import { element } from "prop-types";
import { getMap } from "./AppConstants";
import PersonModel from "./Models/PersonModel";
export var MaxBirthYear = 896;
export var MinBirthYear = 8;
export const fetchSequence = async (
  api: string,
  list,
  setList,
  setIsLoading,
  speciesList,
  setSpeciesList
) => {
  await axios
    .get(api)
    .then(async res => {
      var data = res.data;
      var temp = [...list];
      var result: PersonModel[] = await Promise.all(
        data.results.map(async (charechter, index) => {
          var chars;
          await resolveSpeciesApi(charechter).then(charechter_res => {
            chars = charechter_res as PersonModel;
            if (chars.species && chars.species.length !== 0) {
              var sp = chars.species as String;
              if (!speciesList.includes(sp)) {
                if (sp) {
                  speciesList.push(sp);
                  setSpeciesList([...speciesList]);
                }
              }
            }
          });
          return chars;
        })
      );
      await result.forEach(element => {
        var bYear = element.birth_year;
        // console.log(bYear);
        if (bYear) {
          console.log();
          var bNYear = Number.parseFloat(bYear.substring(0, bYear.length - 3));
          if (bNYear >= MaxBirthYear) {
            MaxBirthYear = bNYear;
          }
          if (bNYear <= MinBirthYear) {
            MinBirthYear = bNYear;
          }
        }
        temp.push(element);
      });
      //   temp.concat(result);
      setList(temp);
      if (data.next) {
        fetchSequence(
          data.next,
          temp,
          setList,
          setIsLoading,
          speciesList,
          setSpeciesList
        );
      } else {
        // console.log(MaxBirthYear, MinBirthYear);
        console.log("finshed");
        setIsLoading(false);
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const resolveSpeciesApi = charechter => {
  var promise = new Promise((resolve, reject) => {
    if (charechter.species[0]) {
      //species is defined
      fetchSpecies(charechter.species[0])
        .then(res => {
          if (res) {
            charechter.species = res;

            resolve(charechter);
          }
        })
        .catch(err => {
          resolve(charechter);
          console.error(err);
        });
    } else {
      //species is undefined
      resolve(charechter);
    }
  });
  return promise;
};
const fetchSpecies = (api: string) => {
  var promise = new Promise(async (resolve, reject) => {
    await axios
      .get(api)
      .then(res => {
        var data = res.data;
        resolve(data.name);
      })
      .catch(err => {
        reject(null);
        console.error(err);
      });
  });
  return promise;
};

export const getColorCode = (names: String[]): String[] => {
  var colors: String[] = [];
  names.forEach(colorName => {
    if (colorName) {
      var cCode = getMap().get(colorName) as String;
      if (cCode) {
        colors.push(cCode);
      } else {
        colors.push(colorName);
      }
    }
  });
  return colors;
};

export const MapRealYearWithPercent = (arr: number[]) => {
  var diff = MaxBirthYear - MinBirthYear;
  var bMinYear = MinBirthYear + diff * ((arr[0] - 0) / 100);
  var bMaxYear = MaxBirthYear - diff * ((100 - arr[1]) / 100);
  return [bMinYear, bMaxYear];
};

export const isValidFilteredObject = (
  charechter: PersonModel,
  birthYearRange: number[],
  species: string | undefined
): boolean => {
  console.log(charechter);
  console.log(birthYearRange);
  console.log(species);
  var bYear = charechter.birth_year;
  if (bYear && bYear !== "unknown") {
    //birth year of a charenchter is not unknown
    var bNYear = Number.parseFloat(bYear.substring(0, bYear.length - 3));
    //birth  year range defined always
    if (bNYear > birthYearRange[0] && bNYear < birthYearRange[1]) {
      //birth year matched filter
      if (species) {
        //species is defined check species before add
        if (charechter.species === species) {
          //species checked and matched
          return true;
        } else {
          //species checked and unmatched
          return false;
        }
      } else {
        //species undefined
        return true;
      }
    } else {
      //if birth year filter unmatched value shouldnot be shown att all
      return false;
    }
  }
  return false;
};
