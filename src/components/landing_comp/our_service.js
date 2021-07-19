/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description our_service.js
 * @createdOn 19/07/21 12:29 pm
 */

import {Box, Container, Grid, Typography} from '@material-ui/core'
import React from 'react'
import AuroWhyUsSignleItem from '../auroWhyUsSignleItem'
import Image1 from '../../../public/online_test.svg';
import Image2 from '../../../src/asset/why2.svg';
import Image3 from '../../../src/asset/why3.svg';
import Image4 from '../../../src/asset/why4.svg';
import Image5 from '../../../src/asset/why5.svg';
import Image6 from '../../../src/asset/bitcoin.svg';
import Image7 from '../../../src/asset/why7.svg';
import Image8 from '../../../src/asset/why8.svg';


const OurServices = () => {
    return (
        <Container style={{overflowX: 'hidden'}} maxWidth={'xl'} id={'why_us'}>
            <Grid container component={Box} p={{xs: '5px', md: '20px'}} >
                <Grid xs={12} item conatiner justify={'center'} alignItems={'center'}>
                    <Typography align={'center'} variant={'h2'} color={'primary'}>
                        {'Why Us ?'}
                    </Typography>
                </Grid>
                <Box my={4}/>
                <AuroWhyUsSignleItem
                    image={Image1}
                    title={'Online Examination'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl.'}
                />
                <AuroWhyUsSignleItem
                    image={Image2}
                    percent={'60%'}
                    title={'In Depth Analysis'}
                    isRight={true}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
                />
                <AuroWhyUsSignleItem
                    image={Image3}
                    title={'Self Evaluation'}
                    description={' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl .'}
                />
                <AuroWhyUsSignleItem
                    image={Image4}
                    percent={'60%'}
                    title={'Progress Overview'}
                    isRight={true}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
                /> <AuroWhyUsSignleItem
                image={Image5}
                percent={'60%'}
                title={'Super Cool Badges'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
            /> <AuroWhyUsSignleItem
                image={Image6}
                percent={'60%'}
                title={'Caxton Cred Coins'}
                isRight={true}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
            /> <AuroWhyUsSignleItem
                image={Image7}
                percent={'60%'}
                title={'Conduct Hassle-free Exams'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
            /> <AuroWhyUsSignleItem
                image={Image8}
                percent={'60%'}
                title={'Fully Functional Platform'}
                isRight={true}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur est ac pretium ullamcorper. Sed sagittis, lorem a semper convallis, ex nisl '}
            />
            </Grid>
        </Container>
    )
}

export default OurServices