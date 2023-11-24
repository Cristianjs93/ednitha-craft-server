import { type Response } from 'express';

export interface ResponsePaginator extends Response {
  paginatedResults?: object
}
export interface PaginationQueryParams {
  page: string
  limit: string
  filter: string
  price: string
  rating: string
  category: string
}

export interface PaginationResult {
  next: object
  previous: object
  data: object[]
  length: number
  allProducts: object[]
}
