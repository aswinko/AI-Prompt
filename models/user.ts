import {Document, Schema, model, models} from "mongoose"


// Define the structure of the User document
export interface UserDocument extends Document {
    email: string;
    username: string;
    image?: string; // Optional field
  }
  

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    image: {
        type: String,
    }
})

const User = models.User || model<UserDocument>("User", UserSchema);

export default User;