import type { IntellifloPerson } from "./IntellifloPerson"

export type IntellifloClient = {
    id: number
    href: string
    name: string
    createdAt: string
    externalReference: number
    originalAdviser: IntellifloLink | null
    currentAdviser: IntellifloLink | null
    type: string
    partyType: string
    person: IntellifloPerson
    addresses_href: string
    contactdetails_href: string
    plans_href: string
    relationships_href: string
    servicecases_href: string
    dependants_href: string
    tags: never[]
    serviceStatus: never | null
    clientSegment: never | null
    group: {
        id: number,
        href: string,
    } | null
}