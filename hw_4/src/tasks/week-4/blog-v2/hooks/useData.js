import { useEffect, useState } from 'react';
import apiClient from '../api-client';

export default function useData(path, initialValue, immediateLoading = true) {
    const [data, setData] = useState(initialValue);
    const [isFetching, setFetching] = useState(false);

    useEffect(() => {
        if (immediateLoading) {
            setFetching(true)
            apiClient.get(path).then(response => {
                setData(response.data);
                setFetching(false)
            })
        }
    }, [path, immediateLoading])

    return [data, isFetching]
}