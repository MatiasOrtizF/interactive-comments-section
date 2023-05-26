import Main from './src/components/Main'
import { CommentProvider } from './src/context/useComments'

export default function App() {
    return (
        <CommentProvider>
            <Main/>
        </CommentProvider>
    );
}