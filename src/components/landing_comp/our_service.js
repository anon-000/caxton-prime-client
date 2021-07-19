/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description our_service.js
 * @createdOn 19/07/21 12:29 pm
 */

import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AuroWhyUsSignleItem from '../auroWhyUsSignleItem'
import Image1 from '../../../public/Group 546.svg';
import Image2 from '../../../public/Group 546.svg';
import Image4 from '../../../public/Group 546.svg';
import Image3 from '../../../public/Group 546.svg';

const OurServices = () => {
    return (
        <Container maxWidth={'xl'}>
            <Grid container component={Box} p={{ xs: '5px', md: '20px' }}>
                <Grid xs={12} item conatiner justify={'center'} alignItems={'center'}>
                    <Typography align={'center'} variant={'h2'} color={'primary'}>
                        {'Our Sevices'}
                    </Typography>
                </Grid>
                <Box my={4} />
                <AuroWhyUsSignleItem
                    image={Image1}
                    title={'Balance Enquiry'}
                    description={'You can check the available balance of your account, minimum balance that should be always there in your account.'}
                />
                <AuroWhyUsSignleItem
                    image={Image2}
                    title={'Funds Transfer'}
                    description={'You can transfer money from your account to another account of our bank.'}
                />
                <AuroWhyUsSignleItem
                    image={Image3}
                    title={'Mini Statement'}
                    description={' You can get your list of transactions you have made in current month.'}
                />
                <AuroWhyUsSignleItem
                    image={Image4}
                    title={'Account Details'}
                    description={'You Can check your account details such as account type, account number, branch, ifsc code etc'}
                /> <AuroWhyUsSignleItem
                image={Image4}
                title={'Account Details'}
                description={'You Can check your account details such as account type, account number, branch, ifsc code etc'}
            /> <AuroWhyUsSignleItem
                image={Image4}
                title={'Account Details'}
                description={'You Can check your account details such as account type, account number, branch, ifsc code etc'}
            /> <AuroWhyUsSignleItem
                image={Image4}
                title={'Account Details'}
                description={'You Can check your account details such as account type, account number, branch, ifsc code etc'}
            /> <AuroWhyUsSignleItem
                image={Image4}
                title={'Account Details'}
                description={'You Can check your account details such as account type, account number, branch, ifsc code etc'}
            />
            </Grid>
        </Container>
    )
}

export default OurServices