interface Item {
    text: string;
    complete: boolean;
    selected: boolean;
    started: boolean = false;
    progress: number;
    canceled: boolean = false;
}

type ToggleItemSelected = (selectedItem: Item) => void;
type StartWork = (selectedItem: Item) => void;
type StopWork = (selectedItem: Item) => void;

type AddItem = (text: string) => void;