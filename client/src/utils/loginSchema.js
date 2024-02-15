import { z } from "zod";

export default z.object({
  name: z.string().min(3, { message: "Username is required" }),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/, {
      message:
        "Password including at least 1 number, 1 lowercase letter, and 1 uppercase letter.",
    })
});
