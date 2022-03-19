import react from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { Container } from '@mui/material';
import NavBar from './NavBar';
import { ClassNames } from '@emotion/react';
import {makeStyles }from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    cards: {
      padding: theme.spacing(2),
      height: "95%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    space: {
      marginTop: theme.spacing(1),
    },
    question: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical"
    }
  }));
const donateData = [{
        title: '500 Coins',
        image: 'https://images.indianexpress.com/2018/08/keralafloods-759.jpg',
        valueRemaining: '$100',
        desc:"Massive floods across Kerala have killed more than 350 people and displaced more than 800,000. Flood waters have slowly receded in many areas, but we now enter the most difficult phase of recovery: when survivors return to their homes, only to find little remains. And countless families are discovering their homes have been completely destroyed by the flooding and landslides."
    },
    {
        
        title: 'Gujrat Earthquakes',
        image: 'https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2021/01/EsoL1OkXEAEQl6_.jpg?fit=512%2C288&ssl=1',
        valueRemaining: '$100',
        desc:"A devastating earthquake hit India this morning, killing more than 1,000 (based on news reports) as it toppled buildings and houses. The quake, measuring 6.9 on the Richter Scale and epicentered around 20 km north-east of Bhuj in Gujarat, occurred at 08:46 IST (Indian Standard Time) according to the Indian Seismological Department. "
    },
    {
        
        title: 'Uttarakhand Floods',
        image: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/07/05/844548-flash-flood-sarichamshil-village.jpg',
        valueRemaining: '$100',
        desc:"The Himalayan states of Uttarakhand and Himachal Pradesh were hit by torrential rain, landslides and flash floods on 14-17th June 2013. The erratic weather conditions have been attributed to early monsoons in Northern India. River Ganges and its major tributaries of Alaknanda and Bhagirathi have swelled up, causing widespread destruction in Uttarakhand"
    },
    ]

function Store(){
    const classes=useStyles();
    return(
    <Box >
    <NavBar/>
    <Box sx = {{display:'flex',
    "flex-wrap": 'wrap',
    }}>
      { donateData.map((number) =>
            <Box sx = {{
                    
                    marginLeft:"90px",
                    marginTop:"50px",
                    marginRight:"50px",
                    marginBottom:"50px",
                    }}> 
                <Card sx={{maxWidth:"345px"}}>
                                <CardActionArea>
                        <CardMedia
                        
                        component="img"
                        height="340"
                        image={number.image}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography variant="h5" component="p">
                            {number.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="justify" className={classes.question}>
                 {number.desc}
                    </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <Button variant="contained" href="/donate"size="large"sx={{backgroundColor:"#FBB03C", '&:hover':{backgroundColor:"white",color:"#FBB03C"}}}>Donate</Button>
                    </CardActions>
                    </Card>
            
            </Box>
          )}

          </Box>
          </Box>

    
    );

}

export default Store;