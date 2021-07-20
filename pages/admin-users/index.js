/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 10/07/21 6:53 pm
 */
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import {Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AdminUsersTable from "./components/user_table";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));

const AdminUsers = () => {
    const classes = useStyles();
    const [query, setQuery] = useState();

    return (
        <Container>
            <Box m={6}/>
            <Typography data-aos="fade-down"
                        data-aos-duration="400" variant="h3">
                Search for Users
            </Typography>
            <Box m={2}/>
            <Box width={'40%'}>
                <TextField
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    fullWidth
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    variant="outlined"
                    placeholder={"Type to search"}
                />
            </Box>
            <AdminUsersTable search={query}/>
        </Container>
    )
}

export default AdminUsers
