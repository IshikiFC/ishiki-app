import React from 'react';
import {ActionProbabilityMonitor} from "./ActionProbabilityMonitor";
import styles from "./AgentMonitor.module.css";
import {ValueHistoryMonitor} from "./ValueHistoryMonitor";

export const AgentMonitor = ({match, step}) => {
    return (
        <div className={styles.container}>
            <ActionProbabilityMonitor
                evaluation={match.getEvaluation(step)}
                action={match.getAction(step)}
            />
            <ValueHistoryMonitor
                valueHistory={match.getValueHistory(step, 10)}
                windowSize={10}
            />
        </div>
    );
}