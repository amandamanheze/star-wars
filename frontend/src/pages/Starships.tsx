import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import EditForm from '../components/EditForm';
import AddForm from '../components/AddForm';
import DeleteModal from '../components/DeleteModal';
import { RiAddLargeLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { Pagination } from 'antd';
import * as starshipService from '../services/Starships/starshipService';

const Starships: React.FunctionComponent = () => {
  const [ships, setShips] = useState<any[]>([]);
  const [editingStarship, setEditingStarship] = useState<any | null>(null);
  const [addingStarship, setAddingStarship] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [shipToDelete, setShipToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);

  useEffect(() => {
    fetchShipsData();
  }, []);

  const fetchShipsData = async () => {
    try {
      const data = await starshipService.fetchShips();
      setShips(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (starship: any) => {
    setEditingStarship(starship);
  };

  const handleRemove = (id: number) => {
    setShipToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmRemove = async () => {
    if (shipToDelete) {
      try {
        await starshipService.deleteShip(shipToDelete);
        fetchShipsData();
        setShowDeleteModal(false);
        setShipToDelete(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSave = async (formData: FormData) => {
    try {
      await starshipService.saveShip(editingStarship.id, formData);
      fetchShipsData();
      setEditingStarship(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (formData: { name: string; image: File | null }) => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      if (formData.image) {
        data.append('image', formData.image);
      }
  
      await starshipService.addShip(data);
      fetchShipsData();
      setAddingStarship(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastShip = currentPage * itemsPerPage;
  const indexOfFirstShip = indexOfLastShip - itemsPerPage;
  const currentShips = ships.slice(indexOfFirstShip, indexOfLastShip);

  return (
    <Layout>
      <div className="container mx-auto p-4 text-center font-roboto font-semibold">
        <div className="flex items-center justify-center m-4">
          <h1 className="text-2xl mb-4 font-orbitron">Starships</h1>
          <button onClick={() => setAddingStarship(true)} className="btn mb-4 ml-4"><RiAddLargeLine /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentShips.map(starship => (
            <div key={starship.id} className="card relative group">
              <img src={`${process.env.REACT_APP_API_URL}/${starship.image}`} alt={starship.name} className="w-full h-96 object-cover rounded-lg" />
              <h2 className="text-lg uppercase m-3">{starship.name}</h2>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => handleEdit(starship)} className="btn"><FiEdit /></button>
                <button onClick={() => handleRemove(starship.id)} className="btn"><GoTrash /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-9">
          <Pagination
            className="pagination"
            align="center"
            current={currentPage}
            total={ships.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
        {editingStarship && (
          <EditForm item={editingStarship} onSave={handleSave} onCancel={() => setEditingStarship(null)} />
        )}
        {addingStarship && (
          <AddForm onSave={handleAdd} onCancel={() => setAddingStarship(false)} />
        )}
        {showDeleteModal && (
          <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmRemove}
          />
        )}
      </div>
    </Layout>
  );
};

export default Starships;
