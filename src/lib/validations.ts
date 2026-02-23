import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "L'adresse email est obligatoire").email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const studentSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  gender: z.enum(["MALE", "FEMALE"], { required_error: "Le genre est obligatoire" }),
  dateOfBirth: z.string().min(1, "La date de naissance est obligatoire"),
  classId: z.string().min(1, "La classe est obligatoire"),
  parentName: z.string().min(1, "Le nom du parent est obligatoire"),
  parentPhone: z.string().min(1, "Le téléphone du parent est obligatoire"),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

export const paymentSchema = z.object({
  studentId: z.string().min(1, "L'élève est obligatoire"),
  installmentName: z.string().min(1, "La tranche est obligatoire"),
  amount: z.number().min(1, "Le montant doit être supérieur à 0"),
  method: z.enum(["MOBILE_MONEY", "CASH", "BANK_TRANSFER", "CHECK"], {
    required_error: "Le mode de paiement est obligatoire",
  }),
  operator: z.enum(["WAVE", "ORANGE_MONEY", "MTN_MOMO"]).optional().nullable(),
  phoneNumber: z.string().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;

export const gradeSchema = z.object({
  evaluationTitle: z.string().min(1, "Le titre de l'évaluation est obligatoire"),
  evaluationType: z.enum(["CLASS_TEST", "EXAM", "HOMEWORK", "ORAL"], {
    required_error: "Le type d'évaluation est obligatoire",
  }),
  subjectId: z.string().min(1, "La matière est obligatoire"),
  classId: z.string().min(1, "La classe est obligatoire"),
  maxScore: z.number().min(1, "La note maximale est obligatoire"),
  grades: z.array(
    z.object({
      studentId: z.string(),
      score: z.number().min(0, "La note ne peut pas être négative"),
      isAbsent: z.boolean(),
      comment: z.string().optional(),
    })
  ),
});

export type GradeFormValues = z.infer<typeof gradeSchema>;

export const messageSchema = z.object({
  receiverId: z.string().min(1, "Le destinataire est obligatoire"),
  content: z.string().min(1, "Le message ne peut pas être vide"),
});

export type MessageFormValues = z.infer<typeof messageSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Le prenom est obligatoire"),
    lastName: z.string().min(1, "Le nom est obligatoire"),
    email: z.string().min(1, "L'adresse email est obligatoire").email("Adresse email invalide"),
    phone: z.string().min(1, "Le numero de telephone est obligatoire"),
    schoolName: z.string().min(1, "Le nom de l'etablissement est obligatoire"),
    city: z.string().min(1, "La ville est obligatoire"),
    country: z.enum(["SN", "CI", "CM", "GN", "ML", "BF", "TG", "BJ"], {
      required_error: "Le pays est obligatoire",
    }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caracteres"),
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
