import { positions } from "./position-listings"
import { projects } from "./project-listings"

export interface ProjectListing {
    name: string
    label: string
    category: string
    categoryLabel: string
    shortDescription: string
    longDescription: string
    link: string
    siteLink: string
    logo: string
    graphic: string
}

export interface PositionListing {
    role: string
    project: string
    type: string
    location: string
    link: string
}

export interface ListingData {
    Projects: Array<ProjectListing>
    Positions: Array<PositionListing>
}

export const Listings: ListingData = {
    Projects: projects,
    Positions: positions,
}