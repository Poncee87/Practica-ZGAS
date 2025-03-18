import { Schema, model } from "mongoose";

const evaluationSchema = new Schema({

    Comment: {
        type: String,
        require: true,
    },

    Grade: {
        type: Number,
        require: true,
    },

    Role: {
        type: String,
        require:true,
    },

    idEmployee: {
        type: Schema.Types.ObjectId,
        ref: employee,
        require: true,

    },
},
{
    timestamps: true,
    strict: false,
}
);

export default model("evaluation", evaluationSchema);