import {IProfile} from "../store/profileStore";
import {FC} from "react";
import styles from "./profileMoreInfo.module.scss"
import {
    mdiBriefcase,
    mdiCakeVariant,
    mdiCardAccountDetails,
    mdiCellphone,
    mdiGithub,
    mdiHomeCity,
    mdiWeb
} from "@mdi/js";
import Icon from "@mdi/react";
import {Box} from "./UIComponents/Box/box";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {IconVkontakte} from "../assets/icons/vkontakte/vkontakte";


interface IProps {
    profile: IProfile
}

export const ProfileMoreInfo: FC<IProps> = ({profile}) => {
    return (
        <div className={styles.profileInfo}>
            <Box
                column
                width={'400px'}
                padding={'30px'}
            >
                <div className={styles.profileInfo_title}>
                    <span>Основная информация</span>
                </div>

                <div className={styles.profileInfo_item}>
                    <Icon path={mdiCardAccountDetails} size={1}/>
                    <span>Имя: </span>
                    {profile.full_name}
                </div>

                <div className={styles.profileInfo_item}>
                    <Icon path={mdiCakeVariant} size={1}/>
                    <span>Дата рождения: </span>
                    <span>{profile.birthday && `${format(`${profile.birthday}`, "PPP", {locale: ru})}`}</span>
                </div>
                <div className={styles.profileInfo_item}>
                    <Icon path={mdiHomeCity} size={1}/>
                    <span>Город: </span>
                    {profile.city}
                </div>
                <div className={styles.profileInfo_item}>
                    <Icon path={mdiBriefcase} size={1}/>
                    <span>Место работы: </span>
                    {profile.place_of_work}
                </div>
                <div className={styles.separator}></div>
                <div className={styles.profileInfo_title}>Обо мне</div>

                <div className={styles.profileInfo_item}>
                    <Icon path={mdiCakeVariant} size={1}/>
                    {profile.about_me}
                </div>
                <div className={styles.separator}></div>
                <div className={styles.profileInfo_title}>Контакты</div>

                <div>
                    <div className={styles.profileInfo_item}>
                        <Icon path={mdiCellphone} size={1}/>
                        {profile.contacts.phone_number}
                    </div>
                    <div className={styles.profileInfo_item}>
                        <Icon path={mdiWeb} size={1}/>
                        {profile.contacts.my_website}
                    </div>
                    <div className={styles.profileInfo_item}>
                        <IconVkontakte color={'#a1a1a1'}/>
                        {profile.contacts.vk}
                    </div>
                    <div className={styles.profileInfo_item}>
                        <Icon path={mdiGithub} size={1}/>
                        {profile.contacts.github}
                    </div>
                </div>
            </Box>
        </div>
    )
}