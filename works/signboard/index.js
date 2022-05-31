const addInput = document.getElementById('add_input');
const addBtn = document.getElementById('add_btn');
const removeCompletedBtn = document.getElementById('delete_completed_btn');
const boardLists = document.querySelectorAll('.board_list');
const boardListItems = document.querySelectorAll('.board_list_item');
const storageName = 'boardLists';
const boardListStatuses = {
    untouched: 'untouched',
    working: 'working',
    completed: 'completed',
}


initializeLocalStorage(storageName);
addBtn.addEventListener('click', addItem);
removeCompletedBtn.addEventListener('click', () => removeList(boardListStatuses.completed));
createBoardList(boardLists);
let draggingBoardListItem = null;


function initializeLocalStorage(storageName) {
    const storage = localStorage.getItem(storageName);
    if (!storage) {
        const boardLists = {};
        for (const status in boardListStatuses) boardLists[status] = {};
        localStorage.setItem(storageName, JSON.stringify(boardLists));
    }
}

function addItem() {
    const value = addInput.value;
    const boardListStatus = boardListStatuses.untouched;
    const boardList = getBoardList(boardListStatus);
    const boardListItemId = saveBoardListItemToLocalStorage(value, boardListStatus);
    const boardListItem = createBoardListItem(boardListItemId, value, boardListStatus);
    boardList.appendChild(boardListItem);
    addInput.value = '';
}

function removeList(status) {
    const boardList = getBoardList(status);
    boardList.textContent = '';
    removeBoardListItemAll(status);
}

function getBoardList(status) {
    const boardLists = document.querySelectorAll('.board_list');
    for (const boardList of boardLists) {
        if (boardList.dataset.status === status) return boardList;
    }
}

function createBoardList(boardLists) {
    for (const boardList of boardLists) {
        const boardListStatus = boardList.dataset.status;
        boardList.addEventListener('dragover', dragOver);
        boardList.addEventListener('dragenter', dragEnter);
        boardList.addEventListener('dragleave', dragLeave);
        boardList.addEventListener('drop', dragDrop);
        const boardListFromLocalStorage = getBoardListFromLocalStorage(boardListStatus);
        for (const id in boardListFromLocalStorage) {
            const value = boardListFromLocalStorage[id];
            const boardListItem = createBoardListItem(id, value, boardListStatus);
            boardList.appendChild(boardListItem);
        }
    }
}

function createBoardListItem(id, value, status) {
    const boardListItem = document.createElement('li');
    boardListItem.textContent = value;
    boardListItem.id = id;
    boardListItem.draggable = true;
    boardListItem.dataset.status = status;
    boardListItem.className = 'board_list_item';
    boardListItem.addEventListener('dragstart', dragStart);
    boardListItem.addEventListener('dragend', dragEnd);

    return boardListItem;
}

function saveBoardListItemToLocalStorage(value, status) {
    const boardLists = getBoardListsFromLocalStorage();
    const boardList = boardLists[status];
    const boardListItemId = new Date().getTime();
    boardList[boardListItemId] = value;
    boardLists[status] = boardList;
    localStorage.setItem(storageName, JSON.stringify(boardLists));

    return boardListItemId;
}

function removeBoardListItemFromLocalStorage(id, status) {
    const boardLists = getBoardListsFromLocalStorage();
    const boardList = boardLists[status];
    delete boardList[id];
    boardLists[status] = boardList;
    localStorage.setItem(storageName, JSON.stringify(boardLists));
}

function removeBoardListItemAll(status) {
    const boardLists = getBoardListsFromLocalStorage();
    boardLists[status] = {};
    localStorage.setItem(storageName, JSON.stringify(boardLists));
}

function getBoardListFromLocalStorage(key) {
    const boardLists = getBoardListsFromLocalStorage();
    return boardLists[key];
}

function getBoardListsFromLocalStorage() {
    const boardLists = JSON.parse(localStorage.getItem(storageName));
    return !boardLists ? null : boardLists;
}

function dragStart() {
    this.className += ' dragging';
    draggingBoardListItem = this;
    setTimeout(() => {
        this.className = 'display-none';
    }, 0);
}

function dragEnd() {
    this.className = 'board_list_item';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter() {
    this.className += ' drag-entered';
}

function dragLeave() {
    this.className = 'board_list';
}

function dragDrop(e) {
    e.preventDefault();
    this.className = 'board_list';
    const boardStatus = this.dataset.status;
    removeBoardListItemFromLocalStorage(draggingBoardListItem.id, draggingBoardListItem.dataset.status);
    draggingBoardListItem.dataset.status = boardStatus;
    draggingBoardListItem.id = saveBoardListItemToLocalStorage(draggingBoardListItem.textContent, boardStatus);
    this.appendChild(draggingBoardListItem);
    draggingBoardListItem = null;
}
