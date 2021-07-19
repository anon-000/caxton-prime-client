import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react';

const AuroWhyUsSignleItem = ({image, title, description, percent='90%'}) => {
    return (
           <Grid style={{margin: '30px 0px'}} container item xs={12} md={6} justify={'center'} alignItems={'center'}>
               <Grid item xs={6} component={Box} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                   <img width={percent} src={image} />
               </Grid>
               <Grid item xs={6}>
                    <Box>
                        <Typography variant={'h3'}>
                            {title}
                        </Typography>
                        <Typography variant={'body2'}>
                            {description}
                        </Typography>

                    </Box>
               </Grid>
           </Grid>
    )
}

export default AuroWhyUsSignleItem
