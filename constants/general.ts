import { getMyselfService } from "../services/myselfService";
import { profileService } from "../services/profile";

export type Myself = {
    id?: string;
    name: string
    profession: string,
    image: string, // Ensure you have this image in the public folder
    description: string
}
export const MYSELF = await profileService.get();