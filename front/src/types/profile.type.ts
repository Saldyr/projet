import type { UserInfos } from "./user.type"


export interface IProfileProps {
    user?: UserInfos
    memberSince?: string 
    userFavClubs?: string[]
    userClub?: string //| string[] dans une prochaine version autorisé la gestion de plusieurs clubs
    userRole?: string
    clubFollowers?: number | string
    clubTotalMatches?: number
}
