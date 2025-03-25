/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
    },

    birthday: {
      type: Date,
      require: true,
    },

    email: {
        type: String,
      },

      address: {
        type: String,
      },

    password: {
      type: String,
      require: true,
    },
    
    hireDate: {
        type: String,
      },

    telephone: {
        type: Number,
        require: true,
      },

      dui: {
        type: Number,
        require: true,
      },
      isVerified: {
        type: Boolean,
      },
      issnumber: {
        type: Number,
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);
