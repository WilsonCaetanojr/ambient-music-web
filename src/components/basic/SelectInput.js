import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./.basics.css";

const SelectErp = ({
  optionsList = [],
  mask = null,
  size = "small",
  value,
  keyObject = "descricao",
  setValue,
  required = false,
  error = false,
  getOptionSelected = (option, value) =>
    option ? option.id === value.id : null,
  onChange = value => {
    setValue(value);
  },
  loading = false,
  ...props
}) => {
  return (
    <Autocomplete
      key={"filter_autocomplete_" + (props.key || props.label)}
      options={optionsList}
      value={value}
      size={size}
      loading={loading}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      getOptionSelected={getOptionSelected}
      getOptionLabel={option => {
        return option ? option[keyObject] : null;
      }}
      style={{ width: "100%" }}
      {...props}
      renderInput={params => (
        <TextField
          {...params}
          required={required}
          error={error}
          label={props.label}
          className="filter-input"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SelectErp;
