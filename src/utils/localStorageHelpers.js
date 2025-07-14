export const getItems = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};
