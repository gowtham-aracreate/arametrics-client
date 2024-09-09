// src/hooks/useApi.js
import { useState, useEffect } from 'react';

const useApi = (apiCall, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setStatusCode(null);
            try {
                const response = await apiCall();
                setData(response);
                setStatusCode(response.statusCode); // Set the status code
            } catch (err) {
                console.log(err)
                setError(err.message);
                if (err.response) {
                    setStatusCode(err.response.status); // Set the status code on error
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error, statusCode };
};

export default useApi;
