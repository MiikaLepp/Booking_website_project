import mongoose from 'mongoose';
import { z } from 'zod';

const credentialsSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  registration: z.object({
    ip: z.string(),
    date: z.date(),
    location: z.object({
      country: z.string(),
      location: z.string()
    })
  }),
  logins: z.array(
    z.object({
      ip: z.string(),
      date: z.date()
    })
  )
});

const mongooseCredentialsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registration: {
    ip: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      country: { type: String, required: false },
      location: { type: String, required: false }
    }
  },
  logins: [
    {
      ip: { type: String, required: false },
      date: { type: Date, required: false }
    }
  ]
});

mongooseCredentialsSchema.methods.addLogin = function (ip: string) {
  this.logins.push({
    ip,
    date: new Date()
  });
  return this.save();
};

export interface ICredentials extends z.infer<typeof credentialsSchema> {
  addLogin(ip: string): Promise<ICredentials>;
}

export const CredentialsModel = mongoose.model<ICredentials>(
  'Credentials',
  mongooseCredentialsSchema
);

export { credentialsSchema };
