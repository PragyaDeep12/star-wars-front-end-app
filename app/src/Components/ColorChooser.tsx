import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { makeStyles } from "@material-ui/styles";
import ColorRadio from "./ColorRadio";
import { USERNAME_COLORS } from "../AppConstants";
export default function ColorChooser(props) {
  // const { userDetails, uid } = props;
  const [color, setColor] = useState<string>("#00664a");
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    setColors(props.colors);
  }, []);
  function handleChange(selectedColor) {
    // ?if (uid) {
    setColor(selectedColor);
    // }
  }
  return (
    <div className="color-chooser">
      {colors.map(element => {
        if (props.showAll)
          return (
            <ColorRadio
              selectedColor={element}
              color={element}
              onChange={e => {
                handleChange(e);
              }}
            />
          );
        else
          return (
            <ColorRadio
              selectedColor={color}
              color={element}
              onChange={e => {
                handleChange(e);
              }}
            />
          );
      })}
    </div>
  );
}
