import styled from "styled-components";
import {usePosts} from "../hooks/usePosts";
import {FC, useEffect, useState} from "react";
import {Post} from "./post";
import {useStore} from "../store";
import {observer} from "mobx-react-lite";
import {Button} from "./UIComponents/Button/Button";
import {useConnectSocket} from "../hooks/useConnectSocket";
import {Box} from "./UIComponents/Box/box";
import {useAuth} from "../hooks/useAuth";


const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 15px;
  align-items: center;
`

export const Posts: FC = observer(() => {

    const {profilePostsStore} = useStore();
    const {userId, authId, isAuth} = useAuth()

    const {
        posts,
        totalPosts,
        totalPages,
        currentPage,
        setCurrentPage,
        clearPosts,
    } = profilePostsStore

    // useConnectSocket(userId, authId)

    const {getPosts, createPost, updatePost, deletePost, createLike, deleteLike} = usePosts(userId, authId)

    const [postValue, setPostValue] = useState('')

    useEffect(() => {
        if (isAuth) {
            getPosts(userId)
        }
        return () => {
            clearPosts(String(userId))
            setCurrentPage(1)
        }
    }, [userId, isAuth]);

    const wsCreatePost = async (e) => {
        e.preventDefault()
        await createPost(userId, postValue)
        setPostValue('')
    }

    const setMorePosts = async () => {
        await getPosts(userId)
        console.log('current', currentPage)
        console.log('total', totalPages)
    }

    return (
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', width: '100%'}}>
                <Box>
                    <form style={{width: '100%'}}>
                    <textarea
                        placeholder={'Напишите, что хотите опубликовать...'}
                        style={{width: '100%'}}
                        value={postValue}
                        onChange={(e) => setPostValue(e.currentTarget.value)}
                    />

                        <Button onClick={wsCreatePost}>send</Button>
                    </form>
                </Box>


                <PostsWrapper>
                    {posts[`${userId}`] && posts[`${userId}`].map(post =>
                        <Post
                            key={post.id}
                            authId={authId}
                            userId={userId}
                            post={post}
                            deletePost={deletePost}
                            updatePost={updatePost}
                            deleteLike={deleteLike}
                            createLike={createLike}
                        />
                    )}
                </PostsWrapper>
                {totalPosts !== posts[`${userId}`]?.length && <button onClick={() => setMorePosts()}>More</button>}
            </div>

    )
})