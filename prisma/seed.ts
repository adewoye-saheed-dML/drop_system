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
     },

     {
      name: 'iPhone 17 Pro',
      description: 'Launch Edition',
      price: 1200,
      totalStock: 10,
      availableStock: 10,
    },

    {
      name: 'RTX 6090',
      description: 'Founders Edition',
      price: 1800,
      totalStock: 3,
      availableStock: 3,
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