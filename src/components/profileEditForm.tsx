import {IProfile} from "../store/profileStore";
import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Icon from "@mdi/react";
import {
    mdiBriefcase,
    mdiCakeVariant,
    mdiCardAccountDetails,
    mdiCellphone,
    mdiGithub,
    mdiHomeCity,
    mdiWeb
} from "@mdi/js";
import {format} from "date-fns";
import {IconVkontakte} from "../assets/icons/vkontakte/vkontakte";
import {Tabs} from "./UIComponents/Tabs/Tabs";
import {Button} from "./UIComponents/Button/Button";
import {Box} from "./UIComponents/Box/box";

interface IProps {
    setProfileEditMode: (value: boolean) => void
    onSubmitUpdateProfile: (profile: Omit<IProfile, "isFriend">) => void
    profile: IProfile
    activeTab?: number | string
}

export const ProfileEditForm: FC<IProps> = ({onSubmitUpdateProfile,  profile, setProfileEditMode}) => {

    const [activeTab, setActiveTab] = useState<string | number>(1);

    const profileTabs = [
        {id: 1, label: 'Основное'},
        {id: 2, label: 'Обо мне'},
        {id: 3, label: 'Контакты'},
    ]

    const {register, handleSubmit, setValue} = useForm({ mode: "onChange", values: profile})

    const onSubmit = (data: IProfile) => {
        const {isFriend, ...profile} = data
        onSubmitUpdateProfile(profile)
    }

    useEffect(() => {
        setValue('birthday', format(profile.birthday, 'yyyy-MM-dd'))
    }, [setValue]);

    return (
        <Box
            padding={'30px'}
            width={'500px'}
            gap={'20px'}
        >
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'}}>
            {activeTab === 1 &&
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiCardAccountDetails} size={1} />
                        <span>Имя: </span>
                        <input
                            type={"text"}
                            {...register('full_name', {})}
                        />
                    </div>
                    <div style={{display: 'flex',  gap: '5px'}}>
                        <Icon path={mdiCardAccountDetails} size={1} />
                        <span>Статус: </span>
                        <textarea
                            style={{height:'60px', border: 'solid 1px black', padding: '5px'}}
                            {...register('status', {})}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiCakeVariant} size={1} />
                        <span>День рождения: </span>
                        <input
                            type={"date"}
                            {...register('birthday')}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiHomeCity} size={1} />
                        <span>Город: </span>
                        <input
                            type={"text"}
                            {...register('city')}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiBriefcase} size={1} />
                        <span>Место работы: </span>
                        <input
                            type={"text"}
                            {...register('place_of_work')}
                        />
                    </div>
                </div>
            }
            {activeTab === 2 &&
                <div style={{height: '100%'}}>
                    <textarea
                        style={{height: '100%'}}
                        {...register('about_me')}
                    />
                </div>

            }
            {activeTab === 3 &&
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiCellphone} size={1} />
                        <span>Моб. телефон: </span>
                        <input
                            type={"text"}
                            {...register('contacts.phone_number')}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiWeb} size={1} />
                        <span>Мой сайт: </span>
                        <input
                            type={"text"}
                            {...register('contacts.my_website')}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <IconVkontakte />
                        <span>ВКонтакте: </span>
                        <input
                            type={"text"}
                            {...register('contacts.vk')}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'end', gap: '5px'}}>
                        <Icon path={mdiGithub} size={1} />
                        <span>GitHub: </span>
                        <input
                            type={"text"}
                            {...register('contacts.github')}
                        />
                    </div>
                </div>
            }
            <div style={{display: "flex"}}>
                <Button fullWidth color={'green'} onClick={() => onSubmit}>
                    Сохранить
                </Button>
                <Button color={'red'} fullWidth onClick={() => setProfileEditMode(false)}>
                    Отмена
                </Button>
            </div>
        </form>
            <Tabs
                tabs={profileTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                column
            />
        </Box>
    )

}