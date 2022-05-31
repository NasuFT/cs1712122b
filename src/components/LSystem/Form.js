import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ANIMATION_SPEEDS, L_SYSTEMS } from "../../constants/constants";
import { nanoid } from "nanoid";
import { calculateMaxIterations } from "../../api/lsystem/lsystem";
import { Delete as DeleteIcon } from "@mui/icons-material";

const lSystems = L_SYSTEMS;

function Form({
  system,
  isAnimate,
  iterations,

  systemDispatch,
  setIterations,
  setAnimate,
  setAnimationSpeed,
  setToReset,
}) {
  const [isCustomSystem, setCustomSystem] = useState(false);

  const [formAxiom, setFormAxiom] = useState("");
  const [formRules, setFormRules] = useState([]);
  const [formAngle, setFormAngle] = useState(90);
  const [formAnimationSpeed, setFormAnimationSpeed] = useState(0);

  const [maxIterations, setMaxIterations] = useState(0);

  useEffect(() => {
    const newMaxIterations = calculateMaxIterations(system);

    setMaxIterations(newMaxIterations);
    setIterations((iterations) =>
      iterations > newMaxIterations ? newMaxIterations : iterations
    );
  }, [system, setMaxIterations, setIterations]);

  useEffect(() => {
    setAnimationSpeed(calculateAnimationSpeed(formAnimationSpeed));
  }, [formAnimationSpeed, setAnimationSpeed]);

  useEffect(() => {
    if (!isCustomSystem) {
      return;
    }

    systemDispatch({ type: "updateAxiom", payload: formAxiom.split("") });
  }, [isCustomSystem, formAxiom, systemDispatch]);

  useEffect(() => {
    if (!isCustomSystem) {
      return;
    }

    const newRules = [];

    for (const formRule of formRules) {
      if (formRule.key === "" || formRule.successor === "") {
        continue;
      }

      newRules.push([formRule.key, formRule.successor.split("")]);
    }

    console.log(newRules);

    systemDispatch({ type: "updateRules", payload: newRules });
  }, [isCustomSystem, formRules, systemDispatch]);

  useEffect(() => {
    if (!isCustomSystem) {
      return;
    }

    systemDispatch({ type: "updateAngle", payload: formAngle });
  }, [isCustomSystem, formAngle, systemDispatch]);

  const handleInputSliderIterations = (event) => {
    setIterations(event.target.value);
  };

  const handleInputSwitchAnimate = (event) => {
    setAnimate(event.target.checked);
  };

  const handleInputSelectPreset = (event) => {
    if (event.target.value === "custom") {
      systemDispatch({ type: "clear" });
      setCustomSystem(true);
      return;
    }

    setCustomSystem(false);
    systemDispatch({
      type: "set",
      payload: lSystems.find(
        (system) => system.id === Number(event.target.value)
      ),
    });
  };

  const handleInputButtonResetAnimation = () => {
    setToReset(true);
  };

  const handleInputTextAxiom = (event) => {
    setFormAxiom(event.target.value);
  };

  const handleInputButtonRuleAdd = () => {
    setFormRules([...formRules, { id: nanoid(), key: "", successor: "" }]);
  };

  const handleInputSliderAnimationSpeed = (event) => {
    setFormAnimationSpeed(event.target.value);
  };

  const handleInputSliderAngle = (event) => {
    setFormAngle(event.target.value);
  };

  const handleInputTextAngle = (event) => {
    setFormAngle(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlurTextAngle = (event) => {
    if (event.target.value < 0) {
      setFormAngle(0);
    } else if (event.target.value > 180) {
      setFormAngle(180);
    }
  };

  const calculateAnimationSpeed = (value) => {
    return ANIMATION_SPEEDS[value];
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="l-system-form-preset-label">Preset</InputLabel>
          <Select
            labelId="l-system-form-preset-label"
            label="Preset"
            defaultValue={0}
            onChange={handleInputSelectPreset}
          >
            {lSystems.map((system) => (
              <MenuItem key={system.id} value={system.id}>
                {system.name}
              </MenuItem>
            ))}
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography gutterBottom>Iterations</Typography>
          <Slider
            defaultValue={2}
            sx={{ width: 0.8, mr: "auto", ml: "auto" }}
            min={0}
            max={maxIterations}
            value={iterations}
            step={1}
            marks
            valueLabelDisplay="auto"
            onChange={handleInputSliderIterations}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            control={
              <Switch checked={isAnimate} onChange={handleInputSwitchAnimate} />
            }
            label="Animate"
          />
        </FormControl>

        <Collapse in={isAnimate}>
          <FormControl fullWidth margin="normal">
            <Typography gutterBottom>Animation Speed (lines/s.)</Typography>
            <Slider
              min={0}
              max={ANIMATION_SPEEDS.length - 1}
              step={1}
              value={formAnimationSpeed}
              valueLabelDisplay="auto"
              sx={{ width: 0.8, mr: "auto", ml: "auto" }}
              onChange={handleInputSliderAnimationSpeed}
              scale={calculateAnimationSpeed}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleInputButtonResetAnimation}
            >
              Reset Animation
            </Button>
          </FormControl>
        </Collapse>
      </Paper>

      <Collapse in={isCustomSystem}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Axiom"
              value={formAxiom}
              onChange={handleInputTextAxiom}
              helperText='e.g. "F+f+F-F[FF]" (no spaces)'
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography gutterBottom>Angle</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  min={0}
                  max={180}
                  step={0.1}
                  marks={[{ value: 90, label: "90" }]}
                  value={formAngle}
                  valueLabelDisplay="auto"
                  onChange={handleInputSliderAngle}
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  value={formAngle}
                  size="small"
                  onChange={handleInputTextAngle}
                  onBlur={handleBlurTextAngle}
                  inputProps={{
                    step: 0.1,
                    min: 0,
                    max: 180,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography gutterBottom>Rules</Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              {formRules.map((formRule) => {
                const handleInputTextRuleKey = (event) => {
                  const newFormRule = {
                    ...formRule,
                    key: event.target.value,
                  };

                  setFormRules((rules) =>
                    rules.map((rule) => {
                      if (rule.id === formRule.id) {
                        return newFormRule;
                      }

                      return rule;
                    })
                  );
                };

                const handleInputTextRuleSuccessor = (event) => {
                  const newFormRule = {
                    ...formRule,
                    successor: event.target.value,
                  };

                  setFormRules((rules) =>
                    rules.map((rule) => {
                      if (rule.id === formRule.id) {
                        return newFormRule;
                      }

                      return rule;
                    })
                  );
                };

                const handleInputButtonRuleDelete = (event) => {
                  setFormRules((rules) =>
                    rules.filter((rule) => rule.id !== formRule.id)
                  );
                };

                return (
                  <React.Fragment key={formRule.id}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField
                          label="Key"
                          onChange={handleInputTextRuleKey}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <TextField
                          label="Successor"
                          onChange={handleInputTextRuleSuccessor}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <IconButton
                          aria-label="delete"
                          onClick={handleInputButtonRuleDelete}
                        >
                          <DeleteIcon sx={{ flexGrow: 1 }} />
                        </IconButton>
                      </FormControl>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
            <Button variant="contained" onClick={handleInputButtonRuleAdd}>
              Add Rule
            </Button>
          </FormControl>
        </Paper>
      </Collapse>
    </>
  );
}

export default Form;
