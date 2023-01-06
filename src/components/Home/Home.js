import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "../Sidebar/Sidebar";
import Advert from "../Advert/Advert";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "white",
  },
}));

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [advertList, setAdvertList] = useState([]);
  const classes = useStyles();

  const refreshAdverts = () => {
    axios
      .get("/adverts")
      .then(
        (response) => {
          const { adverts } = response.data;
          setIsLoaded(true);
          setAdvertList(adverts);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refreshAdverts()
  }, [])

  return (
    <>
      <Grid container spacing={2} columns={24}>
        <Grid xs={6} md={4}>
          <Sidebar></Sidebar>
        </Grid>

        <Grid xs={18} md={20}>
          <Box>
            <Grid container spacing={2}>
              <Grid>{"Vasıta Vitrini"}</Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              {advertList.map((advertDto) => (
                <Grid>
                  <Tooltip title={advertDto.title}>
                    <Card sx={{ width: 240 }}>
                      <CardMedia
                        sx={{ height: 120 }}
                        image="/Images/kona.png"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h10" component="div">
                          {advertDto.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
