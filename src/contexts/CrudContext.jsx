import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItems, setItems } from '../utils/localStorageHelpers';

const CrudContext = createContext(null);

const LOCAL_STORAGE_KEY ='crudData';

export const CrudProvider = ({children}) => {

  const [data,setData] = useState([]);

  useEffect(() => {
    setData(getItems(LOCAL_STORAGE_KEY));
  }, [])


  const addItem = (item) => {
    const newItem = {id: Date.now(), ...item};

    const updatedData = [...data, newItem];
    setData(updatedData);
    setItems(LOCAL_STORAGE_KEY, updatedData);
  };


  const updateItem = (id, updatedItem) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    setData(updatedData);
    setItems(LOCAL_STORAGE_KEY, updatedData);
  };

  const deleteItem = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    setItems(LOCAL_STORAGE_KEY, updatedData);
  };

  return (
    <CrudContext.Provider value={{ data, addItem, updateItem, deleteItem }}>
      {children}
    </CrudContext.Provider>
  );

}


export const useCrud = () => {
  return useContext(CrudContext);
};