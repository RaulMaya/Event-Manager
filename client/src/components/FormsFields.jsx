import React from 'react';

import {
    Box,
    Button,
    chakra,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Grid,
    useToast,
    Spinner,
    Alert
} from "@chakra-ui/react";

const FormFields = ({ name, text, val, handler, type }) => {
    const pHolder = `Enter ${text}`
    const typeDefiner = (type) => {
        if (type === "input") {
            return (
                <Input
                    type="text"
                    name={name}
                    value={val}
                    onChange={handler}
                    placeholder={pHolder}
                />
            );
        } else if (type === "textarea") {
            return (
                <Textarea
                    name={name}
                    value={val}
                    onChange={handler}
                    placeholder={pHolder}
                />
            )
        } else if (type === "date") {
            return (
                <Input
                    type="date"
                    name={name}
                    value={val}
                    onChange={handler}
                    placeholder={pHolder}
                />
            )
        } else if (type === "coords") {
            return (
                <Input
                    name={name}
                    value={val}
                    onChange={handler}
                    type="number"
                    pattern="-?[0-9]*\.?[0-9]+"
                    placeholder={pHolder}
                    isInvalid={
                        { val } < -90 || { val } > 90
                    }
                />
            )
        } else {
            return (
                <Input
                    type="number"
                    name={name}
                    value={val}
                    onChange={handler}
                    placeholder={pHolder}
                />
            )
        }

    }
    return (
        <FormControl mb={4}>
            <FormLabel>{text}</FormLabel>
            {typeDefiner(type)}
        </FormControl>
    )
}

export default FormFields;