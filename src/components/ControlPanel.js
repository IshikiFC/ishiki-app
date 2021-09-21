import React from 'react'
import {Slider} from "@mui/material";
import styles from "./ControlPannel.module.css";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


export const ControlPanel = ({handleClickPlay, isActive, handleChangeStep, step, stepMax}) => {
    return (
        <div className={styles.panel}>
            <p>step={step}</p>
            <div className={styles.controller}>
                <IconButton className={styles.button} onClick={handleClickPlay}>
                    {isActive ? <PauseIcon/> : <PlayArrowIcon/>}
                </IconButton>
                <Slider className={styles.slider}
                        value={step}
                        max={stepMax}
                        onChange={(e) => handleChangeStep(e.target.value)}
                        valueLabelDisplay="on"
                />
            </div>
        </div>
    );
}