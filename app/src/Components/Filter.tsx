import React from "react";
import CustomizedSlider from "./CustomizedSlider";
import CustomSelect from "./CustomSelect";
export default function Filter(props) {
  const {
    speciesList,
    birthYearRangeCallBack,
    birthYearRange,
    filmList,
    filmMap
  } = props;
  return (
    <div className="row ml-1 mr-1">
      <div className="col-md-4">
        <CustomizedSlider
          disabled={props.isLoading}
          label={
            "BIRTH YEAR (" +
            birthYearRange[0].toFixed(2) +
            "BBY - " +
            birthYearRange[1].toFixed(2) +
            "BBY)"
          }
          birthYearRangeCallBack={birthYearRangeCallBack}
        />
      </div>

      <div className="col-md-4 multi-select">
        <CustomSelect
          list={filmList}
          map={filmMap}
          onChange={props.setChoosedFilm}
          label="Films"
          disabled={props.isLoading}
        />
      </div>
      <div className="col-md-4 multi-select">
        <CustomSelect
          list={speciesList}
          onChange={props.setChoosedSpecies}
          label="Species"
          disabled={props.isLoading}
        />
      </div>
    </div>
  );
}
