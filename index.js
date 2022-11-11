const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-school')

.then(()=>{
    console.log("mongoDB connected Successfully")
})
.catch(err=>console.log("connection failed"))


const studentSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: String,
    dob: Date,
    entryDate:{type: Date, default:Date.now},
    passed: Boolean,
    hobbies:[String],
    parents:{
        father: String,
        mother: String,
    },
    subjects:[{name:String, marks:{type:Number, min:0, max:100}}]

});


const Student = mongoose.model('my-student', studentSchema)

async function createStudent(){
    const student = new Student({
        firstName: "Jamal",
        lastName: "Hossain",
        dob: new Date("20 April 1986"),
        passed: true,
        hobbies: ["Swimming", "Gardening"],
        paresns:{
            father: "A",
            mother: "B",
        },
        subjects:[{name: "math", marks:80}, {name:"English", marks:90}]

    });

    try{
    const data = await student.save();
    console.log(data)

    } catch(err){
        console.log(err._message);
    }
    
    

}

// createStudent()

//Read

async function readStudent(){

  const studentData  = await Student
  .find()
  
   
  .select({firstName:1, lastName: 1, passed:1})
  console.log(studentData);

}
// readStudent()

async function updateStudent(id){
    const student = await Student.updateOne({_id:id}, {$set:{passed:false}})
    console.log(student);

}

// updateStudent("636cdcdd47980aeec49e0bd8")


async function deleteStudent(id){
    const student = await Student.deleteOne({_id:id});
    console.log(student)
}

deleteStudent("636cdcdd47980aeec49e0bd8")

