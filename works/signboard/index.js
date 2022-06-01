const addInput = document.getElementById('add_input');
const addBtn = document.getElementById('add_btn');
const removeCompletedBtn = document.getElementById('delete_completed_btn');
const boardLists = document.querySelectorAll('.board_list');
const storageName = 'boardLists';
const boardListStatuses = {
    untouched: 'untouched',
    working: 'working',
    completed: 'completed',
}


initializeLocalStorage(storageName);
addBtn.addEventListener('click', () => addBoardListItem(boardListStatuses.untouched));
removeCompletedBtn.addEventListener('click', () => removeBoardListItemAll(boardListStatuses.completed));
createBoardLists(boardLists);
let draggingBoardListItem = null;


function initializeLocalStorage(storageName) {
    const storage = localStorage.getItem(storageName);
    if (!storage) {
        const boardLists = {};
        for (const status in boardListStatuses) boardLists[status] = {};
        localStorage.setItem(storageName, JSON.stringify(boardLists));
    }
}

function addBoardListItem(status) {
    const value = addInput.value.trim();
    if (value === '') return;
    const boardList = getBoardList(status);
    const boardListItemId = saveBoardListItemToLocalStorage(value, status);
    const boardListItem = createBoardListItem(boardListItemId, value, status);
    boardList.appendChild(boardListItem);
    addInput.value = '';
}

function removeBoardListItemAll(status) {
    const boardList = getBoardList(status);
    boardList.textContent = '';
    removeBoardListItemAllFromLocalStorage(status);
}

function getBoardList(status) {
    const boardLists = document.querySelectorAll('.board_list');
    for (const boardList of boardLists) {
        if (boardList.dataset.status === status) return boardList;
    }
}

function createBoardLists(boardLists) {
    for (const boardList of boardLists) {
        createBoardList(boardList);
    }
}

function createBoardList(boardList) {
    const status = boardList.dataset.status;
    boardList.addEventListener('dragover', dragOver);
    boardList.addEventListener('dragenter', dragEnter);
    boardList.addEventListener('dragleave', dragLeave);
    boardList.addEventListener('drop', dragDrop);
    const boardListFromLocalStorage = getBoardListFromLocalStorage(status);
    for (const id in boardListFromLocalStorage) {
        const value = boardListFromLocalStorage[id];
        const boardListItem = createBoardListItem(id, value, status);
        boardList.appendChild(boardListItem);
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

function removeBoardListItemAllFromLocalStorage(status) {
    const boardLists = getBoardListsFromLocalStorage();
    boardLists[status] = {};
    localStorage.setItem(storageName, JSON.stringify(boardLists));
}

function getBoardListFromLocalStorage(status) {
    const boardLists = getBoardListsFromLocalStorage();
    return boardLists[status];
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
    const status = this.dataset.status;
    removeBoardListItemFromLocalStorage(draggingBoardListItem.id, draggingBoardListItem.dataset.status);
    draggingBoardListItem.dataset.status = status;
    draggingBoardListItem.id = saveBoardListItemToLocalStorage(draggingBoardListItem.textContent, status);
    this.appendChild(draggingBoardListItem);
    draggingBoardListItem = null;
}
