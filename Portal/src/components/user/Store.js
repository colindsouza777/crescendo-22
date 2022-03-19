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
import Navbar from './NavBar';
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
        image: 'https://www.nicepng.com/png/detail/103-1038735_game-coins-png-clip-art-free-download-game.png',
        valueRemaining: '$100',
        desc:"You can get  500 coins by 500Rs.",
        coins:"500",
    },
    {
        
        title: '1000 Coins',
        image: 'https://www.nicepng.com/png/detail/103-1038735_game-coins-png-clip-art-free-download-game.png',
        valueRemaining: '$100',
        desc:"You can get 1000 coins by 1000Rs.",
        coins:"1000",
    },
    {
        
        title: '10000 coins',
        image: 'https://www.nicepng.com/png/detail/103-1038735_game-coins-png-clip-art-free-download-game.png',
        valueRemaining: '$100',
        desc:"You can get 10000 coins by 10000Rs.",
        coins:"10000",
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
                    <Button variant="contained" onClick={()=>{localStorage.setItem('coinsBuy',number.coins)}} href="/user/buy"size="large"sx={{backgroundColor:"#FBB03C", '&:hover':{backgroundColor:"white",color:"#FBB03C"}}}>Buy</Button>
                    </CardActions>
                    </Card>
            
            </Box>
          )}

          </Box>
          </Box>

    
    );

}

export default Store;