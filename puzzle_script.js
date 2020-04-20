const dragstart_handler = ev => {
    console.log("dragstart");
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
}

const dragover_handler = ev => {
    console.log("dragOver");
    ev.preventDefault();
}

const drop_handler = ev => {
    console.log("drag")
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.innerText = document.getElementById(data).innerText;

    // once dropped, unempty the cell :)
    ev.target.classList.remove("empty")
    // remove relevant attributes
    ev.target.setAttribute("ondrop", "");
    ev.target.setAttribute("ondragover", "");
    document.getElementById(data).innerText = "";
}

const dragend_handler = ev => {
    console.log("dragEnd");
    // Remove all of the drag data
    ev.dataTransfer.clearData();
  
    // set new droppable and draggable attributes
    setDroppable(document.querySelectorAll('li'));
    setDraggable(document.querySelectorAll('li'))
}

// select the list items
let ul = document.querySelectorAll('li');;
const letters= ["A", "B", "C", "D", "E", "F", "G", "H", ""]

// this function sets a unique id for each list item, in the form 'li0' to 'li8'
const setId = (items) => {
    for(let i = 0; i < items.length; i++) {
        items[i].setAttribute("id", `li${i}`)
    }
}

const fillGrid = (items, letters) => {
    let shuffled = shuffle(letters);

    items.forEach((item, i) => {
        item.innerText = shuffled[i];
    })
}

fillGrid(ul, letters);

// shuffle the array
const shuffle = (arr) => {
    const copy = [...arr];
    // loop over the array
    for(let i = 0; i < copy.length; i++) {
        // for each index,i pick a random index j 
        let j = parseInt(Math.random()*copy.length);
        // swap elements at i and j
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }   
    return copy;
 }


 function setUp() {
    fillGrid(ul, letters);
    setId(ul);
    // set up the droppable and dragabble contents
    setDroppable(ul) ;
    setDraggable(ul);

}

const state = {}
state.content = letters;

/**
 * setters
*/
const setDroppable = (items) => {
    items.forEach((item, i) => {
        if(!item.innerText) {
            item.setAttribute("ondrop", "drop_handler(event);");
            item.setAttribute("ondragover", "dragover_handler(event);");
            item.setAttribute("class", "empty");
        }
        return;
    })
}

const setDraggable = (items) => {
    items.forEach(item => {
            item.setAttribute("draggable", "true");
            item.setAttribute("ondragstart", "dragstart_handler(event)");
            item.setAttribute("ondragend", "dragend_handler(event)");
    })
}