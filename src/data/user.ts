export interface User {
    id: number;
    username: string;
    password: string;
    role: "ADMIN" | "USER";
}

export let users: User[] = [
    {
        id: 1,
        username: "admin",
        password: "123",
        role: "ADMIN",
    },
];
