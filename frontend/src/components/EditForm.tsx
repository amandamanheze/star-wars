import React, { useState } from 'react';

interface EditFormProps {
  item: any;
  onSave: (updatedItem: FormData) => void;
  onCancel: () => void;
}

const EditForm: React.FunctionComponent<EditFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...item });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setFileError(null);
      } else {
        setFileError('Please select a valid image file.');
        setFile(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setFileError('Please select a valid image file.');
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('image', file);
    onSave(formDataToSend);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-85">
      <div className="p-6 rounded-lg border border-gray-800 bg-zinc-950">
        <h2 className="text-2xl mb-4 font-orbitron font-normal">Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-900 font-normal rounded-lg w-full py-2 px-3 text-gray-300 leading-tight"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block text-sm rounded-lg file:rounded-lg font-normal file:cursor-pointer file:py-2 file:px-2 text-gray-400 bg-gray-900 file:bg-gray-300 hover:file:bg-blue-200"
              required
            />
            {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
          </div>
          <div className="flex items-center justify-between text-white">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-800 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
