const mongoose=require('mongoose');

const meetingschema=mongoose.Schema({

    URL: {
        type: String,
        required: true,
    },
    class:{
        type:Number,
        required: true
    },
    startTime:{
        type:Number,
        required:true,
    },
    TeacherName:{
        type:String,
    },
    Subject:{
        type:String,
        require: true,
    },
});

const meet=mongoose.model('meet',meetingschema);

exports.meet=meet;

