const users = [];

const addUser = ({ id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => 
        user.room === room && user.name === name);

    if(existingUser){
        return { error: 'Username already taken in this room' }
    }

    const user = {id, name, room};
    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        // Removes elements from an array
        // @param start — The zero-based location in the 
            // array from which to start removing elements.
        // @param deleteCount
            // The number of elements to remove. 
            // Omitting this argument will remove all 
            // elements from the start paramater location to end of the array.
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export  { addUser, removeUser, getUser, getUsersInRoom};