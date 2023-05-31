import { createContext , useEffect, useState , useRef} from "react";
import commentsDatas from '../data/data.json'
import { Alert } from "react-native";

export const CommentsContext = createContext();

export function CommentProvider({children}) {
    const [commentsData , setCommentsData] = useState([]);
    const [userData , setUsarData] = useState([]);
    const [dataloaded, setDataLoaded] = useState(false)
    const [newId, setNewId] = useState(5)
    const [repliesData, setRepliesData] = useState([]);
    const textInputRef = useRef(null)
    const [addReplyActived , setAddReplyActived] = useState(false)
    const [idReply , setIdReply] = useState(null)

    useEffect(() => {
        setCommentsData(commentsDatas.comments)
        setUsarData(commentsDatas.currentUser)
        setTimeout(() => {
            setDataLoaded(true)
        }, 4000)
    }, []); 
    
    // const allReplies = () => {
    //     commentsDatas.comments.forEach(comment => {
    //         const nuevoArreglo = [...repliesData, comment.replies]
    //         setRepliesData(nuevoArreglo)
    //     });
    // }

    // useEffect(() => {
    //     allReplies();
    //     console.log(repliesData)
    // });

    const addComment = (commentaryNew) => {
        // setCommentsData(...commentsData, commentaryNew)
        if(commentaryNew.trim()) {
            console.log("agregar este comentario:" + commentaryNew);
            setNewId(newId+1)

            // const newDatas = [commentaryNewJson, ...commentsData]
            // setCommentsData(newDatas)
            setCommentsData((prevState) => ([
                ...prevState,
                    {
                        "id": newId,
                        "content": commentaryNew,
                        "createdAt": "1 month ago",
                        "score": 0,
                        "like": false,
                        "user": {
                            "image": { 
                            "png": "../../assets/avatars/image-juliusomo.png",
                            "webp": "../../assets/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                        },
                        "replies": []
                    }
            ]))

            // console.log(commentsDatas.comments.content)
        }
    }

    const deleteReplie = (id) => {
        Alert.alert( 'Delete comment', 'Are you sure you want to delete this comment?',[
                {
                    text:'cancel'
                },
                {
                    text:'yes',
                    onPress: () => {
                        // setCommentsData(prevState => prevState.filter(item=>item.id!=id));
                        console.log("eliminar la replica:" + id)
                    }
                }
            ]
        )
    } 

    const replyComentary = (input) => {
        const commentNumber = commentsData.findIndex(item=>item.id==idReply);
        const newComments = [...commentsData]
        //newComments[commentNumber].score = newComments[commentNumber].score+1
        //newComments[commentNumber].like = true
        //setCommentsData(newComments)
        const newReply = {
            "id": 7,
            "content": input,
            "createdAt": "1 second",
            "score": 0,
            "like": false,
            "replyingTo": newComments[commentNumber].user.username,
            "user": {
            "image": { 
                "png": "../../assets/avatars/image-juliusomo.png",
                "webp": "../../assets/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
            }
        }
        newComments[commentNumber].replies = [...newComments[commentNumber].replies , newReply]
        setCommentsData(newComments)
    }

    const plus = (id) => {
        const commentNumber = commentsData.findIndex(item=>item.id==id);
        if(!commentsData[commentNumber].like) {
            const newComments = [...commentsData]
            newComments[commentNumber].score = newComments[commentNumber].score+1
            newComments[commentNumber].like = true
            setCommentsData(newComments)
        }
    }

    const minus = (id) => {
        const commentNumber = commentsData.findIndex(item=>item.id==id);
        if(commentsData[commentNumber].like) {
            const newComments = [...commentsData]
            newComments[commentNumber].score = newComments[commentNumber].score-1
            newComments[commentNumber].like = false
            setCommentsData(newComments)
        }
    }

    const plusReply = (id) => {
        /*      LIMPIAR CODIGO      */

        const desiredReplyx = commentsData.flatMap(comment => comment.replies).findIndex(reply => reply.id == id);
        let desiredCommentIndex = -1;
        let desiredReply;

        for (let i = 0; i < commentsData.length; i++) {
            const comment = commentsData[i];
            const replyIndex = comment.replies.findIndex(reply => reply.id == id);
            
            if (replyIndex !== -1) {
                desiredCommentIndex = i;
                desiredReply = comment.replies[replyIndex];
                break;
            }
        }

        // console.log("Posición del comentario:", desiredCommentIndex);
        // console.log("Posición del Reply:", desiredReplyx);

        if(!commentsData[desiredCommentIndex].replies[desiredReplyx].like) {
            const newComments = [...commentsData]
            newComments[desiredCommentIndex].replies[desiredReplyx].score = newComments[desiredCommentIndex].replies[desiredReplyx].score +1
            newComments[desiredCommentIndex].replies[desiredReplyx].like = true
            setCommentsData(newComments)
        }

    }

    const minusReply = (id) => {
        /*      LIMPIAR CODIGO      */

        const desiredReplyx = commentsData.flatMap(comment => comment.replies).findIndex(reply => reply.id == id);
        let desiredCommentIndex = -1;
        let desiredReply;

        for (let i = 0; i < commentsData.length; i++) {
            const comment = commentsData[i];
            const replyIndex = comment.replies.findIndex(reply => reply.id == id);
            
            if (replyIndex !== -1) {
                desiredCommentIndex = i;
                desiredReply = comment.replies[replyIndex];
                break;
            }
        }

        // console.log("Posición del comentario:", desiredCommentIndex);
        // console.log("Posición del Reply:", desiredReplyx);

        if(commentsData[desiredCommentIndex].replies[desiredReplyx].like) {
            const newComments = [...commentsData]
            newComments[desiredCommentIndex].replies[desiredReplyx].score = newComments[desiredCommentIndex].replies[desiredReplyx].score -1
            newComments[desiredCommentIndex].replies[desiredReplyx].like = false
            setCommentsData(newComments)
        }
    }

    const deleteComentarry = (id) => {
        Alert.alert( 'Delete comment', 'Are you sure you want to delete this comment?',[
            {
                text:'cancel'
            },
            {
                text:'yes',
                onPress: () => {
                    setCommentsData(prevState => prevState.filter(item=>item.id!=id));
                }
            }
        ])
    }

    const editComentarry = () => {
        console.log("editar publicacion")
    }

    const handleButtonReplayPress = (id) => {
        setIdReply(id)
        setAddReplyActived(true)
    }

    const backToComment = () => {
        setAddReplyActived(false)
    }

    return (
        <CommentsContext.Provider value={{
            commentsData,
            userData,
            dataloaded,
            addComment,
            replyComentary,
            minus,
            plus,
            plusReply,
            minusReply,
            deleteComentarry,
            deleteReplie,
            editComentarry,
            textInputRef,
            addReplyActived,
            handleButtonReplayPress,
            backToComment,
        }}>
            {children}
        </CommentsContext.Provider>
    )
}