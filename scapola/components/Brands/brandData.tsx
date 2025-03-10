import { Brand } from "@/types/brand";

async function pegaBrand(): Promise<Brand[]> {
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

const brandData = await pegaBrand();
export default brandData;

// const brandData: Brand[] = [  
//   {
//     id: 1,
//     name: "AG Immigration",
//     description: "AG Immigration",
//     image: "/images/brand/brand_agimmigration.png",
//   },
//   {
//     id: 2,
//     name: "AIM",
//     description: "AIM",
//     image: "/images/brand/brand_aim.svg",
//   },
//   {
//     id: 3,
//     name: "Alicerce",
//     description: "Alicerce Educação",
//     image: "/images/brand/brand_alicerce.png",
//   },
// ];

// export default brandData;
