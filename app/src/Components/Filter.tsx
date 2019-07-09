import React from "react";
import CustomizedSlider from "./CustomizedSlider";

import Paper from "@material-ui/core/Paper";
import ColorChooser from "./ColorChooser";
import { Typography } from "@material-ui/core";
import MultiSelect from "./MultiSelect";
import { USERNAME_COLORS } from "../AppConstants";
export default function Filter() {
  return (
    <div className="row">
      <div className="col-md-2">
        <CustomizedSlider label={"AGE"} />
      </div>

      <div className="col-md-2">
        <Typography gutterBottom>HAIR COLOR</Typography>
        <ColorChooser colors={USERNAME_COLORS} />
      </div>

      <div className="col-md-2">
        {" "}
        <CustomizedSlider label={"BIRTH YEAR"} />
      </div>
      <div className="col-md-2">
        <Typography gutterBottom>EYE COLOR</Typography>
        <ColorChooser colors={USERNAME_COLORS} />
      </div>

      <div className="col-md-2 multi-select">
        <MultiSelect />
      </div>
    </div>
  );
}
