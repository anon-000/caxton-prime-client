import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (

    <Box
      width={'100%'}
      height={'100vh'}
      justifyContent={'space-between'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Container maxWidth={'xl'}>
        <Grid
          container
          component={Box}
          height={'50vh'}
          spacing={4}
          alignItems={'center'}
        >
          <Grid
            item
            container
            xs={12} md={7}
            // justify={'center'}
            alignItems={'center'}
          >
            <Box md={'30px'} display={'flex'}>
              <Typography variant={'h1'}>
                {'Welcome to '}
              </Typography>
              <Box mr={1} />
              <Typography color={'primary'} variant={'h1'}>
                {' IMCA Bank'}
              </Typography>
            </Box>
            <Box>
              <Typography variant={'body2'}>
                {'Here our priority is your covinience so that you can do multiple tasks from your own home without physically coming to the bank'}
              </Typography>
            </Box>
          </Grid>
          <Grid container direction={'column'} item xs={12} md={5}>
            <Button component={Box} m={3} width={'200px'} variant={'contained'} color={'primary'} >{'Login'}</Button>
            <Button component={Box} width={'200px'} variant={'contained'} color={'secondary'} >{'Contact Us'}</Button>
          </Grid>
        </Grid>
      </Container>


      <svg width="100%" height="544" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 277.53C1 277.53 57.835 213.072 112.835 194.08C232.04 152.916 298.696 275.878 424.654 277.53C661.924 280.641 732.027 26.0351 968.225 3.04924C1153.66 -14.9971 2000.8 192.0293 2000.7 94.0401V329.574V543.464H1V407.641V277.53Z" fill="#6C63FF" stroke="#6C63FF" />
      </svg>

    </Box>
  )
}
