import axios from 'axios';
import { IVideo } from '../schema/videoSchema';

const URL_BASE = "http://localhost:4000";

export const getVideos = async () => {
    return await axios.get<IVideo[]>(`${URL_BASE}/videos`);
}

export const createVideo = async (video:IVideo) => {
    return await axios.post(`${URL_BASE}/videos`,video);
}

export const getVideo = async (id:string) => {
    return await axios.get<IVideo>(`${URL_BASE}/video/${id}`);
}

export const updateVideo = async (id:string,video:IVideo) => {
    return await axios.put<IVideo>(`${URL_BASE}/video/${id}`,video);
}

export const deleteVideo = async (id:string) => {
    return await axios.delete<IVideo>(`${URL_BASE}/video/${id}`);
}