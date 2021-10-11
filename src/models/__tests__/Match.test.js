import {Match} from '../Match';
import {API_X_SCALE, API_Y_SCALE} from "../../utils/Constants";


const buildFrame = ({
                        ball = [0, 0, 0],
                        left_team = [],
                        right_team = [],
                        action = 'idle',
                        grf_value = 0,
                        tamakeri_value = 0
                    }) => {
    return {
        'observation': {
            'ball': ball,
            'left_team': left_team,
            'right_team': right_team,
            'action': action,
        },
        'evaluation': {
            'grf': {
                'value': grf_value
            },
            'tamakeri': {
                'value': tamakeri_value
            }
        }
    }
}

it('test get match observation', () => {
    const match = new Match([
        buildFrame({
            ball: [1, 2, 3],
            left_team: [[1, 2], [3, 4]],
            right_team: [[5, 6]],
            action: 'idle'
        })
    ]);

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
});

it('test get value history', () => {
    const match = new Match([
        buildFrame({grf_value: 1, tamakeri_value: 2}),
        buildFrame({grf_value: 2, tamakeri_value: 3}),
        buildFrame({grf_value: 3, tamakeri_value: 4}),
        buildFrame({grf_value: 4, tamakeri_value: 5}),
    ]);

    expect(match.getNumSteps()).toEqual(4);
    expect(match.getEvaluation(0)).toEqual({
        'grf': {'value': 1},
        'tamakeri': {'value': 2}
    });
    expect(match.getValueHistory(0, 3)).toEqual({
        'grf': [0, 0, 1],
        'tamakeri': [0, 0, 2]
    });
    expect(match.getValueHistory(1, 3)).toEqual({
        'grf': [0, 1, 2],
        'tamakeri': [0, 2, 3]
    });
    expect(match.getValueHistory(2, 3)).toEqual({
        'grf': [1, 2, 3],
        'tamakeri': [2, 3, 4]
    });
    expect(match.getValueHistory(3, 3)).toEqual({
        'grf': [2, 3, 4],
        'tamakeri': [3, 4, 5]
    });
});