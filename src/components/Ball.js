import React from 'react'
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../utils/Constants';
import styles from "./Ball.module.css";

export const Ball = ({left, top,}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BALL,
        item: {left, top},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [left, top]);

    if (isDragging) {
        return <div ref={drag}/>;
    }
    const inlineStyle = {
        left: left,
        top: top,
    }
    return <div className={styles.ball} ref={drag} style={inlineStyle} role="Ball"/>;
};
