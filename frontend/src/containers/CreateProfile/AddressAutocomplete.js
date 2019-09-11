import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {API_URL, API_PORT} from '../../constants/enviroment.js';

const AddressAutocomplete = (props) => {

    const [location, setLocation] = useState(props.userData.location || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);

    useEffect(() => {
        setLocation(props.userData.location || '');
    }, [props.userData.location]);

    const searchGooglePlaces = async string => {
        const query = string.split(' ').join('+');
        let data = {
            query: query,
            token: localStorage.getItem('token')
        }
        try{
            const response = await fetch(API_URL + ':' + API_PORT + '/googleLocation', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json()
            setSuggestions(json.predictions.length ? json.predictions.map(value => value.description) : [])
        }
        catch(error){
            console.log(error);
        }
    }

    const handleChange = value => {
        setLocation(value)
        if(value.length >= 2){
            searchGooglePlaces(location)
            setIsOpen(true)
        }
        props.onChange(value)
    }

    const handleSelect = index => {
        setLocation(suggestions[index])
        setIsOpen(false)
        props.onChange(suggestions[index])
    }

    const handleKeyDown = (event) => {
        switch(event.key){
            case 'ArrowDown':
                if(selectedItem < 4){
                    setSelectedItem(selectedItem + 1);
                }
                break;
            case 'ArrowUp':
                if(selectedItem > 0){
                    setSelectedItem(selectedItem - 1);
                }
                break;
            case 'Backspace':
                if(location.length <= 1){
                    setIsOpen(false)
                }
                break;
            case 'Enter':
                setLocation(suggestions[selectedItem])
                setIsOpen(false)
                break;
            default:
                break; 
        }
    }

    const handleOnBlur = () => {
        setTimeout(() => {
            setIsOpen(false)
        }, 150);
    }

    return (
        <div>
            <TextField 
                onChange={(e) => handleChange(e.target.value)}
                value={location}
                label="Location"
                fullWidth={true}
                onKeyDown={(e) => handleKeyDown(e)}
                onBlur={() => handleOnBlur()}
                onFocus={() => setIsOpen(true)}
            />
            {
                suggestions.length > 0 && isOpen ? 
                    suggestions.map((suggestion, index) => {
                        return ( 
                            <MenuItem
                                key={index}
                                style={{
                                    fontWeight: selectedItem === index ? 500 : 400,
                                }}
                                selected={selectedItem === index}
                                onClick={() => handleSelect(index)}
                            >
                            {suggestion}
                            </MenuItem>
                        )
                    })
                : null
            }
        </div>
    );
}

export default AddressAutocomplete;