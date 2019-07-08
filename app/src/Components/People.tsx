import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function People(props) {
  // const [list, setList] = useState(props.peopleList);
  const { peopleList } = props;
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  // const backEndData = async () => {
  //   // var peopleList;
  //   if (page == 1)
  //     await axios.get("/people").then(peopleList => {
  //       console.log(peopleList.data.next);
  //       setList(peopleList.data.results);
  //       if (peopleList.data.next) {
  //         //   console.log("here");
  //         setHasNext(true);
  //       } else setHasNext(false);
  //     });
  //   else {
  //     await axios.get("/people/?page=" + page).then(peopleList => {
  //       setList(peopleList.data.results);
  //       if (peopleList.data.next) {
  //         setHasNext(true);
  //       } else setHasNext(false);
  //     });
  //   }
  //   // setList(peopleList.data.results);
  // };
  // useEffect(() => {
  //   backEndData();
  //   // console.log(peopleList)
  // }, [page]);
  return (
    <div>
      <div className="row">
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
      </div>
      <div className="row">
        <div className="col">Name</div>
        <div className="col">Height</div>
      </div>
      {peopleList.map((item, index) => {
        return (
          <div className="row">
            <div className="col">{item.name}</div>
            <div className="col">{item.height}</div>
          </div>
        );
      })}
    </div>
  );
}
