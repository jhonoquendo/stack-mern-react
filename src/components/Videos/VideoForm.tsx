import React,{ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import { IVideo } from './IVideo';
import * as videoService from './VideoService';
import {toast} from 'react-toastify';

export interface VideoFormProps {
    id: string
}

type inputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

const VideoForm: React.SFC<VideoFormProps> = () => {

    const history = useHistory();
    const params:VideoFormProps = useParams();

    const initialState:IVideo = {
        title: "",
        url: "",
        description:""
    }

    const [video, setVideo] = useState<IVideo>(initialState);
    
    const handlerInputChange = (e:inputChange) => {
        setVideo({...video,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!params.id){
            await videoService.createVideo(video);
            toast.success('Nuevo video creado');
        }else{
            await videoService.updateVideo(params.id,video);
            toast.success('Video actualizado');
        }
        setVideo(initialState);
        history.push('/');
    }

    useEffect(() => {
        if(params.id) getVideo(params.id);
    },[]);

    const getVideo = async (id:string) => {
        const res = await videoService.getVideo(id);
        setVideo(res.data);
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Nuevo Video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="Titulo de Video" 
                                    className="form-control" 
                                    autoFocus 
                                    onChange={handlerInputChange}
                                    value={video.title} />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="url" 
                                    placeholder="Url" 
                                    className="form-control" 
                                    onChange={handlerInputChange}
                                    value={video.url} />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    name="description" 
                                    rows={3} className="form-control" 
                                    placeholder="Write a description" 
                                    onChange={handlerInputChange}
                                    value={video.description}
                                    ></textarea>
                            </div>
                            {
                                (params.id) ?
                                <button className="btn btn-info btn-block">Update Video</button>
                                :
                                <button className="btn btn-primary btn-block">Create Video</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoForm;