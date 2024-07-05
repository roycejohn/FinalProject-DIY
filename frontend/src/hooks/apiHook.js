import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/projects';
const API_URL ='https://diyconnect.onrender.com/api/projects';

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
  try {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

export const createProject = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/create-project`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};


export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await axios.put(`${API_URL}/${projectId}`, updatedProject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Most Popular Projects Hook
export const getMostPopularProjects = async () => {
  try{
    const response = await axios.get(`${API_URL}/popular`)
    return response.data
  }catch(error){
    console.error('Error creating project:', error);
    throw error;
  }
}