import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import EditForm from '../components/EditForm';
import AddForm from '../components/AddForm';
import DeleteModal from '../components/DeleteModal';
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { RiAddLargeLine } from "react-icons/ri";
import { Pagination } from 'antd';
import * as pilotService from '../services/Pilots/pilotService';

const Pilots: React.FunctionComponent = () => {
  const [pilots, setPilots] = useState<any[]>([]);
  const [editingPilot, setEditingPilot] = useState<any | null>(null);
  const [addingPilot, setAddingPilot] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pilotToDelete, setPilotToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchPilotsData();
  }, []);

  const fetchPilotsData = async () => {
    try {
      const data = await pilotService.fetchPilots();
      setPilots(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (pilot: any) => {
    setEditingPilot(pilot);
  };

  const handleRemove = (id: number) => {
    setPilotToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmRemove = async () => {
    if (pilotToDelete) {
      try {
        await pilotService.deletePilot(pilotToDelete);
        fetchPilotsData();
        setShowDeleteModal(false);
        setPilotToDelete(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSave = async (formData: FormData) => {
    try {
      await pilotService.savePilot(editingPilot.id, formData);
      fetchPilotsData();
      setEditingPilot(null);
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
  
      await pilotService.addPilot(data);
      fetchPilotsData();
      setAddingPilot(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPilot = currentPage * itemsPerPage;
  const indexOfFirstPilot = indexOfLastPilot - itemsPerPage;
  const currentPilots = pilots.slice(indexOfFirstPilot, indexOfLastPilot);

  return (
    <Layout>
      <div className="container mx-auto p-4 text-center font-roboto font-semibold">
        <div className="flex items-center justify-center m-4">
          <h1 className="text-2xl mb-4 font-orbitron">PILOTS</h1>
          <button onClick={() => setAddingPilot(true)} className="btn mb-4 ml-4"><RiAddLargeLine /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentPilots.map(pilot => (
            <div key={pilot.id} className="card relative group">
              <img src={`${process.env.REACT_APP_API_URL}/${pilot.image}`} alt={pilot.name} className="w-full h-96 object-cover rounded-lg" />
              <h2 className="text-lg uppercase m-3">{pilot.name}</h2>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => handleEdit(pilot)} className="btn"><FiEdit /></button>
                <button onClick={() => handleRemove(pilot.id)} className="btn"><GoTrash /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-9">
          <Pagination
            className="pagination"
            align="center"
            current={currentPage}
            total={pilots.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
        {editingPilot && (
          <EditForm item={editingPilot} onSave={handleSave} onCancel={() => setEditingPilot(null)} />
        )}
        {addingPilot && (
          <AddForm onSave={handleAdd} onCancel={() => setAddingPilot(false)} />
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

export default Pilots;
