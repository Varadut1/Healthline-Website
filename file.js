const fileSchema={
    Fname: String,   
    Lname: String,  
    number: Number, 
    age: Number,  
	email: String, 
    reason: String, 
    app_date: Date, 
    file: {
        data: Buffer
    }
}