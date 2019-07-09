import React, { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import Select from "react-select";
import {
  createStyles,
  emphasize,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import { ValueContainerProps } from "react-select";
import { ControlProps } from "react-select";
import { MenuProps, NoticeProps } from "react-select";
import { MultiValueProps } from "react-select";
import { OptionProps } from "react-select";
import { PlaceholderProps } from "react-select";
import { SingleValueProps } from "react-select";
import { ValueType } from "react-select";
import { useState, useEffect } from "react";
interface OptionType {
  label?: string | any;
  value?: string | any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250
    },
    input: {
      display: "flex",
      padding: 0,
      height: "auto"
    },
    valueContainer: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      alignItems: "center",
      overflow: "hidden"
    },
    chip: {
      margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      )
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2)
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: "absolute",
      left: 2,
      bottom: 6,
      fontSize: 16
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing(2)
    }
  })
);

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <MenuItem
      ref={props.innerRef}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      <span className="list-add-new-item">No Spices</span>
    </MenuItem>
  );
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
} as any;

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> &
  HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} as any;

function Control(props: ControlProps<OptionType>) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired
} as any;

function Option(props: OptionProps<OptionType>) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool
} as any;

function Placeholder(props: PlaceholderProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
} as any;

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
} as any;

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
} as any;

function MultiValue(props: MultiValueProps<OptionType>) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
} as any;

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object
} as any;

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

export default function MultiSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState<ValueType<OptionType>>(null);
  const [multi, setMulti] = React.useState<ValueType<OptionType>>(null);

  const [suggestions, setSuggestion]: [Array<OptionType>, any] = useState([]);
  const [list, setList]: [Array<String>, any] = useState([
    "Human",
    "Droid",
    "Wookie",
    "Yoda's species"
  ]);

  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      if (props && props.cast) {
        var casts: OptionType[] = props.cast;
        handleChangeMulti(casts);
      }
      // getCloudFirestore()
      //   .collection("celebs")
      //   .onSnapshot(
      //     snapshot => {
      //       var list: Array<CelebsModel> = [];

      //       snapshot.docs.forEach(QueryDocumentSnapShot => {
      //         var data = QueryDocumentSnapShot.data();
      //         var celeb: CelebsModel = {
      //           name: data.name,
      //           bio: data.bio,
      //           dob: data.dob,
      //           gender: data.gender
      //         };
      //         // console.log(celeb);
      //         list.push(celeb);
      //       });
      //       setCelebList(list);
      //     },
      //     err => {
      //       console.log(err);
      //     }
      //   );
    }
  }, []);

  useEffect(() => {
    var sugestList: OptionType[] = [];
    list.map((item, index) => {
      let celeb: OptionType = { value: item, label: item };
      sugestList.push(celeb);
    });
    setSuggestion(sugestList);
  }, [list]);
  async function handleChangeMulti(value: ValueType<OptionType>) {
    await setMulti(value);
    console.log(multi);
    props.setCastFunction(value);
  }

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        {/*         
        <div className={classes.divider} /> */}
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            label: "Cast",
            InputLabelProps: {
              htmlFor: "react-select-multiple",
              shrink: true
            },
            placeholder: "Select multiple actors"
          }}
          options={suggestions}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        />
      </NoSsr>
    </div>
  );
}
