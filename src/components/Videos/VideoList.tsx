import React, { useEffect, useState } from 'react';

import {IVideo} from '../../schema/videoSchema';
import * as videoService from '../../service/videoService';
import VideoItem from './VideoItem';


export interface VideoListProps {
    
}
 
const VideoList: React.SFC<VideoListProps> = () => {

    const [videos,setVideos] = useState<IVideo[]>([]);

    const loadVideos = async () => {
        const res = await videoService.getVideos();

        const formatedVideos = res.data.map(video => {
            return {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
            }
        }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());

        setVideos(formatedVideos);
    };

    useEffect(() => {
        loadVideos();
    },[]);

    return ( 
        <div className="row">
            {videos.map((video) => {
                 return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>
            })}
        </div>
     );
}
 
export default VideoList;