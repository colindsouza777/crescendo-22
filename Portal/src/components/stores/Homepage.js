import react from 'react';
import { Box } from '@mui/system';
import { CardContent, Container, Typography } from '@mui/material';
import { Card } from '@mui/material';
import NavBar from './NavBar';
import { CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Footer from './Footer';
function HomePage(){
    return(
        <Box>
            <NavBar/>
            <Box >
            <Grid container spacing={1} direction="row">
                <Grid item xs={6}>
                    <CardContent sx ={{
                        marginTop:"170px",
                        marginLeft:"150px"
                    }}>
                        <Typography  variant="h3" component="div" >
                        {"Report a homeless animal to help getting a good shelter"}
                        </Typography>
                    </CardContent>
                    <CardContent sx ={{
                        marginTop:"50px",
                        marginLeft:"150px"
                    }}>
                        <Button variant="outlined" size='large' href="/user/report">Report</Button>
                    </CardContent>
                    
                </Grid>
                <Grid item xs={6} >
                <Card  sx ={{
                        margin:"90px",
                    }}>
                    <CardMedia
                    component="img" 
                    height="400"
                    image = "https://picsum.photos/200"
                    ></CardMedia>
                </Card>
                </Grid>  
           
            </Grid>  
            </Box>
            <Footer/>
            
        </Box>
        
    );
}

export default HomePage;