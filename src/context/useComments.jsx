import { createContext , useEffect, useState } from "react";
import commentsDatas from '../data/data.json'

export const CommentsContext = createContext();

export function CommentProvider({children}) {
    const [commentsData , setCommentsData] = useState([]);
    const [userData , setUsarData] = useState([]);

    // useEffect(() => {
    //     allCountries();
    // }, []);

    useEffect(() => {
        setUsarData(commentsDatas.currentUser)
        setCommentsData(commentsDatas.comments)
        // console.log(commentsData.currentUser.username)
    }, []);

    const addComment = (commentaryNew) => {
        // setCommentsData(...commentsData, commentaryNew)
        if(commentaryNew.trim()) {
            console.log("agregar este comentario:" + commentaryNew);
            const commentaryNewJson = {
                "id": 6,
                "content": commentaryNew,
                "createdAt": "1 month ago",
                "score": 0,
                "user": {
                    "image": { 
                    "png": "../../assets/avatars/image-juliusomo.png",
                    "webp": "../../assets/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo"
                },
                "replies": []
            }

            // const newDatas = [commentaryNewJson, ...commentsData]
            // setCommentsData(newDatas)
            setCommentsData(prevState => ([
                ...prevState,
                {
                    ...commentaryNewJson,
                }
            ]))

            console.log(commentsData)
        }
    }

    const replicar = () => {
        console.log("agregar replica")
    }

    const minus = () => {
        console.log("agregar score")
    }

    const plus = () => {
        console.log("restar score")
    }

    const deleteComentarry = () => {
        console.log("borrar publicacion")
    }

    const editComentarry = () => {
        console.log("editar publicacion")
    }

    return (
        <CommentsContext.Provider value={{
            commentsData,
            userData,
            addComment,
            replicar,
            minus,
            plus,
            deleteComentarry,
            editComentarry,
        }}>
            {children}
        </CommentsContext.Provider>
    )
}