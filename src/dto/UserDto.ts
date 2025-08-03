
export interface UserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    roleid: number;
    roleName: string;
}


export interface createUserDto extends UserDto {
    password: string;
}


//  This is the login respose
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: createUserDto

}





