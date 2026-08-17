import type { IProfileProps } from "../../types";

const profileData: IProfileProps = {
  memberSince: "Avril 2024",
  userFavClubs: [
    "Real Madrid CF",
    "Olympique Lyonnais",
    "Équipe de France"
  ],
  userClub: "Al-Hilal FC",
  userRole: "Manager",
  clubFollowers: 350,
  clubTotalMatches: 35
}

const faker = {
    datas : profileData
}

export function getUserProfileFakers(){
    try {
        const response = faker
        return response;
    } catch (error) {
        console.log(error);
    }
}

