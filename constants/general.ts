import { getMyselfService } from "../services/myselfService";
import { profileService } from "../services/profile";
import { userService } from "../services/user";

export type Myself = {
    id?: string;
    name: string
    profession: string,
    image: string, // Ensure you have this image in the public folder
    description: string
}

export interface Profile {
    id: string;
    email: string;
    display_name: string;
    avatar_url: string;
}

export const getProfile = await userService.get();
export const MYSELF = await profileService.get();