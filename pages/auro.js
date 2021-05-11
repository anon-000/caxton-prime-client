import { Box, Container, Grid } from '@material-ui/core'
import React from 'react'
import AuroWhyUsSignleItem from '../src/components/auroWhyUsSignleItem'

const Auro = () => {
    return (
        <div>
            <Container maxWidth={'xl'}>
                <Grid container spacing={4} component={Box} p={'20px'}>
                    <AuroWhyUsSignleItem />
                    <AuroWhyUsSignleItem />
                    <AuroWhyUsSignleItem />
                    <AuroWhyUsSignleItem />
                </Grid>
            </Container>
        </div>
    )
}

export default Auro 
