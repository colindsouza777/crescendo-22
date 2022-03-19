import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { fontSize } from "@mui/system";
import { CardMedia } from "@mui/material";
function Blocked(){
    return(
        <Box sx={{
            height:"600px",
            marginLeft:"100px",
            fontSize:"30px",
            alignItems:"center",
        }}>
        <CardMedia
          component="img"
          height="540"
          width="200"
          image="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?size=626&ext=jpg"
          alt="green iguana"
        />
            
            {"Your are not Authorized for this request ,please wait for the admin to verify your account"}
        </Box>
    )
}

export default Blocked;