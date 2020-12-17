import {DrugInEachOrder} from './DrugInEachOrder'
export class OrderVM {
    orderId: number
    date: Date
    number: number
    pendingStatus:boolean
    isDeleted:boolean
    quentityInEachOrder:number
    description: string
    comments: string
    patientName: string
    listDetails:DrugInEachOrder[]
}
