require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const multer = require('multer')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let alert = require('alert');
var session = require('express-session');
var flash = require('connect-flash');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true})
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 6000},
    resave: false,
    saveUninitialized: false
}));


// const fileSchema=mongoose.Schema({
//     Fname: String,   
//     Lname: String,  
//     file: {
//         data: Buffer,
//         contentType: String
//     }
// })

// const file = mongoose.model("file", fileSchema);

// const Storage = multer.diskStorage({
//     destination: "uploads",
//     filename:(req, file, cb) =>{
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImage');

// app.post("/doctorsform", function(req, res){
//     upload(req, res, (err)=>{
//         var fname = req.body.nfirst;
//         var lname = req.body.last;
//         if (err){
//             console.log(err);
//         }
//         else{
//             const file1 = new file({
//                 Fname: fname,   
//                 Lname: lname,  
//                 file: {
//                     data: req.body.q16_uploadYourcv,
//                     contentType: 'application/pdf'
//                 }
//             })
//             file1.save();
//             console.log("uploaded");
//         }
//         res.render("thankyou", {text: "We will look into your cv and inform."})
//     })
// })





const info = {
    0: ["/images/Dr. 0.jpg", "Dr. Jhunjhunwala", "Degree : MD", "Specialization : Heart", "Experience : 20 years", "Fees : 500 Rs", "Timing : 9am to 8pm", "Phone No: 5252525225", "Address : Pune"],
    1: ["/images/Dr. 1.jpg", "Dr. Yadav", "Degree : MBBS", "Specialization : Bones", "Experience : 30 years", "Fees : 1500 Rs", "Timing : 10am to 8pm", "Phone No: 9232323232", "Address : Mumbai"],
    2: ["/images/Dr. 2.jpg", "Dr. Sinha", "Degree : MD", "Specialization : Dentist", "Experience : 15 years", "Fees : 700 Rs", "Timing : 9am to 8pm", "Phone No: 92523285225", "Address : Bhopal"],
    3: ["/images/Dr. 3.png", "Dr. Akolkar", "Degree : MD", "Specialization : Brain", "Experience : 6 years", "Fees : 800 Rs", "Timing : 8am to 8pm", "Phone No: 9122125899", "Address : Paris"],
    4: ["/images/Dr. 4.jpg", "Dr. Dinesh", "Degree : MD", "Specialization : Dermatology", "Experience : 8 years", "Fees : 600 Rs", "Timing : 9am to 8pm", "Phone No: 9233803245", "Address : Nanded"],
    5: ["/images/Dr. 5.jpg", "Dr. Gandhi", "Degree : MD", "Specialization : General", "Experience : 5 years", "Fees : 900 Rs", "Timing : 9am to 8pm", "Phone No: 9252525225", "Address : Nagar"],
    6: ["/images/Dr. 6.jpg", "Dr. Kashid", "Degree : MD", "Specialization : Nephrology", "Experience : 10 years", "Fees : 1100 Rs", "Timing : 11am to 8pm", "Phone No: 9872525225", "Address : Hyderabad"],
    7: ["/images/Dr. 7.jpg", "Dr. Bhandari", "Degree : MD", "Specialization : General", "Experience : 8 years", "Fees : 1800 Rs", "Timing : 10am to 8pm", "Phone No: 9172733260", "Address : Delhi"],   
    8: ["/images/Dr. 8.jpg", "Dr. Shaikh", "Degree : MD", "Specialization : Opthalmology", "Experience : 9 years", "Fees : 500 Rs", "Timing : 9am to 8pm", "Phone No: 923991999", "Address : Pune"], 
}

const med_info ={
    0: ["/images/dolo.jpeg"],
    1: ["/images/evion (1).png"],
    2: ["/images/Megafreeflex (4).png"],
    3: ["/images/calcimax (2).png"],
    4: ["/images/okacet (1).png"],
    5: ["/images/aceclofenac.png"],
    6: ["/images/antifungal.jpg"],
    7: ["/images/telma (3).png"],
    8: ["/images/crocin.jpg"],
    9: ["/images/azithral.jpg"],
    10:["/images/wikoryl2.jpg"],
    11:["/images/combiflam2.jpg"],
    12:["/images/nivea2.jpg"],
    13:["/images/vaseline5.jpg"],
    14:["/images/veet.jpg"],
    15:["/images/pears2.jpg"],
    16:["/images/himalaya.jpg"],
    17:["/images/kailas.jpg"],
    18:["/images/ponds.jpg"],
    19:["/images/kiskin2.png"]    
}

var name=[]
var price=[]

var newtext1=null;
var acc_name=null;

const signupSchema={
	name: String,
	email: String,
	password: String,
}
const signup =  mongoose.model("signup", signupSchema);

const contactSchema ={
	name: String,
	email: String,
	subject: String,
	message: String

}
const contact = mongoose.model("contact", contactSchema);

const formSchema ={
    dr: String, 
	Fname: String,   
    Lname: String,  
    number: Number, 
    age: Number,  
	email: String, 
    reason: String, 
    app_date: Date,  
}

const form = mongoose.model("form", formSchema);



const cartSchema = {
    name: String,
    med_link: String,
    med_name: String,
    num: Number,
    price: Number,
    total_price: Number
}
const cart = mongoose.model("cart", cartSchema);

const shopSchema ={
	name: String,
	email: String,
	mobile_no: Number,
	message: String

}
const shop = mongoose.model("shop", shopSchema);


/* SIGNUP - SIGNIN */
app.get("/", function(req, res){
	res.sendFile(__dirname+"/signin.html");
})

app.post("/", function(req, res){
	var Email = req.body.mail;
	var Password = req.body.pass;
	console.log(Email, Password);
	signup.findOne({email: Email}, function(err, results){
		if(results==null){
			res.sendFile(__dirname+"/signup.html");
		}
		else if(results.password==Password){
            acc_name=results.name;
			res.render("home");
		}
		else{
			res.redirect("/");
		}
	})
})

app.get("/signup", function(req, res){
	res.sendFile(__dirname+"/signup.html")
})
app.post("/signup", function(req, res){
	var Name = req.body.name;
	var Email = req.body.mail;
	var Password=req.body.pass;
	var Con_pass=req.body.con_pass;
	if (Con_pass==Password){
	const signup1=new signup({
		name: Name,
		email: Email,
		password: Password
	})
	signup1.save();
    acc_name=Name;
	console.log("Entered in db");
	res.render("home");
}
	else{
		res.redirect("/signup");
	}
});

app.post("/signup_request", function(req, res){
	res.redirect("/signup");
});

/* END SIGNUP - SIGNIN */

app.post("/dynamic/:id", function(req, res){
    console.log(req.params);
    var button_no = req.params.id;
    console.log(button_no);
    var newimage = info[button_no][0]
    newtext1 = info[button_no][1]
    var newtext2 = info[button_no][2]
    var newtext3 = info[button_no][3]
    var newtext4 = info[button_no][4]
    var newtext5 = info[button_no][5]
    var newtext6 = info[button_no][6]
    var newtext7 = info[button_no][7]
    var newtext8 = info[button_no][8]

    // console.log(newtext);
    res.render("transform", {image: newimage, text1: newtext1, text2: newtext2, text3: newtext3,text4: newtext4, text5: newtext5,text6: newtext6, text7: newtext7, text8:newtext8})
})

app.post("/home", function(req, res){
    res.render("home");
})

app.post("/shop", function(req, res){
    res.render("shop");
})

app.post("/mid", function(req, res){
    var b=req.body.numofbt;
    var num = Number(req.body.b);
    var info_string=req.body.info
    var name_list = info_string.split(', ');
    var name=name_list[0]
    var price=Number(name_list[1])
    var total_price=num*price;
    console.log(acc_name, med_info[b][0],name, price, num)

    if (num>0){
    cart.find({name: acc_name, med_link: med_info[b][0]}, function(err, results){
        console.log(results);
        if(results.length==0){
            const cart1 = new cart({
                name: acc_name,
                med_link: med_info[b][0],
                med_name: name,
                price: price,
                num: num,
                total_price: total_price
            })
            cart1.save();
        }
        else{
            console.log("here");
            cart.updateOne({"name": acc_name, "med_link": med_info[b][0]}, {$set:{"num": num, "total_price": total_price}}, function(err){
                console.log(err);
            })
        }
    })
    alert("Item added to cart");
}
else{
    alert("Negative or zero item cannot be added");
    
}
})

app.get("/cart", function(req, res){
    var sum = 0;
    cart.find({name:acc_name}, function(err, results){
        results.forEach(function(item){
            sum+=item.total_price;
        });
        console.log(sum, 'herere');
        if (results.length!=0){
            console.log(results)
            res.render("cart", {medicines:results, total: sum});
        }
        else{
            alert("YOUR CART IS EMPTY, SHOP SOME")
            res.render("shop");
    }
    });
});


app.post("/cart", function(req, res){
    cart.find({name:acc_name}, function(err, results){
        var sum=0
            results.forEach(function(item){
                sum+=item.total_price;
            });
            console.log(sum, 'herere');

        if (results.length!=0){
            console.log(results)
            res.render("cart", {medicines:results, total: sum});
        }
        else{
            alert("YOUR CART IS EMPTY, SHOP SOME")
            res.render("shop");
        }
    }); 
})

app.post("/pay", function(req, res){
    cart.deleteMany({name: acc_name}, function(err){
        if(err){
            console.log(err);
        }
        res.render("shop");
    })
})

app.post("/delete", function(req, res){
    var marked_id = req.body.checkbox;
    cart.findByIdAndDelete(marked_id, function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect("/cart");
})

// <td>Rs. <% item.price*item.num.tostring() %></td>
// <input type="checkbox" name="checkbox" value="<%= item._id %>" onChange="this.form.submit()">


//<a href=""><i class="far fa-times-circle"></i></a>

// <tr>
//                 <td><a href=""><i class="far fa-times-circle"></i></a></td>
//                 <td><img src="/images/DOLO (3).png" alt=""></td>
//                 <td>Dolo-650 mg</td>
//                 <td>Rs.30.77</td>
//                 <td><input type="number" disabled></td>
//                 <td>Rs.33.77</td>
//             </tr>
//             <tr>
//                 <td><a href=""><i class="far fa-times-circle"></i></a></td>
//                 <td><img src="/images/revitalh (3).png" alt=""></td>
//                 <td>Revital-H</td>
//                 <td>Rs.499</td>
//                 <td><input type="number" disabled></td>
//                 <td>Rs.499</td>
//             </tr>
//             <tr>
//                 <td><a href=""><i class="far fa-times-circle"></i></a></td>
//                 <td><img src="/images/gluco (2).png" alt=""></td>
//                 <td>Dr.Morepen <br> Blood Sugar test Kit</td>
//                 <td>Rs.2500</td>
//                 <td><input type="number" disabled></td>
//                 <td>Rs.2500</td>
//             </tr>



app.post("/doctors", function(req, res){
    res.render("dform");
})

app.post("/thankyou", function(req, res){

    var dr = newtext1;
    var fname = req.body.nfirst;
    var lname = req.body.last;
    var num = req.body.q4_contactNumber;
    var age=req.body.q15_age;
    var mail=req.body.q5_emailAddress;
    var reason=req.body.q13_reasonFor;
    var app_date=req.body.appointment_date;
   if (dr!=null){
        form.findOne({Fname: fname, Lname: lname ,dr: newtext1}, function(err, results){
            console.log(results);
            console.log(!results);
            if(results==null){
                const form1 = new form({
                    dr: newtext1, 
                    Fname: fname,   
                    Lname: lname,  
                    number: num, 
                    age: age,  
                    email: mail, 
                    reason: reason, 
                    app_date: app_date, 
                    })
                    form1.save();res.render("thankyou", {text: "to know your appointment status."});
            }
            else{
                res.send("You appointment with "+newtext1+" is already made!")
            }
        })
    }
    else{
        res.render("home");
    }
})

app.post("/aboutus", function(req, res){
    res.render("aboutus");
})

app.post("/contactussuccess", function(req, res){
    var name=req.body.name;
    var mail=req.body.email;
    var topic=req.body.topic;
    var message=req.body.message;

    const contact1 = new contact({
    name: name,
	email: mail,
	subject: topic,
	message: message
    })
    contact1.save();
    res.render("thankyou", {text: "We will get back to you with your query!"})
})
app.post("/successshop", function(req, res){
    var name=req.body.name;
    var mail=req.body.email;
    var mono=Number(req.body.mono);
    var message=req.body.message;

    const shop1 = new shop({
    name: name,
	email: mail,
	mobile_no: mono,
	message: message
    })
    shop1.save();
    res.render("thankyou", {text: "We will take your required item or suggestion into consideration!"})
})

app.post("/contactus", function(req, res){
    res.render("contactus");
})

app.listen(3000, function(){
console.log('App started on port 3000');
})

