/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CharactersImport } from './routes/characters'
import { Route as IndexImport } from './routes/index'
import { Route as CharactersIndexImport } from './routes/characters.index'
import { Route as CharactersNameImport } from './routes/characters.$name'

// Create/Update Routes

const CharactersRoute = CharactersImport.update({
  id: '/characters',
  path: '/characters',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CharactersIndexRoute = CharactersIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => CharactersRoute,
} as any)

const CharactersNameRoute = CharactersNameImport.update({
  id: '/$name',
  path: '/$name',
  getParentRoute: () => CharactersRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/characters': {
      id: '/characters'
      path: '/characters'
      fullPath: '/characters'
      preLoaderRoute: typeof CharactersImport
      parentRoute: typeof rootRoute
    }
    '/characters/$name': {
      id: '/characters/$name'
      path: '/$name'
      fullPath: '/characters/$name'
      preLoaderRoute: typeof CharactersNameImport
      parentRoute: typeof CharactersImport
    }
    '/characters/': {
      id: '/characters/'
      path: '/'
      fullPath: '/characters/'
      preLoaderRoute: typeof CharactersIndexImport
      parentRoute: typeof CharactersImport
    }
  }
}

// Create and export the route tree

interface CharactersRouteChildren {
  CharactersNameRoute: typeof CharactersNameRoute
  CharactersIndexRoute: typeof CharactersIndexRoute
}

const CharactersRouteChildren: CharactersRouteChildren = {
  CharactersNameRoute: CharactersNameRoute,
  CharactersIndexRoute: CharactersIndexRoute,
}

const CharactersRouteWithChildren = CharactersRoute._addFileChildren(
  CharactersRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/characters': typeof CharactersRouteWithChildren
  '/characters/$name': typeof CharactersNameRoute
  '/characters/': typeof CharactersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/characters/$name': typeof CharactersNameRoute
  '/characters': typeof CharactersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/characters': typeof CharactersRouteWithChildren
  '/characters/$name': typeof CharactersNameRoute
  '/characters/': typeof CharactersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/characters' | '/characters/$name' | '/characters/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/characters/$name' | '/characters'
  id: '__root__' | '/' | '/characters' | '/characters/$name' | '/characters/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CharactersRoute: typeof CharactersRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CharactersRoute: CharactersRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/characters"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/characters": {
      "filePath": "characters.tsx",
      "children": [
        "/characters/$name",
        "/characters/"
      ]
    },
    "/characters/$name": {
      "filePath": "characters.$name.tsx",
      "parent": "/characters"
    },
    "/characters/": {
      "filePath": "characters.index.tsx",
      "parent": "/characters"
    }
  }
}
ROUTE_MANIFEST_END */
