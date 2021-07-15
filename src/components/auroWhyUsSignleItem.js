// import { Box, Grid, Typography } from '@material-ui/core'
// import React from 'react';
// import Image1 from '../../public/online_test.svg';
//
// const AuroWhyUsSignleItem = () => {
//     return (
//            <Grid container item xs={12} md={6} justify={'center'} alignItems={'center'}>
//                <Grid item xs={6} component={Box} display={'flex'} justifyContent={'center'} alignItems={'center'}>
//                    <img width={'90%'} src={Image1} />
//                </Grid>
//                <Grid item xs={6}>
//                     <Box>
//                         <Typography variant={'h4'}>
//                             {'Online Examination'}
//                         </Typography>
//                         <Typography variant={'body2'}>
//                             {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
//                         </Typography>
//
//                     </Box>
//                </Grid>
//            </Grid>
//     )
// }
//
// export default AuroWhyUsSignleItem


import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react';

const AuroWhyUsSignleItem = ({ image, title, description }) => {
    return (
        <Grid component={Box} container item xs={12} md={6} justify={'center'} alignItems={'center'}
              p={{ xs: 1, md: 4 }}>
            <Grid item xs={6} component={Box} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img width={'90%'} src={image} />
            </Grid>
            <Grid item xs={6}>
                <Box>
                    <Typography variant={'h3'} color={'primary'}>
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
