import React, {useCallback, useEffect, useRef, useState} from "react";
import {Field} from "./components/Field";
import update from "immutability-helper";
import {AgentMonitor} from "./components/AgentMonitor";
import {ControlPanel} from "./components/ControlPanel";
import {fetchMatch} from "./utils/ApiUtils";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
    const [step, setStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [match, setMatch] = useState(null);
    const [players, setPlayers] = useState(null);
    const [ball, setBall] = useState(null);
    const [probabilities, setProbabilitiess] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        fetchMatch(setMatch, setInitialized);
    }, []);

    useEffect(() => {
        if (match !== null) {
            if (step >= match.getNumSteps()) {
                setIsActive(false);
                setStep(0);
                clearInterval(intervalRef.current);
                return;
            }
            setPlayers(match.getPlayers(step));
            setBall(match.getBall(step));
            setProbabilitiess(match.getProbabilities(step));
        }

        if (isActive) {
            const intervalId = setInterval(() => {
                setStep(s => s + 1);
            }, 100);
            intervalRef.current = intervalId;
            return () => clearInterval(intervalRef.current);
        }
    }, [isActive, step, match]);

    const movePlayer = useCallback((id, x, y) => {
        setPlayers(update(players, {
            [id]: {
                $merge: {x, y},
            },
        }));
    }, [players, setPlayers]);

    const moveBall = useCallback((x, y) => {
        setBall({x: x, y: y});
    }, [ball, setBall]);

    const handleClickPlay = () => {
        setIsActive(!isActive);
    };


    if (!initialized) {
        return <div>Loading Match</div>;
    } else {
        return (
            <div className={styles.dashboard}>
                <div>
                    <ControlPanel
                        handleClickPlay={handleClickPlay}
                        isActive={isActive}
                        step={step}
                        stepMax={match.getNumSteps()}
                        handleChangeStep={setStep}
                    />
                    <Field
                        players={players}
                        ball={ball}
                        movePlayer={movePlayer}
                        moveBall={moveBall}
                    />
                </div>
                <AgentMonitor
                    players={players}
                    ball={ball}
                    probabilities={probabilities}
                />
            </div>
        );
    }
}