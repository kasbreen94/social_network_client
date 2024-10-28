import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../store";
import {useAuth} from "../hooks/useAuth";
import {Button} from "../components/UIComponents/Button/Button";
import {mdiBriefcase, mdiCakeVariant, mdiHomeCity, mdiInformationOutline} from "@mdi/js";
import Icon from "@mdi/react";
import {ProfileEditForm} from "../components/profileEditForm";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {ProfileMoreInfo} from "../components/profileMoreInfo";
import {socket} from "../api/api";

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

`
const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #2a2a2a;
  box-shadow: 0 0 3px 0 #5e5e5e;
  gap: 10px;
  padding: 5px;
  border-radius: 5px;
`

const ProfilePhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px;
  width: 140px;
  height: 140px;
`
const ProfileImg = styled.img`
  border-radius: 5px;
`
const ProfileInfoDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  word-break: break-all
`
const ProfileInfoDescriptionTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ProfileInfoDescriptionBottom = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
`
export const Profile = observer(() => {

    const {isAuth, userId, authId} = useAuth()

    const {profileStore} = useStore();
    const {profile, getProfile, updateProfile, startFriendListening, addFriend, deleteFriend} = profileStore;

    const [moreInfoShow, setMoreInfoShow] = useState(false)

    const [profileEditMode, setProfileEditMode] = useState(false)

    useEffect(() => {
        if (isAuth && authId) {
            startFriendListening(authId, userId)
            getProfile(userId);
            console.log(isAuth)
        }
        return () => {
            socket.off('createFriend')
            socket.off('deleteFriend')
        }
    }, [userId, isAuth, authId])

    const onSubmitUpdateProfile = async (data) => {
        await updateProfile(data)
        setProfileEditMode(false)
    }

    const ref = useRef(null)

    const handleCloseEditMode = (e) => {
        const {target} = e
        if (ref.current === target) {
            setProfileEditMode(false)
        }
    }

    if (!profile) {
        return <div>No profile</div>
    }

    return (
        <ProfileWrapper>
            {moreInfoShow && <ProfileMoreInfo profile={profile}/>}
            {profileEditMode &&
                <div
                    ref={ref}
                    onClick={handleCloseEditMode}
                    style={{
                        position: "fixed",
                        top: '0',
                        right: '0',
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        width: '100%',
                        height: '100%',
                        zIndex: '10',
                        borderRadius: '5px',
                        boxShadow: '0 0 5px 1px black'
                    }}>
                    <ProfileEditForm onSubmitUpdateProfile={onSubmitUpdateProfile}
                                     profile={profile}
                                     setProfileEditMode={setProfileEditMode}

                    />
                </div>
            }

            <ProfileInfoWrapper>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <ProfilePhotoWrapper>
                        <ProfileImg src={profile.photo} alt={''}/>
                    </ProfilePhotoWrapper>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    gap: '10px',
                    width: '100%'
                }}>
                    <ProfileInfoDescriptionWrapper>
                        <ProfileInfoDescriptionTop>
                            <div style={{fontSize: '18px', fontWeight: 'bold'}}>
                                {profile.full_name}
                            </div>

                            {authId === userId &&
                                <div>
                                    <Button
                                        fullWidth
                                        color={'blue'}
                                        onClick={() => setProfileEditMode(true)}>
                                        Редактировать профиль
                                    </Button>
                                </div>
                            }
                            {authId !== userId &&
                                <div>

                                    {profile.isFriend === true &&
                                        <Button
                                            onClick={() => deleteFriend(userId)}
                                            fullWidth
                                            color={"red"}
                                        >
                                            Убрать из друзей
                                        </Button>
                                    }
                                    {profile.isFriend === 'subscriber' &&
                                        <Button
                                            onClick={() => deleteFriend(userId)}
                                            fullWidth
                                            color={"blue"}
                                        >
                                            Отписаться
                                        </Button>
                                    }

                                    {profile.isFriend === false &&
                                        <Button
                                            onClick={() => addFriend(userId)}
                                            fullWidth
                                            color={"green"}
                                        >
                                            Добавить в друзья
                                        </Button>
                                    }


                                </div>

                            }

                        </ProfileInfoDescriptionTop>
                        <div style={{fontSize: '14px', fontStyle: 'italic'}}>
                            {profile.status}
                        </div>
                        <div>
                                <ProfileInfoDescriptionBottom>
                                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                                        <Icon path={mdiCakeVariant} size={1}/>

                                        <span>{profile.birthday && `${format(`${profile.birthday}`, "PPP", {locale: ru})}`}</span>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                                        <Icon path={mdiHomeCity} size={1}/>
                                        <span>{profile.city}</span>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                                        <Icon path={mdiBriefcase} size={1}/>
                                        <span>{profile.place_of_work}</span>
                                    </div>
                                    <div
                                        onClick={() => setMoreInfoShow(true)}
                                        style={{
                                        display: 'flex',
                                        alignItems: 'end',
                                        gap: '5px', cursor: "pointer"}}>
                                        <Icon path={mdiInformationOutline} size={1}/>
                                        <span>Информация</span>
                                    </div>
                                </ProfileInfoDescriptionBottom>
                        </div>
                    </ProfileInfoDescriptionWrapper>
                </div>
            </ProfileInfoWrapper>
        </ProfileWrapper>
    )
})