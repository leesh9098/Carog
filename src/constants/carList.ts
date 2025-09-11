import * as v from 'valibot';

export const carListSchema = v.object({
    id: v.number(),
    name: v.string(),
    number: v.string(),
    represent: v.boolean()
});

export const maintenanceHistoryListSchema = v.object({
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
    id: v.number(),
    carInfoId: v.number(),
    item: v.string(),
    price: v.number(),
    mileage: v.number(),
    company: v.string()
});

export const fuelListSchema = v.object({
    id: v.number(),
    carInfoId: v.number(),
    type: v.string(),
    price: v.number(),
    liter: v.string(),
    unit: v.number(),
    company: v.string(),
    range: v.number(),
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string()
});

export const insuranceDutyListSchema = v.object({
    id: v.number(),
    carInfoId: v.number(),
    type: v.string(),
    price: v.number(),
    company: v.string(),
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string()
});

export const accidentListSchema = v.object({
    id: v.number(),
    carInfoId: v.number(),
    type: v.string(),
    price: v.number(),
    company: v.string(),
    additionalPrice: v.number(),
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string()
});

export const installmentListSchema = v.object({
    id: v.number(),
    carInfoId: v.number(),
    price: v.number(),
    monthly: v.number(),
    round: v.number(),
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string()
});

export const parkingFeeListSchema = v.object({
    id: v.number(),
    carInfoId: v.number(),
    price: v.number(),
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string()
});

export const etcListSchema = v.object({
    id: v.number(),
    carInfoId: v.number(),
    item: v.string(),
    price: v.number(),
    memo: v.nullable(v.string()),
    date: v.string(),
    createdAt: v.string(),
    updatedAt: v.string()
});

export type CarList = v.InferOutput<typeof carListSchema>;