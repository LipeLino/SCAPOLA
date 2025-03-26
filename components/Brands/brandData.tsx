import { Brand } from "@/types/brand";

export async function pegaBrand(): Promise<Brand[]> {
  try {
    const response = await fetch('http://localhost:3000/api/brand');
    if (!response.ok) {
      throw new Error ("Erro com os posts.")
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// const brandData = await pegaBrand();
// export default brandData;
