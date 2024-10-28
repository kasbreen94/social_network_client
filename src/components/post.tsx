import {Link} from "react-router-dom";
import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import {mdiDeleteOffOutline, mdiTextBoxEditOutline} from "@mdi/js";
import UseAnimations from "react-useanimations";
import heart from 'react-useanimations/lib/heart'
import {IPost} from "../store/postsStore";
import {observer} from "mobx-react-lite";
import {format} from "date-fns";
import {Box} from "./UIComponents/Box/box";

type PropTypes = {
    authId: number
    userId: number
    post: IPost
    deletePost: (postId: string, recipientId: number) => void
    updatePost: (postId: string, recipientId: number, message: string) => void
    deleteLike: (postId: string, recipientId: number) => void
    createLike: (postId: string, recipientId: number) => void

}

const PostTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 20px;
`

const PostTopSectionAvatarAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`

const AvatarOfPost = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`

const PostBottomSection = styled.div`
  align-self: center;
  width: 100%;
  border-radius: 0 0 5px 5px;
  
`

const PostMessage = styled.div`
  font-size: 14px;
  padding: 10px;
`

const PostSectionBottomActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
 
`
const LikePost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const Post: FC = observer((
    {
        authId,
        userId,
        post,
        deletePost,
        updatePost,
        deleteLike,
        createLike
    }: PropTypes) => {

    const [editablePostValue, setEditablePostValue] = useState('')
    const [editPostMode, setEditPostMode] = useState(false)
    const postDate = format(post.createdAt, 'yy/MM/dd kk:mm')
    const updatePostDate = format(post.updatedAt, 'yy/MM/dd kk:mm')

    const enableEditPostMode = (postValue: string) => {
        setEditablePostValue(postValue);
        setEditPostMode(true)
    }

    const editPostValue = (postId) => {
        updatePost(postId, userId, editablePostValue);
        setEditPostMode(false)
    }

    const [isLike, setIsLike] = useState<boolean>(false)
    const foundLike = post.likes.find(like => like.sender_id === authId);

    useEffect(() => {
        if (foundLike) {
            setIsLike(true)
        } else setIsLike(false)
    }, [foundLike]);

    return (
        <Box fullWidth column >
            <PostTopSection>
                    <PostTopSectionAvatarAndDate>
                        <Link to={`/${post.sender_id === authId ? '' : post.sender_id}`}>
                            <AvatarOfPost src={post.sender_photo} alt=''/>
                        </Link>
                        <div>
                            <div>{post.sender_name}</div>
                            <div style={{fontSize: '12px'}}>
                                {post.updatedAt !== null ? `ред. ${updatePostDate}` : postDate}
                            </div>

                        </div>
                    </PostTopSectionAvatarAndDate>
                    {(userId === authId || post.sender_id === authId) &&
                        <div>
                            {editPostMode &&
                                <div>
                                    <button onClick={() => editPostValue(post.id)}>save</button>
                                    <button onClick={() => setEditPostMode(false)}>cancel</button>
                                </div>}
                            {!editPostMode &&
                                <div>
                                    {post.sender_id === authId &&
                                        <button
                                            onClick={() => enableEditPostMode(post.message)}>
                                            <Icon
                                                path={mdiTextBoxEditOutline}
                                                size={1}
                                                title={'Редактировать'}/>
                                        </button>
                                    }
                                    <button onClick={() => deletePost(post.id, userId)}>
                                        <Icon
                                            path={mdiDeleteOffOutline}
                                            size={1}
                                            title={'Удалить'}
                                        />
                                    </button>
                                </div>}

                        </div>
                    }

            </PostTopSection>

            <PostBottomSection>
                <PostMessage>
                    {editPostMode ?
                        <textarea
                            autoFocus={true}
                            value={editablePostValue}
                            onChange={e => setEditablePostValue(e.currentTarget.value)}
                        /> : post.message}
                </PostMessage>
                <PostSectionBottomActions>
                    <LikePost>


                        <button>
                            <UseAnimations
                                wrapperStyle={{cursor: "pointer"}}
                                autoplay={false}
                                strokeColor={isLike ? 'red' : 'rgb(31,31,31)'}
                                animation={heart}
                                reverse={isLike}
                                fillColor={'red'}
                                onClick={() => {
                                    !isLike ? createLike(post.id, userId) : deleteLike(post.id, userId)
                                }}
                            />
                        </button>
                        {post.likes.length > 0 && post.likes.length}

                        {post && post.likes.map(like =>
                            <Link to={`/${post.sender_id === authId ? '' : post.sender_id}`} key={like.id}>
                                <img src={like.sender_photo} alt={''} style={{width: '30px', borderRadius: '5px'}}/>
                            </Link>
                        )}
                    </LikePost>
                    <div>
                        {editPostMode &&
                            <button>upload image</button>}
                    </div>
                </PostSectionBottomActions>
            </PostBottomSection>
        </Box>
    )
});