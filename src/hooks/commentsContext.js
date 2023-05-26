import { useContext } from "react";
import { CommentsContext } from "../context/useComments";

export const useComments = () => {
    const context = useContext(CommentsContext)

    return context
}