import { type Response } from 'express';
import { type ProductDocument } from '../api/product/product.types';

export interface ResponseFiltering extends Response {
  filteredResults?: ProductDocument[]
}

export interface ResponsePaginator extends Response {
  paginatedResults?: object
  filteredResults?: ProductDocument[]
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
  result: object[]
  length: number
}
