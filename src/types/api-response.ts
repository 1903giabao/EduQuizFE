export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    errors?: ApiError[];
    meta?: ApiMeta;
};

export type ApiMeta = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
};

export type ApiError = {
    code: string;
    message: string;
};