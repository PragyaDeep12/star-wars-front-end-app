import React from "react";
import CustomizedSlider from "./CustomizedSlider";
import CustomSelect from "./CustomSelect";
export default function Filter(props) {
  const { speciesList, birthYearRangeCallBack } = props;
  return (
    <div className="row">
      <div className="col-md-2" />
      <div className="col-md-5">
        <CustomizedSlider
          label={"BIRTH YEAR"}
          birthYearRangeCallBack={birthYearRangeCallBack}
        />
      </div>

      <div className="col-md-5 multi-select">
        <CustomSelect list={speciesList} onChange={props.setChoosedSpecies} />
      </div>
    </div>
  );
}
