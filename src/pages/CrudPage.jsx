import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCrud } from '../contexts/CrudContext'

const ITEMS_PER_PAGE = 5;

const CrudPage = () => {
  const { data, addItem, updateItem, deleteItem } = useCrud();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';
  const initialPage = parseInt(queryParams.get('page')) || 1;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [editedItemName, setEditedItemName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (currentPage !== 1) params.set('page', currentPage.toString());
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, currentPage, navigate]);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addItem({ name: newItemName.trim() });
      setNewItemName('');
      setIsAdding(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditedItemName(item.name);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (editingItem && editedItemName.trim()) {
      updateItem(editingItem.id, { name: editedItemName.trim() });
      setEditingItem(null);
      setEditedItemName('');
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
      if (currentItems.length === 1 && currentPage > 1 && filteredData.length - 1 <= startIndex) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-auto">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 dark:text-white min-h-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          CRUD Operations
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="mb-6">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {isAdding ? 'Cancel Add' : 'Add New Item'}
          </button>
          {isAdding && (
            <form onSubmit={handleAddItem} className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                placeholder="Item Name"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200"
              >
                Save
              </button>
            </form>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {item.id}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {editingItem && editingItem.id === item.id ? (
                          <form onSubmit={handleUpdateItem} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <input
                              type="text"
                              placeholder="Item Name"
                              className="flex-grow p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base"
                              value={editedItemName}
                              onChange={(e) => setEditedItemName(e.target.value)}
                              required
                            />
                            <div className="flex space-x-2">
                              <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <span className="break-words">{item.name}</span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Previous
            </button>

            <div className="flex space-x-1 overflow-x-auto max-w-full pb-2 sm:pb-0">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white focus:ring-blue-500'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CrudPage;