import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

 await prisma.product.createMany({
   data:[
     {
       name:'iPhone 17',
       description:'Limited drop',
       price:1200,
       totalStock:10,
       availableStock:10
     },
     {
       name:'PlayStation 6',
       description:'Limited stock',
       price:900,
       totalStock:5,
       availableStock:5
     }
   ]
 })
}

main()
.then(()=>prisma.$disconnect())
.catch(async(e)=>{
 console.error(e)
 await prisma.$disconnect()
})