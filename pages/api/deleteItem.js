import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    console.log(req.body)

    const item = await prisma.item.delete({
        where: {
            id: req.body.id
        }
    })

    const items = await prisma.item.findMany({
        where: {
            categoryId: req.body.categoryId
        }
    })

    res.send({status: 200, message: JSON.stringify(items)})
}