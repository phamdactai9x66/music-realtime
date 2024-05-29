import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import httpRequest from "src/service/httpRequest";
import { cloneObj } from "src/utils";
import { songType } from "src/store/SongSlice";
import SearchIcon from "@mui/icons-material/Search";

type AsynchronousProps = {
  url: string;
  labelOptions: (option: looseObj) => string;
} & React.PropsWithChildren;

const AutocompleteAsync: React.FC<AsynchronousProps> = (props) => {
  const { url, labelOptions } = props || {};

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly songType[]>([]);
  const loading = open && options.length === 0;

  const handleApi = async () => {
    try {
      const getData = await httpRequest.getData(url);

      setOptions(cloneObj(getData));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) handleApi();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: songType | null
      ) => {
        console.log(value);
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={labelOptions}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Song"
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon />,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteAsync;
