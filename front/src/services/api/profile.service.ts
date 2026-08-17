import apiClient from "./apiClient";
import type { UpdateProfileRequest } from "../../types/updateProfile.type";
import type { UserInfos } from "../../types/user.type";

export async function getUserProfileInfos(): Promise<UserInfos> {

    const { data } = await apiClient.get<UserInfos>("/users/profile");
    return data;
}

export async function updateUserProfile(
    payload: UpdateProfileRequest,
): Promise<void> {

    await apiClient.patch('/users/me', payload);
}

export async function deleteUserAccount(): Promise<void> {
    return await apiClient.delete('/users/me');
}