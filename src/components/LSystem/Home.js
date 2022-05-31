import { Grid, Stack } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { L_SYSTEMS } from "../../constants/constants";
import { systemReducer } from "../../reducer";
import Form from "./Form";
import Interface from "./Interface";
import Text from "./Text";

function Home() {
  const [system, systemDispatch] = useReducer(systemReducer, L_SYSTEMS[0]);

  useEffect(() => {
    console.log(system);
  }, [system]);

  const [iterations, setIterations] = useState(2);
  const [isAnimate, setAnimate] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const [toReset, setToReset] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Form
          system={system}
          isAnimate={isAnimate}
          iterations={iterations}
          systemDispatch={systemDispatch}
          setIterations={setIterations}
          setAnimate={setAnimate}
          setAnimationSpeed={setAnimationSpeed}
          setToReset={setToReset}
        />
      </Grid>
      <Grid item xs={9}>
        <Stack spacing={2} sx={{ height: 800 }}>
          <Text text={system.name} sx={{ height: 100 }} />
          <Interface
            iterations={iterations}
            isAnimate={isAnimate}
            system={system}
            animationSpeed={animationSpeed}
            toReset={toReset}
            setToReset={setToReset}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Home;
