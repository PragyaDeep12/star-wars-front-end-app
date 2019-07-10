import React, { useState } from "react";

import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);
export default function CustomSelect(props) {
  const { list } = props;
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState();
  return (
    <div>
      <FormControl variant="filled" className={classes.formControl} fullWidth>
        <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
        <Select
          value={selectedValue}
          onChange={e => {
            setSelectedValue(e.target.value);
            props.onChange(e.target.value);
          }}
          input={<FilledInput name="age" id="filled-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.map(element => {
            return <MenuItem value={element}>{element}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
