let id: number = parseInt(localStorage.getItem('_maxId') || '0') || 0;

function createId() {
    id++;
    localStorage.setItem('_maxId', id.toString());
    return id;
}

export default createId;