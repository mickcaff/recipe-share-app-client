import React, {useState, useEffect} from "react";
import axios from "axios";

function TodoList() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todo/item`, {
        item: itemText,
      });
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //Create function to fetch all todo items from database -- will use useEffect hook
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todo/items`);
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  //Delete Item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todo/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  //update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/todo/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updateItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      listItems[updateItemIndex].item = updateItemText;
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };

  //render update item form
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updateItem(e)}>
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => setUpdateItemText(e.target.value)}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo Item"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list-items">
        {listItems.map((item) => {
          return (
            <div className="todo-item" key={item._id}>
              {isUpdating === item._id ? (
                renderUpdateForm()
              ) : (
                <>
                  <p className="item-content">{item.item}</p>
                  <button
                    className="update-item"
                    onClick={() => {
                      setIsUpdating(item._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-item"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
