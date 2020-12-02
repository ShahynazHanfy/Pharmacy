import {DrugInEachOrder} from './DrugInEachOrder'
export class OrderVM {
    orderId: number
    date: Date
    number: number
    isDeleted:boolean
    quentityInEachOrder:number
    description: string
    comments: string
    patientName: string
    listDetails:DrugInEachOrder[]
}
