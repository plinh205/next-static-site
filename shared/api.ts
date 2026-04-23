/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface CreateConceptRequest {
  title: string;
  domain: string;
}

export interface CreateConceptResponse {
  concept: { type: string; slug: string; title: string; domain: string };
}

export interface GetConceptsResponse {
  concepts: Record<string, unknown>[];
}

export interface CreateDomainRequest {
  title: string;
  parent?: string;
}

export interface CreateDomainResponse {
  domain: { type: string; slug: string; title: string; parent?: string };
}

export interface GetDomainsResponse {
  domains: Record<string, unknown>[];
}
