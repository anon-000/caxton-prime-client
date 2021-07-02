/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description topic_filter.js
 * @createdOn 01/07/21 1:26 am
 */
import Box from "@material-ui/core/Box";
import Tag from "../../../src/asset/tag.svg";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {getAllTags} from "../../../src/apis/tags";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";


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


const TopicFilter = ({onClicked}) => {

    const [loading, setLoading] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const [tagsData, setTagData] = useState(null);
    const classes = useStyles();


    useEffect(() => {
        console.log("filter comp");
        setLoading(true);
        getAllTags().then((res) => {
            console.log(res);
            setTagData(res.data);
        }).catch((error) => {
            enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
        }).finally(() => {
            setLoading(false);
        });

    }, []);


    return (
        <Box mx={8} mt={28}>
            <Box display={'flex'}>
                <img src={Tag} alt={'tag'}/>
                <Box m={0.8}/>
                <Box component={Typography} style={{fontSize: '20px'}} color={'#F03D5F'} fontWeight={'500'}>
                    Topics
                </Box>
            </Box>
            <Box m={1}/>
            {
                loading ? <Box display={'flex'} mt={5} ml={5}>
                    <CircularProgress size={24}/>
                </Box> : <Box display={"flex"} flexWrap={'wrap'}>
                    {
                        tagsData.map((e) => <Box
                            onClick={() => onClicked(e)}
                            className={classes.withHover}
                            my={0.8} mr={0.6} px={2} borderRadius={16}
                            borderColor={'#FFEEF2'} bgcolor={'#FFEEF2'}
                            color={'#F03D5F'} py={0.6}>
                            {e.name}
                        </Box>)
                    }
                </Box>
            }
        </Box>
    )
}

export default TopicFilter


const FilterSkeleton = () => {

    const classes = useStyles();

    const data = new Array(length).fill(0); //[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];

    return (
        <Box display={"flex"} flexWrap={'wrap'}>
            {
                data.map((e) => <Box
                    className={classes.skeleton}
                    my={0.8} mr={0.6} px={2} borderRadius={16}
                    borderColor={'#FAF7F7'}
                    color={'#FAF7F7'} py={0.6}
                    width={200} height={34}
                >
                </Box>)
            }
        </Box>
    )
}