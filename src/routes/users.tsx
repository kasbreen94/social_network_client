import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import {instance} from "../api/api";
import {
    mdiAccountArrowUp,
    mdiAccountMultiple,
    mdiAccountMultiplePlus,
    mdiBackspace,
    mdiMessageTextFastOutline
} from "@mdi/js";
import Icon from "@mdi/react";
import {differenceInCalendarYears, differenceInYears, format} from "date-fns";
import {useAuth} from "../hooks/useAuth";
import {Box} from "../components/UIComponents/Box/box";
import {Button} from "../components/UIComponents/Button/Button";
import {useStore} from "../store";


type UsersType = {
    id: number
    full_name: string
    photo: string
    birthday: string
    city: string
    place_of_work: string
    isFriend: boolean | 'subscriber'
}

interface IResponseUsers {
    users: UsersType[]
    totalUsers: number
}

const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;

  padding: 5px;
  gap: 7px;
  background-color: #2a2a2a;
  box-shadow: 0 0 3px 0 #5e5e5e;
  word-break: break-all;
  border-radius: 5px;
`

const UserTopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const Users = observer(() => {

    const {authId} = useAuth()

    const {usersStore} = useStore()
    const {users, getUsers} = usersStore

    const [searchTerm, setSearchTerm] = useState('')

    const setSearchTermValue = (e) => {
        e.preventDefault()
        setSearchTerm(e.currentTarget.value)
    }

    const setUsersAge = (birthdayDate: string) => {
        const result = differenceInYears(
            new Date(),
            birthdayDate
        )
        const declinationAge = result % 10 === 1 ? 'год' : [2, 3, 4].includes(result % 10)  ? 'года' : 'лет'
        return `${result} ${declinationAge}`
    }

    const setIsFriendColorForIcon = (isFriend: boolean | 'subscriber') => {
        if (isFriend === true) {
            return "rgb(122,171,93)"
        } else if (isFriend === false){
            return "rgb(196,62,77)"
        } else if (isFriend === 'subscriber') {
            return "rgb(29,171,232)"
        }
    }

    useEffect(() => {
        let delaySearchTerm;
        if (searchTerm) {
            delaySearchTerm = setTimeout(() => getUsers(searchTerm), 500);
        } else  {
            getUsers('')
        }

        return () => clearTimeout(delaySearchTerm)

    }, [searchTerm]);

    return (
        <UsersWrapper>
            <div style={{display: 'flex', gap: '10px'}}>
                <div style={{width: '100%'}}>
                    <Box padding={'6px'}>
                        <input
                            style={{ fontSize: '12px', width: '100%'}}
                            value={searchTerm}
                            onChange={setSearchTermValue}
                        />
                        <div onClick={() => setSearchTerm('')} style={{cursor: 'pointer'}}>
                            <Icon path={mdiBackspace} size={0.65} />
                        </div>
                    </Box>
                </div>

                <Button>Поиск</Button>
            </div>

            {users && users.filter(user => user.id !== authId).map(user =>
                <UserWrapper key={user.id}>

                    <Link to={`/users/${user.id}`} >
                        <img src={user.photo} style={{width: '60px', height: '60px', borderRadius: '5px'}} alt={''}/>
                    </Link>
                    <div style={{width: '100%'}}>
                        <UserTopSection>
                            <div style={{display: 'flex', gap: '10px'}}>
                                {user.full_name}
                                <Icon
                                    path={user.isFriend === 'subscriber' ? mdiAccountArrowUp : mdiAccountMultiple}
                                    size={0.9}
                                    color={setIsFriendColorForIcon(user.isFriend)}
                                    title={'Добавить в друзья'}
                                />
                            </div>
                            <div style={{display: 'flex', gap: '10px', paddingRight: '10px'}}>
                                <button>
                                    <Icon
                                        path={ mdiMessageTextFastOutline}
                                        size={1}
                                        color={"rgb(70,133,204)"}
                                        title={'Сообщение'}
                                    />
                                </button>
                                {/*<button>*/}
                                {/*    <Icon*/}
                                {/*        path={mdiAccountMultiplePlus}*/}
                                {/*        size={1}*/}
                                {/*        color={"rgb(122,171,93)"}*/}
                                {/*        title={'Добавить в друзья'}*/}
                                {/*    />*/}
                                {/*</button>*/}
                                {/*<button>*/}
                                {/*    <Icon*/}
                                {/*        path={mdiAccountMultipleMinusOutline}*/}
                                {/*        size={1}*/}
                                {/*        color={"rgb(29,171,232)"}*/}
                                {/*        title={'Отписаться'}*/}
                                {/*    />*/}
                                {/*</button>*/}
                                {/*<button>*/}
                                {/*    <Icon*/}
                                {/*        path={mdiAccountMultipleMinus}*/}
                                {/*        size={1}*/}
                                {/*        color={"rgb(196,62,77)"}*/}
                                {/*        title={'Убрать из друзей'}*/}
                                {/*    />*/}
                                {/*</button>*/}
                            </div>
                        </UserTopSection>
                        <div style={{fontSize: '12px'}}>
                            {user.birthday && <span>{`${setUsersAge(user.birthday)}`}</span>}
                            {user.city && <span>{`, ${user.city}`}</span>}
                        </div>
                        <div style={{fontSize: '12px'}}>
                            {user.place_of_work && <span>{user.place_of_work}</span>}
                        </div>
                    </div>
                </UserWrapper>
            )}
        </UsersWrapper>
    )
});