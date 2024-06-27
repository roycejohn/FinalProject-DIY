import axios from 'axios';

const API_URL = 'http://localhost:8000/api/projects';

export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  const response = await axios.get(`${API_URL}/${projectId}`);
  return response.data;
};

export const createProject = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create-project`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};
