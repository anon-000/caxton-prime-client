/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description about_us.js
 * @createdOn 19/07/21 12:29 pm
 */


import React from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import Image1 from '../../../src/asset/about1.svg';
import Image2 from '../../../src/asset/about2.svg';

const AboutUs = () => {
    return (
        <div id={'about_us'}>
            <Grid container >
                <Grid xs={12} item conatiner justify={'center'} alignItems={'center'}>
                    <Typography align={'center'} variant={'h2'} color={'primary'}>
                        {'About Us'}
                    </Typography>
                    <Box mb={4}/>
                </Grid>

                <Grid container justify={'center'} alignItems={'center'} item xs={12} sm={4} md={6}>
                    <img src={Image1} width={'80%'}/>
                </Grid>
                <Grid container justify={'flex-start'} alignItems={'center'} item xs={12} sm={8} md={6}>
                    <Typography style={{fontWeight: 900, marginBottom: '10px'}}
                                variant={'h5'}>{'How it started and how it’s going'}</Typography>
                    <Typography variant={'body2'}>
                        {'Nullam purus lacus, laoreet ac placerat sit amet, dignissim eu neque. Maecenas ultricies ultricies nisl, ut elementum arcu. Nunc vel ipsum eget sapien fringilla dapibus ut sit amet nunc. Cras ultrices ornare felis, ut elementum nunc convallis ac. Nullam tristique ultricies consequat. Integer vitae imperdiet libero, id placerat justo. Suspendisse potenti. Sed facilisis porttitor lorem ut semper. Nam nec varius velit. Integer blandit justo eget libero tincidunt placerat. Nulla sit amet elementum risus, ac molestie turpis. Duis congue odio a lectus pellentesque blandit. Etiam odio nisl, vestibulum sed eros in, tempus tincidunt libero.'}
                    </Typography>
                    <Typography variant={'body2'}>
                        {'Nullam purus lacus, laoreet ac placerat sit amet, dignissim eu neque. Maecenas ultricies ultricies nisl, ut elementum arcu. Nunc vel ipsum eget sapien fringilla dapibus ut sit amet nunc. Cras ultrices ornare felis, ut elementum nunc convallis ac. Nullam tristique ultricies consequat. Integer vitae imperdiet libero, id placerat justo. Suspendisse potenti. Sed facilisis porttitor lorem ut semper. Nam nec varius velit. Integer blandit justo eget libero tincidunt placerat. Nulla sit amet elementum risus, ac molestie turpis. Duis congue odio a lectus pellentesque blandit. Etiam odio nisl, vestibulum sed eros in, tempus tincidunt libero.'}
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{margin: '40px 0'}}>

                </Grid>

                <Grid container justify={'flex-start'} alignItems={'center'} item xs={12} sm={8} md={6}>
                    <Typography style={{fontWeight: 900 , marginBottom: '10px'}}
                                variant={'h5'}>{'None of us is as smart as all of us'}</Typography>
                    <Typography variant={'body2'}>
                        {'Nullam purus lacus, laoreet ac placerat sit amet, dignissim eu neque. Maecenas ultricies ultricies nisl, ut elementum arcu. Nunc vel ipsum eget sapien fringilla dapibus ut sit amet nunc. Cras ultrices ornare felis, ut elementum nunc convallis ac. Nullam tristique ultricies consequat. Integer vitae imperdiet libero, id placerat justo. Suspendisse potenti. Sed facilisis porttitor lorem ut semper. Nam nec varius velit. Integer blandit justo eget libero tincidunt placerat. Nulla sit amet elementum risus, ac molestie turpis. Duis congue odio a lectus pellentesque blandit. Etiam odio nisl, vestibulum sed eros in, tempus tincidunt libero.'}
                    </Typography>
                    <Typography variant={'body2'}>
                        {'Nullam purus lacus, laoreet ac placerat sit amet, dignissim eu neque. Maecenas ultricies ultricies nisl, ut elementum arcu. Nunc vel ipsum eget sapien fringilla dapibus ut sit amet nunc. Cras ultrices ornare felis, ut elementum nunc convallis ac. Nullam tristique ultricies consequat. Integer vitae imperdiet libero, id placerat justo. Suspendisse potenti. Sed facilisis porttitor lorem ut semper. Nam nec varius velit. Integer blandit justo eget libero tincidunt placerat. Nulla sit amet elementum risus, ac molestie turpis. Duis congue odio a lectus pellentesque blandit. Etiam odio nisl, vestibulum sed eros in, tempus tincidunt libero.'}
                    </Typography>
                </Grid>
                <Grid container justify={'center'} alignItems={'center'} item xs={12} sm={4} md={6}>
                    <img src={Image2} width={'80%'}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default AboutUs;