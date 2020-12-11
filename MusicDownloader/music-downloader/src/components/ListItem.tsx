import React, { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { resolve } from "dns";
import Item from "antd/lib/list/Item";

interface Props {
    item: Item;
    toggleItemSelected: ToggleItemSelected;
    startWork: StartWork;
    stopWork: StopWork;
}

export const ListItem: React.FC<Props> = ({ item , toggleItemSelected, startWork, stopWork }) => {
    // const [progress, setProgress] = useState(item.progress);
    // const [started, setStarted] = useState(false);
    // const delay = (ms: number) => {
    //     return new Promise( resolve => setTimeout(resolve, ms));
    // }

    // const getRandom = (max: number) => {
    //     return Math.floor(Math.random() * Math.floor(max))
    // }

    // const toggleItemComplete = (selectedItem: Item) => {
    //     item.complete = !item.complete;
    //   };

    // const startWork = () => {
    //     doWork();
    // };
    
    // const doWork = async () => {
    //     if(!started){
    //         setStarted(true);
    //         if(item.progress !== 0){
    //             // toggleItemComplete(item);
    //             item.progress = 0;
    //             setProgress(0);
    //         }
    //         while (item.progress < 100) {
    //             let addProgress = getRandom(20);
    //             // console.log(`${item.text}: ${item.progress + addProgress}`);
    //             item.progress = Math.min(item.progress + addProgress, 100);
    //             setProgress(item.progress);
    //             await delay(getRandom(3) * 1000);
    //         }
    //         // toggleItemComplete(item);
    //         setStarted(false);
    //     }
    // };
    // style={{ textDecoration: item.complete ? 'line-through' : undefined }}
    return ( 
        <li className="list-group-item row d-flex">
            <input className="col-1" 
            type="checkbox" 
            checked={item.selected}
            onClick={() => {toggleItemSelected(item)}} /> 
            <label className="col-4" style={{ fontWeight: item.selected ? 'bold' : 'normal' }}>
                {item.text}
            </label>
            <div className="col-5" >
                <ProgressBar animated={item.started && !item.complete} now={item.progress} label={`${item.progress}%`} variant={item.complete ? "success" : undefined}/>
            </div>
            { !item.started && !item.complete &&
                <button type="button" className="btn btn-sm btn-warning col-2" onClick={() => startWork(item)} disabled={item.started && !item.complete}>Start</button>
            }
            { item.complete &&
                <button type="button" className="btn btn-sm btn-success col-2" onClick={() => startWork(item)} disabled={item.started && !item.complete}>Restart</button>
            }
            { item.started && !item.complete &&
                <button type="button" className="btn btn-sm btn-danger col-2" onClick={() => stopWork(item)}>Stop</button>
            }
        </li>
    )
};