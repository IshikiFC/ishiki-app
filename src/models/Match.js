import {API_X_SCALE, API_Y_SCALE} from "../utils/Constants";

export class Match {
    constructor(api_response) {
        this.match = api_response.map(
            (api_frame) => this.convertFrame(api_frame)
        );
    }

    convertFrame = (api_frame) => {
        const observation = api_frame['observation']
        const evaluation = api_frame['evaluation']

        const ball = this.convertBall(observation['ball']);
        const players = {};
        observation['left_team'].forEach((api_player, i) => {
            const playerId = `left${i}`
            players[playerId] = this.convertPlayer(api_player, 'left')
        });
        observation['right_team'].forEach((api_player, i) => {
            const playerId = `right${i}`
            players[playerId] = this.convertPlayer(api_player, 'right')
        });
        const action = observation['action']

        return {
            ball: ball,
            players: players,
            action: action,
            evaluation: evaluation
        };
    }

    convertPlayer = (api_player, team) => {
        return {
            x: api_player[0] / API_X_SCALE,
            y: api_player[1] / API_Y_SCALE,
            team: team
        }
    }

    convertBall = (api_ball) => {
        return {
            x: api_ball[0] / API_X_SCALE,
            y: api_ball[1] / API_Y_SCALE
        }
    }

    getPlayers = (step) => {
        return this.match[step]['players']
    }

    getBall = (step) => {
        return this.match[step]['ball']
    }

    getAction = (step) => {
        return this.match[step]['action']
    }

    getEvaluation = (step) => {
        return this.match[step]['evaluation']
    }

    getValueHistory = (step, windowSize) => {
        const matchHistory = this.match.slice(Math.max(0, step - windowSize + 1), step + 1);
        const prefill = new Array(Math.max(0, windowSize - step - 1)).fill(0);
        const agents = Object.keys(matchHistory[0]['evaluation']);
        return agents.reduce((vh, agent) => {
            vh[agent] = prefill.concat(matchHistory.map(f => f['evaluation'][agent]['value']));
            return vh;
        }, {})
    }

    getNumSteps = () => {
        return this.match.length;
    }
}