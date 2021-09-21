import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import React from "react";
import {Dashboard} from "./Dashboard";

function App() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Dashboard/>
            </DndProvider>
        </div>
    )
}

export default App;
