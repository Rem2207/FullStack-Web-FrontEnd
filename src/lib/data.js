
import { post, get } from './axios-controller';

 export const login = async (email, password) => {
    const response = await post('/user/login', { email, password });
    return response;
}

export const signup = async (name, email, password) => {
    try {
      const response = await post('/user/signup', { name, email, password });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Manejo específico del error de usuario ya registrado
        throw new Error('Ya existe un usuario registrado con este correo');
      } else {
        // Manejo de otros errores
        throw new Error('ah ocurrido un error');
      }
    }
  };

export const logout = async () => {
    const response = await post('/user/logout');
    return response;
}
  
export const getAllusers = async () => {
    const response = await get('/user');
    return response;    
}

export const getAllPlushies = async () => {
    const response = await get('/plushies');
    return response;    
}

export const getPlushie = async (id) => {
    if(!id) return
    const response = await get(`/plushies/${id}`);
    return response;    
}

export const getAllAccessories = async () => {
    const response = await get('/accessories');
    return response;    
}

export const saveCustomizedPlushie = async (body) => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log(user);
    if (!user || !user._id) {
      throw new Error('Usuario no encontrado');
    }

    const response = await post(`/user/add-customized-plushies/${user._id}`, body);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getUser = async () => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user || !user._id) {
      throw new Error('Usuario no encontrado');
    }

    const response = await get(`/user/${user._id}`);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const deletePlushies = async (body) => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user || !user._id) {
      throw new Error('Usuario no encontrado');
    }

    const response = await post(`/user/delete-customized-plushies/${user._id}`, body);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

