// user.types.ts
export type User = {
    id: number;
    avatar: string;
    email: string;
    name: string;
    listId: number[];
};

// list.types.ts
export type List = {
    name: string;
    id: number;
    userId: number;
};

// book.types.ts
export type Book = {
    name: string;
    abstract: string[];
    note: number | "-";
    category: string;
    id: number;
    listId: number[];
};

// film.types.ts
export type Film = {
    name: string;
    abstract: string[];
    note: number | "-";
    category: string;
    id: number;
    listId: number[];
};

// series.types.ts
export type Series = {
    name: string;
    abstract: string;
    note: number | "-";
    category: string[];
    id: number;
    listId: number[];
};