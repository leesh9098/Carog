import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ax = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return null;
}

export function getFuelType(type: string) {
  switch (type) {
    case "gasoline":
      return "휘발유";
    case "diesel":
      return "경유";
    case "lpg":
      return "LPG";
    case "premium gasoline":
      return "고급 휘발유";
    case "electric":
      return "전기";
    default:
      return ""
  }
}

export function getInsuranceDutyType(type: string) {
  switch (type) {
    case "insurance":
      return "보험료";
    case "duty":
      return "세금";
    default:
      return ""
  }
}

export function getAccidentType(type: string) {
  switch (type) {
    case "perpetrator":
      return "가해";
    case "damage":
      return "피해";
    default:
      return ""
  }
}
