import { EventEmitter } from 'events'


export const events = {
    listAllProducts: 'listAllProducts',
    listAllSections: 'listAllSections',
    listAllDescriptions: 'listAllDescriptions',
    listAllThemes: 'listAllThemes',
    content: 'content'
}

export const eventEmitter = new EventEmitter()