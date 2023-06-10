export class Flight{

    id:number = 0; 

    flight_Name:string = "";
    
    flight_code:string  = "";


    departureAirportName:string  = "";


    departureAirportCode:string  = "";



    arriavalAirportName:string = "";


    arraiavalAirportCode:string = "";

    departureDate:any ;

    arrivalDate:any;

    departureCity :string = "";

    arrivalCity:string = "";


    departureTime :any;


    arrivalTime :any;


    basePrice!:number ;

    totalNoofseats!:number;
    
    isrunning:boolean = false;
}