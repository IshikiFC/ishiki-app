import React from 'react'
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../utils/Constants';
import styles from "./Player.module.css";


export const Player = ({id, left, top, team}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.PLAYER,
        item: {id, left, top},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    if (isDragging) {
        return <div ref={drag}/>;
    }
    const inlineStyle = {
        left: left,
        top: top,
        backgroundColor: team === 'left' ? 'black' : 'green'
    }
    return <div className={styles.player} ref={drag} style={inlineStyle} role="Ball"/>;
};
