import type { Document } from 'mongoose';
export interface IPaginateResult<T = Document> {
    results: T[];
    page: number;
    limit?: number;
    totalPages: number;
    totalResults: number;
}
export interface IPaginateOptions {
    sortBy?: string;
    limit?: number;
    pick?: string;
    page?: number;
    populate?: string;
}
export type PaginateOptions = {
    sortBy?: string;
    limit?: string;
    pick?: string;
    page?: string;
};
export type QueryResults<T> = {
    results: T[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
};
