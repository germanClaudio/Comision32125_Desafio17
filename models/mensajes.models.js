const { Schema, model } = require("mongoose");

const date = new Date.now().toLocaleString();

const messageSchema = new Schema({
  author: {
            email: {
                    type: String,
                    required: true,
                    maxlength: 100,
                    unique: true,
                    },
            name: {
                    type: String,
                    maxlength: 100,
                    },
            lastName: {
                    type: String,
                    maxlength: 100,
                    },
            age: {
                    type: Number,
                    required: true,
                    },
            alias: {
                    type: String,
                    required: true,
                    maxlength: 50,
                    },
            avatarUrl: {
                    type: String,
                    required: false,
                    },
  },
  text: {
      type: String,
      required: true,
      maxlength: 300,
    },
  date: {
      type: Date,
      default: date,
    }
});

module.exports = model("Mensajes", messageSchema);

// {
//     "author": {
//       "email": "mariano.aquino@gmail.com",
//       "nombre": "Mariano",
//       "apellido": "Aquino",
//       "edad": "35",
//       "alias": "papapa",
//       "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/144.jpg"
//     },
//     "text": "peobando 21:44",
//     "fyh": "8/28/2021, 9:44:58 PM",
//     "id": 1
//   }
