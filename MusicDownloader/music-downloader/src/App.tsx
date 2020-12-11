import React, { useState } from 'react';
import './App.css';
// import StateHooksComponent from './components/StateHooksComponent';
import { List } from './components/List';
import { AddItemForm } from './components/AddItemForm';
import { Button, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ProgressCircle } from './components/ProgressCircle/ProgressCircle';

const initialItems: Item[] = [
  {
    text: 'item1',
    complete: false,
    selected: false,
    started: false,
    progress: 0,
    canceled:false
  },
  {
    text: 'item2',
    complete: false,
    selected: false,
    started: false,
    progress: 0,
    canceled: false
  },
  {
    text: 'item3',
    complete: false,
    selected: false,
    started: false,
    progress: 0,
    canceled: false
  },
  {
    text: 'item4',
    complete: false,
    selected: false,
    started: false,
    progress: 0,
    canceled: false
  },
  {
    text: 'item5',
    complete: false,
    selected: false,
    started: false,
    progress: 0,
    canceled: false
  }
]

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [itemsSelected, setItemsSelected] = useState(false);
  const [itemsStarted, setItemsStarted] = useState(0);
  const [detailsText, setDetailsText] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  
  const delay = (ms: number) => {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  const getRandom = (max: number) => {
      return Math.floor(Math.random() * Math.floor(max))
  }

  const selectAll = () => {
      if(items.some(item => item.selected)){
        items.filter(item => item.selected).forEach(item => toggleItemSelected(item));
      }else{
        items.forEach(item => toggleItemSelected(item));
      }
  }

  const toggleItemSelected = (selectedItem: Item) => {
    let index = items.indexOf(selectedItem);
    if(index != -1){
      items[index].selected = !items[index].selected;
    }
    // const newItems = items.map(item => {
    //   // console.log(`${item.text}: ${item.complete}`);
    //   if(item === selectedItem){
    //     return {
    //       ...item,
    //       selected: !item.selected,
    //     };
    //   }
    //   return item;
    // });
    setItemsSelected(items.some(item => item.selected));
    setItems(items => [...items]);
  };

  // const startAllItems = () => {
  //   items.forEach(item => {
  //     item.
  //   });
  // }

  const addItem: AddItem = (text: string) => {
    console.log(items.length);
    const newItem = {text, complete: false, selected: false, started: false, progress: 0, canceled: false};
    setItems(items => [...items, newItem]);
    console.log(items.length);
  }

  const deleteSelectedItems = () => {
    setItems(items => items.filter(item => !item.selected));
  }

  const printDetails = () => {
    setDetailsText("");
    var itemsInfo = items.map(item => item.text + ': ' + item.progress).join("\n");
    itemsInfo += "\nitems running: " + items.filter(item => item.started).length;
    setDetailsText(itemsInfo);
    // items.map(item => console.log(item.text + ': ' + item.progress));
  }

  const startWorkAll = () => {
    items.filter(item => item.selected).forEach(item => {
      item.selected = false;
      startWork(item);
    });
    // setItems(items => [...items]);
  }

  const stopWorkAll = () => {
    items.filter(item => item.started).forEach(item => {
      stopWork(item);
    })
  }

  const startWork = (item: Item) => {
    doWork(item);
  }

  const stopWork = (item: Item) => {
    cancelWork(item);
  }

  const updateItemsStarted = () => {
    setItemsStarted(items.filter(item => item.started).length);
  }

  const updateOverallProcess = () => {
    var startedItems = items.filter(item => item.started)
    var average = 0;
    startedItems.forEach(element => average += element.progress);
    if(startedItems.length > 0){
      setOverallProgress(Math.ceil(average / startedItems.length * 10) / 10)
    }else{
      setOverallProgress(100);
    }
  }

  const doWork = async (item: Item) => {
      if(!item.started){
          item.canceled = false;
          item.started = true;
          item.complete = false;
          updateItemsStarted();
          if(item.progress !== 0){
              // toggleItemComplete(item);
              item.progress = 0;
          }
          while (!item.complete && !item.canceled) {
              let addProgress = getRandom(20);
              // console.log(`${item.text}: ${item.progress + addProgress}`);
              item.progress = Math.min(item.progress + addProgress, 100);
              updateOverallProcess();
              item.complete = item.progress === 100;
              setItems(items => [...items]);
              await delay(getRandom(3) * 1000);
          }
          // toggleItemComplete(item);
          item.started = false;
          updateItemsStarted();
          setItems(items => [...items]);
      }
  }

  const cancelWork = async (item: Item) => {
    if(item.started && !item.complete){
        item.canceled = true;
        item.started = false;
        item.complete = false;

        if(item.progress !== 0){
            // toggleItemComplete(item);
            item.progress = 0;
        }
        
        updateItemsStarted();
        updateOverallProcess();

        setItems(items => [...items]);
    }
  }

  return (
    <div className="App">
      <>
        <AddItemForm addItem={addItem}/>
        <List items={items} toggleItemSelected={toggleItemSelected} startWork={startWork} stopWork={stopWork}/>
        <Button className="btn btn-sm col-2" onClick={selectAll} >De/Select All</Button>
        <Button className="btn btn-sm btn-warning col-2" onClick={startWorkAll} disabled={!itemsSelected}>Start</Button>
        <Button className="btn btn-sm btn-danger col-2" onClick={stopWorkAll} disabled={itemsStarted == 0}>Stop</Button>
        <Button onClick={printDetails}>Print Details</Button>
        <Button onClick={deleteSelectedItems}>Delete Selected Items</Button>
        <TextArea value={detailsText} readOnly />
        <ProgressCircle progress={overallProgress} size={200} strokeWidth={15} circleOneStroke='#d9edfe' circleTwoStroke='#dddddd'
        />
      </>
    </div>
  )
}

export default App;
