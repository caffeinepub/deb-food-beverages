import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    productInterest: Category;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    available: boolean;
    price: bigint;
}
export enum Category {
    greenMangoSoda = "greenMangoSoda",
    lemonSoda = "lemonSoda",
    general = "general",
    jeeraSoda = "jeeraSoda"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product>;
    seedProducts(): Promise<void>;
    submitInquiry(name: string, email: string, message: string, productInterest: Category): Promise<void>;
    updateProductAvailability(id: bigint, available: boolean): Promise<void>;
    updateProductDescription(id: bigint, description: string): Promise<void>;
    updateProductPrice(id: bigint, price: bigint): Promise<void>;
}
