import api from '../api';

const headers = {
  'Content-Type': 'multipart/form-data'
}

export const fetchPilots = async () => {
  try {
    const response = await api.get('/pilots');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const savePilot = async (id: number, formData: FormData) => {
  try {
    await api.patch(`/pilots/${id}`, formData, { headers });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPilot = async (formData: FormData) => {
  try {
    await api.post('/pilots', formData, { headers });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePilot = async (id: number) => {
  try {
    await api.delete(`/pilots/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
