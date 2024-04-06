import mongoose, { Document } from "mongoose";

// Define an interface representing a user document
export interface PartnerModelDto extends Document {
  name: string;
  email: string;
  description: string;
  location: string[];
  registeredOn: Date;
  rating: number;
  verificationStatus: string;
  image: string;
}

export interface PartnerServicesDto extends Document {
  userId: string;
  services: PartnerServices[];
}

export interface PartnerServices extends Document {
  name: string;
  price: number;
  staff: string[];
  description: string;
}

export interface userDataDto extends Document {
  userName: string;
  password: string;
  email: string;
  roles: string[];
}

const userSchema = new mongoose.Schema<userDataDto>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
});

const partnerSchema = new mongoose.Schema<PartnerModelDto>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },
  registeredOn: {
    type: Date,
    default: new Date(),
  },
  rating: {
    type: Number,
    required: true,
  },
  verificationStatus: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const partnerServiceSchema = new mongoose.Schema<PartnerServicesDto>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  services: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      staff: {
        type: [String],
      },
      description: {
        type: String,
      },
    },
  ],
});

export const partnerData = mongoose.model<PartnerModelDto>(
  "partnerSchema",
  partnerSchema
);

export const partnerServiceData = mongoose.model<PartnerServicesDto>(
  "partnerServiceSchema",
  partnerServiceSchema
);

export const userData = mongoose.model<userDataDto>(
  "userSchema",
  userSchema
);
