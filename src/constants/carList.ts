import * as v from 'valibot';

export const carListSchema = v.object({
    id: v.number(),
    name: v.string(),
    number: v.string(),
    represent: v.boolean()
});

export type CarList = v.InferOutput<typeof carListSchema>;