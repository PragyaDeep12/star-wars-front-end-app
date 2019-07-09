import axios from "axios";
import { element } from "prop-types";

export const fetchSequence = async (
  api: string,
  list,
  setList,
  setIsLoading
) => {
  await axios
    .get(api)
    .then(async res => {
      var data = res.data;
      var temp = [...list];
      var result = await Promise.all(
        data.results.map(async (charechter, index) => {
          var chars;
          await resolveSpeciesApi(charechter).then(charechter => {
            chars = charechter;
          });
          return chars;
        })
      );
      await result.forEach(element => {
        temp.push(element);
      });
      //   temp.concat(result);
      setList(temp);
      if (data.next) {
        fetchSequence(data.next, temp, setList, setIsLoading);
      } else {
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
