import React, { useCallback, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios, { CancelTokenSource } from 'axios';
import { getAmadeusData } from "@/app/api/amadues.api";
import { debounce } from "lodash";

interface SearchProps {
    airportCode: string;
    setAirportCode: React.Dispatch<React.SetStateAction<string>>;
    search: {
        city: boolean;
        airport: boolean;
    };
    setSearch: React.Dispatch<React.SetStateAction<{
        city: boolean;
        airport: boolean;
        keyword: string;
        page: number;
    }>>;
}

interface OptionType {
    type: string;
    name: string;
    airportCode: string;
}

const useStyles = makeStyles((theme) => ({
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 10, // Makes the TextField rounded
            backgroundColor: 'white', // Sets the background color to white
            '& fieldset': {
                borderColor: theme.palette.grey[400], // Set the border color if needed
            },
            '&:hover fieldset': {
                borderColor: theme.palette.grey[600], // Set the border color on hover if needed
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main, // Set the border color on focus
            },
        },
    },
}));


const ToSearchAutocomplete: React.FC<SearchProps> = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<OptionType[]>([]);
    const [search, setSearch] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const debounceLoadData = useCallback(debounce((value: string) => {
        setKeyword(value);
    }, 1000), []);

    useEffect(() => {
        debounceLoadData(search);
    }, [search, debounceLoadData]);

    useEffect(() => {
        setLoading(true);
        let source: CancelTokenSource | undefined = undefined;

        const fetchData = async () => {
            try {
                const { out, source: cancelSource } = getAmadeusData({ ...props.search, keyword });
                source = cancelSource;

                const res = await out;

                if (!res.data.code) {
                    setOptions(res.data.data.map((i: any) => ({
                        type: i.subType,
                        name: i.name,
                        airportCode: i.iataCode
                    })));
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled", err.message);
                } else {
                    console.error("Error fetching data:", err);
                }
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            if (source) {
                source.cancel("Component unmounted");
            }
        };
    }, [keyword, props.search]);

    const { city, airport } = props.search;
    const label = city && airport ? "City and Airports" : city ? "City" : airport ? "Airports" : "";

    return (
        <Autocomplete
            className="w-[418px] font-Montserrat"
            id="asynchronous-demo"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) =>
                option.name === value.name && option.type === value.type
            }
            onChange={(e, value: OptionType | null) => {
                if (value) {
                    props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }));
                    setSearch(value.name);
                    props.setAirportCode(value.airportCode);
                } else {
                    setSearch("");
                    props.setSearch((p) => ({ ...p, keyword: "a", page: 0 }));
                }
            }}
            getOptionLabel={(option: OptionType) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}

                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                    variant="outlined"
                    className={classes.textField}
                    placeholder="To"
                    inputProps={{
                        ...params.inputProps,
                        value: search
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading && <CircularProgress color="inherit" size={20} />}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

export default ToSearchAutocomplete;