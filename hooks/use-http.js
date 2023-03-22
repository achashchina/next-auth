import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentRequest = useCallback(async (requestConfig, applayData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body && requestConfig.method === 'POST' ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }


      const data = await response.json();

      const loadedUsers = [];
      for (const key in data) {
        loadedUsers.push({ id: key, name: data[key].name, email: data[key].email });
      }
      applayData(loadedUsers);
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sentRequest,
  };
};

export default useHttp;
