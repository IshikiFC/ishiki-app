// https://github.com/google-research/football/blob/master/gfootball/doc/observation.md
import {Match} from "../models/Match";
import {API_X_SCALE, API_Y_SCALE} from "./Constants";


export const fetchMatch = (setMatch, setInitialized) => {
    fetch('http://localhost:5000/match?name=tamakeri_hard')
        .then(response => response.json())
        .then(json => new Match(json))
        .then(match => setMatch(match))
        .then(() => setInitialized(true));
}

export const buildObservation = (players, ball) => {
    const left_team = []
    const right_team = []

    Object.keys(players).map((key) => {
        const player = players[key];
        if (player.team === 'left') {
            left_team.push(convertPlayer(player))
        } else {
            right_team.push(convertPlayer(player))
        }
    })

    return {
        'left_team': left_team,
        'right_team': right_team,
        'ball': convertBall(ball),
        'active': 0
    }
}

export const buildEmptyObservation = () => {
    const left_team = []
    const right_team = []
    for (let i = 0; i < 11; i++) {
        left_team.push([0, 0])
        right_team.push([0, 0])
    }
    return {
        'left_team': left_team,
        'right_team': right_team,
        'ball': [0, 0, 0],
        'active': 0
    }
}

export const convertPlayer = (player) => {
    return [player.x * API_X_SCALE, player.y * API_Y_SCALE];
}

export const convertBall = (ball) => {
    return [ball.x * API_X_SCALE, ball.y * API_Y_SCALE, 0];
}