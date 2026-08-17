export interface UpdateProfileRequest {
    email?: string;
    newPassword?: string;
    currentPassword?: string;
    firstName?: string;
    lastName?: string;
}