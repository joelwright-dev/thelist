import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    console.log(req.body)

    const item = await prisma.item.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            categoryId: req.body.id
        }
    })

    res.send({status: 200})
}