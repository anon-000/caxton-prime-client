/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description TagsAutoComplete.js
 * @createdOn 06/07/21 8:55 am
 */


import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useDebounce from '../hooks/useDebounce';
import {getAllTags} from "../apis/tags";
import Box from "@material-ui/core/Box";

function ExamTagsAutoComplete({
                                 autoFocus,
                                 className,
                                 label,
                                 helperText,
                                 error,
                                 onChange,
                                 onSelect,
                                 value = '',
                                 placeholder,
                                 searchOnEmpty,
                                 ...others
                             }) {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');
    const [searchValue, setSearchValue] = useState({name: value});
    const [onLoad, setOnLoad] = useState(false);

    const debouncedSearchTerm = useDebounce(searchValue.name);

    const onSearch = (searchValue) => {
        if (searchValue === key) {
            if (searchValue === '') {
                if (!searchOnEmpty) return true;
            } else return true;
        }
        setKey(searchValue);
        setSelectedOptions([]);
        setLoading(true);
        console.log(`-----search value : ${searchValue}`);
        let _selectedOptions = options.filter((each) =>
            each?.name.toUpperCase().includes(searchValue.toUpperCase()),
        );
        setSelectedOptions([..._selectedOptions]);
        setLoading(false);
    };

    useEffect(() => {
        getAllTags().then((response) => {
            console.log(response.data);
            const {data} = response;
            setOptions([...data]);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (onLoad || searchOnEmpty) {
            onSearch(searchValue && searchValue.name ? searchValue.name.trim() : '');
        } else setOnLoad(true);
    }, [debouncedSearchTerm, searchOnEmpty]);

    return (
        <Autocomplete
            filterSelectedOptions
            freeSolo
            getOptionLabel={(option) => option?.name}
            onChange={(event, newValue) => {
                console.log(`on change in auto complete : ${newValue}`);
                onSelect(newValue ? newValue : null);
                setSearchValue({name: ''});
            }}
            options={selectedOptions}
            renderInput={(params) => (
                <TextField
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    autoFocus
                    //className={className ? className : null}
                    error={error}
                    fullWidth
                    //helperText={helperText}
                    // margin="normal"
                    //label={label? label : ''}
                    placeholder={placeholder ? placeholder : ""}
                    value={searchValue?.name}
                    variant="outlined"
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        className: className,
                        endAdornment: (
                            <Box>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </Box>
                        ),
                    }}
                    onChange={(event) => {
                        const _searchInput = event && event.target && event.target.value ? event.target.value : '';
                        setSearchValue({name: _searchInput});
                        onChange(event);
                    }}
                />
            )}
            value={searchValue}
            {...others}
        />
    );
}

ExamTagsAutoComplete.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    handleClear: PropTypes.func,
    value: PropTypes.any,
    error: PropTypes.bool,
    searchOnEmpty: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    courseId: PropTypes.string,
    className: PropTypes.any,
};

ExamTagsAutoComplete.defaultProps = {
    type: 'global',
    onChange: () => {
    },
    onSelect: () => {
    },
    handleClear: () => {

    },
    error: false,
    searchOnEmpty: false,
    helperText: '',
};

export default ExamTagsAutoComplete;
