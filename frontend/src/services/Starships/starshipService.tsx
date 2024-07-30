import api from '../api';

const headers = {
  'Content-Type': 'multipart/form-data'
}

export const fetchShips = async () => {
  try {
    const response = await api.get('/ships');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveShip = async (id: number, formData: FormData) => {
  try {
    await api.patch(`/ships/${id}`, formData, { headers });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addShip = async (formData: FormData) => {
  try {
    await api.post('/ships', formData, { headers });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteShip = async (id: number) => {
  try {
    await api.delete(`/ships/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
