
import * as React from 'react';
import { IVideo } from './IVideo';
import ReactPlayer from 'react-player';
import {useHistory} from 'react-router-dom';
import * as videoService from './VideoService';
import {toast} from 'react-toastify';


import './VideoItem.css';

export interface VideoItemProps {
    video: IVideo,
    loadVideos: () => void;
}
 
const VideoItem: React.SFC<VideoItemProps> = ({video,loadVideos}: VideoItemProps) => {

    const history = useHistory();
    const handleDelete = async (id:string) => {
        await videoService.deleteVideo(id);
        toast.success('Video Eliminado');
        loadVideos();
    }
    return ( 
        <div className="col-md-4 my-2 shadow">
            <div className="card card-body video-card">
                <div className="d-flex justify-content-between">
                    <h3 onClick={() => history.push(`/update/${video._id}`)}>{video.title}</h3>
                    <span className="text-danger" onClick={() => video._id && handleDelete(video._id)}>X</span>
                </div>
                <p>{video.description}</p>
                <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer url={video.url}/>
                </div>
                
            </div>
        </div>
     );
}
 
export default VideoItem;