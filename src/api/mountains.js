import axios from 'axios';

const getMountains = async () => {
  const response = await axios.get(`${process.env.REACT_APP_MOUNTAIN_API}`);
  return response.data;
};

export {getMountains};
