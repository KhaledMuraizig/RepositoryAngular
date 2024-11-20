import { city } from "./city"
import { country } from "./country"

export class warehouse{

    id!:number
    name!:string
    description!:string
    country_Id!:number
    city_Id!:number
    city!:city
    country!:country
}