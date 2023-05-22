import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export type BaseResponse<T> = {
    success: boolean
    data?: T
    errors?: ApiError
}

type ApiError = string[]

export type BaseError = Required<Omit<BaseResponse<void>, 'data'>>

export type MutationOptions<Input = unknown, Response = unknown> = Omit<
    UseMutationOptions<Response, ApiError, Input, unknown>,
    'mutationFn'
>

export type QueryOptions<
    Output,
    Key,
    Input = Output,
    Err = ApiError
> = UseQueryOptions<Output, Err, Input, Key> & {
    page?: number
    pageSize?: number
}

export type PaginationOptions = {
    totalDeElementos: number
    tamanhoDaPagina: number
    numeroDaPagina: number
    totalPaginas: number
    ultimaPagina: number
    possuiPaginaAnterior: boolean
    possuiPaginaSeguinte: boolean
    paginaAnterior: number
    paginaSeguinte: number
}

export type Paginated<T> = {
    itens: T[]
    paginacao: PaginationOptions
}

export type PageParams = {
    TamanhoDaPagina?: number
    NumeroDaPagina?: number
}