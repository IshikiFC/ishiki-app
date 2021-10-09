import {Match} from '../Match';
import {API_X_SCALE, API_Y_SCALE} from "../../utils/Constants";


it('match test', () => {
    const match = new Match([{
        'observation': {
            'ball': [1, 2, 3],
            'left_team': [[1, 2], [3, 4]],
            'right_team': [[5, 6]],
            'action': 'idle'
        },
        'evaluation': {
            'grf': [
                ['dribble', 0.2],
                ['short_pass', 0.8]
            ]
        }
    }]);

    expect(match.getNumSteps()).toEqual(1);

    expect(match.getBall(0)).toEqual({
        x: 1 / API_X_SCALE,
        y: 2 / API_Y_SCALE,
    });

    expect(match.getPlayers(0)).toEqual({
        left0: {x: 1 / API_X_SCALE, y: 2 / API_Y_SCALE, team: 'left'},
        left1: {x: 3 / API_X_SCALE, y: 4 / API_Y_SCALE, team: 'left'},
        right0: {x: 5 / API_X_SCALE, y: 6 / API_Y_SCALE, team: 'right'}
    });

    expect(match.getAction(0)).toEqual('idle');

    expect(match.getEvaluation(0)).toEqual({
        'grf': [
            ['dribble', 0.2],
            ['short_pass', 0.8]
        ]
    });
})