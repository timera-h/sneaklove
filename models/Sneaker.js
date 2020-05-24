const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({ 
    name: String,  
    ref: String,  
    size: Number,  
    description: String,  
    price: Number,  
    category: ["men", "women", "kids"],  
    id_tags: Schema.Types.ObjectId,

    image: {
        type: String,
        default: "https://www.usinenouvelle.com/mediatheque/4/1/2/000848214/nike-space-hippie-chaussure.jpg"
    }
}) 

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;
  
  