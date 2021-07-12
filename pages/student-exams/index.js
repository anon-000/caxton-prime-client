/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 28/06/21 4:07 am
 */
import {Container, makeStyles, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import ExamsTable from "./components/exams_table";
import TopicFilter from "./components/topic_filter";
import Typography from "@material-ui/core/Typography";
import cross from "../../src/asset/cross_icon.svg";


const useStyles = makeStyles((theme) => ({
    withHover: {
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid',
        '&:hover': {
            backgroundColor: "#F03D5F",
            color: '#ffffff',
            border: '1px solid', borderColor: '#F03D5F',
            fontWeight: '600'
        }
    },
    skeleton: {
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: '#FAF7F7'
    }
}));
const StudentExams = () => {
    const classes = useStyles();

    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState('');

    //console.log(tags);

    const selectTags = (tag) => {
        console.log(tag);
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    }

    const removeAtIndex = (index) => {
        let _list = tags;
        _list.splice(index, 1);
        setTags([..._list]);
    }


    return (
        <Container>
            <Grid container>
                <Grid item md={9} xs={12} sm={12}>
                    <Box m={6}/>
                    <Typography variant="h3">
                        Search for Exams {tags.length}
                    </Typography>
                    <Box m={2}/>
                    <Box width={'50%'}>
                        <TextField
                            fullWidth
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            variant="outlined"
                            placeholder={"Type to search"}
                        />
                    </Box>
                    {
                        tags.length === 0 ? <Box/> : <Box display={"flex"} flexWrap={'wrap'} mt={3} mb={-1}>
                            {
                                tags.map((e, index) => <Box
                                        display={'flex'}
                                        className={classes.withHover}
                                        my={0.8} mr={0.8} px={2} borderRadius={16}
                                        borderColor={'#FFEEF2'} bgcolor={'#FFEEF2'}
                                        color={'#F03D5F'} py={0.6}>
                                        {e.name}
                                        <Box ml={1.5} mt={0.2} onClick={() => removeAtIndex(index)}>
                                            <img src={cross} alt={'x'}/>
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                    }

                    <ExamsTable selectedTags={tags} search={query}/>
                </Grid>
                <Grid item md={3} xs={12} sm={12}>
                    <TopicFilter onClicked={selectTags}/>
                </Grid>
            </Grid>
        </Container>
    );
}


export default StudentExams