import React from 'react';
import {ActionProbabilityMonitor} from "./ActionProbabilityMonitor";
import styles from "./AgentMonitor.module.css";

export const AgentMonitor = ({evaluation, action}) => {
    return (
        <div className={styles.container}>
            <ActionProbabilityMonitor
                evaluation={evaluation}
                action={action}
            />
        </div>
    );
}