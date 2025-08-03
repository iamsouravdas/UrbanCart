

//  this is the dto for  the User
export interface createUserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    roleid: number;
}

//  This is the login respose
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: createUserDto

}



