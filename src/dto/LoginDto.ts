import { UserDto } from "./UserDto";

// Login Data Transfer Object
// This interface defines the structure of the login request data
export interface LoginDto {
    email: string;
    password: string;
}

//  This is the login respose
export interface LoginResponse {
    accessToken: string;
    // refreshToken: string;
    user: UserDto;
}