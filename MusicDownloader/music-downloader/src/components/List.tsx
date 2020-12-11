import { ListItem } from "./ListItem"
import React, { useState } from "react"

interface Props {
    items: Item[];
    toggleItemSelected: ToggleItemSelected;
    startWork: StartWork;
    stopWork: StopWork;
}

export const List: React.FC<Props> = ({ items, toggleItemSelected, startWork, stopWork }) => {
    const [allStarted, setAllStarted] = useState(false);

    const startAllItems = () => {
        setAllStarted(true);

        setAllStarted(false);
    }

    return (
        <>
            <ul className="list-group">
                {items.map(item => (
                    <ListItem key={item.text} item={item} toggleItemSelected={toggleItemSelected} startWork={startWork} stopWork={stopWork}/>
                    // <ListItem key={item.text} item={item} />
                ))}
            </ul>
        </>
    );
};