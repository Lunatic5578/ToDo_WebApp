import { useEffect, useState } from "react";
import styles from "./TodoApp.module.css";
import logo from "../assets/logo.jpeg"

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function TodoApp() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Enter your To-Do first!");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItems = (index) => {
    const updatedItems = items.filter((element) => {
      return index !== element.id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((element) => {
      return element.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  const deleteList = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
    <div className={styles.body}>
    <h1 className={styles.WelcomeMsg}>Welcome to the To-Do App!</h1>
      <div className={styles.mainDiv}>
        <div className={styles.header}>
        <img src={logo} alt="logo" />
        <h1 className={styles.heading}>To-Do List</h1>
        </div>
        <div className={styles.centerDiv}>
          <div className={styles.inputBox}>
            <input
              type="text"
              className={styles.inputField}
              value={inputData}
              placeholder="Enter your To-Do"
              onChange={(e) => setInputData(e.target.value)}
            />
            <div className={styles.inputBtn}>
              {toggleSubmit ? (
                <button title="Add Item" onClick={addItem}>
                  ➕
                </button>
              ) : (
                <button title="Update Item" onClick={addItem}>
                  ✍️
                </button>
              )}
            </div>
          </div>

          <div className={styles.itemBox}>
            {items.map((element) => {
              return (
                <div className={styles.eachItem} key={element.id}>
                  <div className={styles.list}>
                    <h3 className={styles.items}>{element.name}</h3>
                    <div className={styles.btn}>
                      <button className={styles.editBtn}
                        title="Edit Item"
                        onClick={() => editItem(element.id)}
                      >
                        ✍️
                      </button>
                      <button className={styles.delBtn}
                        title="Delete Item"
                        onClick={() => deleteItems(element.id)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {items.length!==0 ? <div className={styles.delAll}>
            <button title="Clear List" className={styles.delAllBtn} onClick={deleteList}>
              Delete All
            </button>
          </div> : <h1 className={styles.emptyMsg}> Your To-Do list is currently empty !</h1>} 
        </div>
      </div>
      
    </div>
    </>
  );
}

export default TodoApp;
