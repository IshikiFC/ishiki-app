import React from 'react';
import {useDrop} from 'react-dnd';
import {FIELD_HEIGHT, FIELD_WIDTH, ItemTypes} from '../utils/Constants';
import {Player} from "./Player";
import {Ball} from "./Ball";
import {toLeft, toTop, toX, toY} from "../utils/CoordinateUtils";
import styles from "./Field.module.css";

const inlineStyle = {
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT
}

export const Field = ({players, ball, movePlayer, moveBall}) => {

    const [, drop] = useDrop(() => ({
        accept: [ItemTypes.PLAYER, ItemTypes.BALL],
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            switch (monitor.getItemType()) {
                case ItemTypes.PLAYER:
                    movePlayer(item.id, toX(left), toY(top));
                    break;
                case ItemTypes.BALL:
                    moveBall(toX(left), toY(top))
                    break;
            }

            return undefined;
        },
    }), [movePlayer]);

    return (
        <div ref={drop} className={styles.field} style={inlineStyle}>
            {Object.keys(players).map((key) => {
                const {x, y, team} = players[key];
                return <Player key={key} id={key} left={toLeft(x)} top={toTop(y)} team={team}/>;
            })}
            <Ball left={toLeft(ball.x)} top={toTop(ball.y)}/>
        </div>

    );
};
