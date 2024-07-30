import React, { useState } from 'react';

interface AddFormProps {
  onSave: (newItem: { name: string; image: File | null }) => void;
  onCancel: () => void;
}

const AddForm: React.FunctionComponent<AddFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<{ name: string; image: File | null }>({ name: '', image: null });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      setFormData({ ...formData, image: null });
    }
    setError('');
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-85">
      <div className="p-6 rounded-lg border border-gray-800 bg-zinc-950">
        <h2 className="text-2xl mb-4 font-orbitron font-normal">Add New Item</h2>
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
              required
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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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

export default AddForm;

